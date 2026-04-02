const THEMES = {
    THEME1: "theme1",
    THEME2: "theme2",
    THEME3: "theme3",
}

const Calculator = {
    theme: THEMES.THEME1,
    tokens: [],
    output: 0,
}

const slider = document.querySelector('#theme');
const body = document.querySelector('body');

slider.addEventListener('input', function(){
    body.className = "theme" + slider.value;
});