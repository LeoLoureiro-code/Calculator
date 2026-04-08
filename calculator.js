const THEMES = {
    THEME1: "theme1",
    THEME2: "theme2",
    THEME3: "theme3",
}

const Calculator = {
    theme: THEMES.THEME1,
    current: "",
    tokens: [],
    output: 0,
}

const slider = document.querySelector('#theme');
const body = document.querySelector('body');
const equation = document.querySelector('.display_operation');
const nextNumberAndResult = document.querySelector('.display_next_result');


/*
    Mostrar el numero que se está haciendo click
    Concatenar los numeros hasta que se de click a una operacion.
    Poner el numero y la operacion en el array de tokens
    Mostrar la equacion en la pantalla y reducir la fuente si se llega al otro extremo
    Implementar la prioridad de operaciones en una funcion y regresar un nuevo array que solo tenga sumas y restas
    Mostrar el resultado en pantalla y guardarlo en el estado para poder usarlo en otra operacion si se requiere
*/

//Help functions

function DigitCheck(digitToCheck){
    const digit = new RegExp("[0-9]");
    if (digit.test(digitToCheck)){
        return true;
    }
    else{
        return false;
    }

}

function ResetCalculator(){
    Calculator.tokens = [];
    Calculator.current = "";
    Calculator.output = "";
    Render();
}

// Render functions
function ThemeRender(){
    Calculator.theme = `theme${slider.value}`
    body.classList = 'none';
    body.className = Calculator.theme;
}

function DisplayEquationRender(){
    equation.textContent = Calculator.tokens.join("");
}

function DisplayNumber(){
    nextNumberAndResult.textContent = Calculator.current;
}

function Render(){
    ThemeRender();
    DisplayNumber();
    DisplayEquationRender();
}

slider.addEventListener('input', function(){
   Render();
});

document.querySelectorAll("button").forEach(button =>{
    button.addEventListener("click", () =>{
        const value = button.dataset.value;
        const isDigit = DigitCheck(value);
        if(isDigit){
            Number(Calculator.current += value);
            Render();
        }
        else{
            Calculator.tokens.push(Calculator.current);
            Calculator.tokens.push(value);
            Calculator.current = "";
            Render();
        }
        Render();
    })
});

document.querySelector("#reset_button").addEventListener("click", () =>{
    ResetCalculator();
});