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


//Help functions

function AddDecimal(digitToAddDecimal){
    if(digitToAddDecimal === ""){
        digitToAddDecimal += "0."
    }

    if(!digitToAddDecimal.includes(".")){
        digitToAddDecimal += ".";
    }

    return digitToAddDecimal;

}

function ResetCalculator(){
    Calculator.tokens = [];
    Calculator.current = "";
    Calculator.output = "";
    Render();
}

function DeleteCurrentNumber(){
    const currentNumber = Calculator.current.split("");
    currentNumber.pop();
    Calculator.current = currentNumber.join("");
    Render();
}

//Make a new array with all multiplications and divisions resolved
function ResolveEquation(){
    let currentResult = "";
    const reducedTokens = [];

    if(Calculator.current !== ""){
        Calculator.tokens.push(Calculator.current);
        Calculator.current = "";
    }

    for(let i = 0; i < Calculator.tokens.length -1; i++){
        if(Calculator.tokens[i] === "*" || Calculator.tokens[i] ==="/"){
            const currentOperation = (Calculator.tokens[i-1] + Calculator.tokens[i] + Calculator.tokens[i+1]);
            console.log(currentOperation);
            i += 2;
        }
    }
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

function CurrentNumberRender(){
    nextNumberAndResult.textContent = Calculator.current;
}

function ResultRender(){
    nextNumberAndResult.textContent = Calculator.output;
}

function Render(){
    ThemeRender();
    CurrentNumberRender();
    DisplayEquationRender();
}


slider.addEventListener('input', function(){
   Render();
});

document.querySelectorAll(".digit").forEach(button =>{
    button.addEventListener("click", () =>{
        const value = button.dataset.value;
        Number(Calculator.current += value);
        Render();
    })
});

document.querySelector(".decimal").addEventListener("click", () =>{
    const decimalNumber = AddDecimal(Calculator.current);
    Calculator.current = decimalNumber;
    Render();
})

document.querySelectorAll(".operator").forEach(button =>{
    button.addEventListener("click", () =>{
        const operator = button.dataset.value;

        if(Calculator.current !== ""){
            Calculator.tokens.push(Calculator.current);
            Calculator.tokens.push(operator);
            Calculator.current = "";
            Render();
        }
          
    })
})

document.querySelector("#reset_button").addEventListener("click", () =>{
    ResetCalculator();
});

document.querySelector("#delete_button").addEventListener("click", ()=>{
    DeleteCurrentNumber();
});

document.querySelector("#equal_button").addEventListener("click", () =>{
    ResolveEquation();
    Render();
});