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

function NewThemeRender(){
    Calculator.theme = `theme${slider.value}`
    body.classList = 'none';
    body.className = Calculator.theme;
}

function Render(){
    NewThemeRender();
}

slider.addEventListener('input', function(){
   Render();
});

document.querySelectorAll("button").forEach(button =>{
    button.addEventListener("click", () =>{
        const value = button.dataset.value;
        console.log(value);
    })
})