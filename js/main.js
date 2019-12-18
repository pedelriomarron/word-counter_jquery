let v = "0.0.1";


$(() => {

    let main = createElement("div", { id: "main" })
    let box = createElement("div", { id: "box" })
    $(box).append(createTextArea())
    $(box).append(createClearText())
    $(main).append(box)
    $(main).append(createResults())
    $("body").append(main)
    $("#textarea_main").val("", changeResults(getDataforText("")))

    let version = createElement("div", { id: "version" });
    $(version).html(`v.${v} <p>dev. by <b>Pedro Manuel del Río Marrón</b></p>`)
    $("body").append(version);

})






const createTextArea = () => {

    let textarea = createElement("textarea", { id: "textarea_main", style: `width:100%;height:30vh`, placeholder: "Write here...." })
    let div = createElement("div")
    $(div).append(textarea)
    $(textarea).keyup(function () {
        changeResults(getDataforText(this.value))
    })
    return div;
}


const createClearText = () => {

    let clearText = createElement("button", { id: "clearText" })
    $(clearText).html(`<i class="fa fa-trash" aria-hidden="true"></i> Clear Text`)
    $(clearText).on("click", () => {
        $("#textarea_main").val("", changeResults(getDataforText("")))
    })
    let div = createElement("div")
    $(div).append(clearText)
    return div;
}


const createResults = () => {

    let words = createElement("div", { class: "result" })
    $(words).html(`Words: <span class="badge" id="results_words"></span>`)
    let characters = createElement("div", { class: "result" })
    $(characters).html(`Characters: <span class="badge" id="results_characters"></span>`)
    let sentences = createElement("div", { class: "result" })
    $(sentences).html(`Sentences: <span class="badge" id="results_sentences"></span>`)
    let repetition = createElement("div", { class: "result" })
    $(repetition).html(`Repetition: <div id="results_repetition"></div>`)



    let div = createElement("div", { id: "results" })
    $(div).append(words)
    $(div).append(characters)
    $(div).append(sentences)
    $(div).append(repetition)


    return div;

}

const getDataforText = (text) => {
    text = text.replace(/ +(?= )/g, '').trim();

    let characters = text.split('').filter(c => c != ' ').length;
    let words = text.split(' ').filter(c => c != ' ');
    let wordsNum = words.length
    let repetition = {}
    words.map(word => {
        word = removeSpecialChar(word).replace(/(^\.+|\.+$)/mg, '');
        if (typeof repetition[word] === 'undefined') repetition[word] = 0
        repetition[word]++
    })
    let sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    let sentencesNum = sentences.length
    repetition = Object.entries(repetition)
    repetition.sort((a, b) => (a[1] < b[1]) ? 1 : -1)


    if (characters === 0) {
        wordsNum = 0
        sentencesNum = 0
    }
    return {
        words: wordsNum, characters, repetition, sentences: sentencesNum
    }
}


const changeResults = (data) => {
    $("#results_sentences").text(data.sentences)
    $("#results_words").text(data.words)
    $("#results_characters").text(data.characters)
    let repetition = ""
    data.repetition.map(word => {
        if (word[0].length > 3 && word[1] > 2)
            repetition += `<div class="badge">${word[0]} : ${word[1]} (${((word[1] * 100) / data.words).toFixed(2)}%)</div>`
    })
    $("#results_repetition").html(repetition)
}



function removeSpecialChar(str) {
    //Creamos las reglas
    var map = {
        'a': 'á|à|ã|â|À|Á|Ã|Â',
        'e': 'é|è|ê|É|È|Ê',
        'i': 'í|ì|î|Í|Ì|Î',
        'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c': 'ç|Ç',
        'n': 'ñ|Ñ'
    };
    // convertimos a minuscula
    str = str.toLowerCase();

    for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };
    return str.trim();
};
