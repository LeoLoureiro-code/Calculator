const THEMES = {
    THEME1: "theme1",
    THEME2: "theme2",
    THEME3: "theme3",
}

const Calculator = {
    theme: THEMES.THEME1,
    current: "",
    tokens: [],
    output: "",
    error: false
}

const slider = document.querySelector('#theme');
const body = document.querySelector('body');
const equation = document.querySelector('.display_operation');
const nextNumberAndResult = document.querySelector('.display_next_result');


//Help functions

function isNumber(value) {
    return /^[0-9]+$/.test(value);
}

function AddDecimal(digitToAddDecimal) {
    if (digitToAddDecimal === "") {
        digitToAddDecimal += "0."
    }

    if (!digitToAddDecimal.includes(".")) {
        digitToAddDecimal += ".";
    }

    return digitToAddDecimal;

}

function ResolveMultiplicationDivision(tokens) {


    for (let i = 0; i < tokens.length; i++) {

        if (tokens[i] === "*") {
            let result = "";
            let first = tokens[i - 1];
            let second = tokens[i + 1];
            result = Number(first) * Number(second);
            tokens.splice(i - 1, 3, result.toString());
            i -= 1;
        }

        if (tokens[i] === "/") {
            let result = "";
            let first = tokens[i - 1];
            let second = tokens[i + 1];

            if (second == 0) {
                Calculator.error = true;
                return []; 
            }
            result = Number(first) / Number(second);
            tokens.splice(i - 1, 3, result.toString());
            i -= 1;
        }

    }
    return tokens;
}

function ResolveAdditionSubstraction(tokens) {

    for (let i = 0; i < tokens.length; i++) {

        if (tokens[i] === "+") {
            let result = "";
            let first = tokens[i - 1];
            let second = tokens[i + 1];
            result = Number(first) + Number(second);
            tokens.splice(i - 1, 3, result.toString());
            i -= 1;
        }

        if (tokens[i] === "-") {
            let result = "";
            let first = tokens[i - 1];
            let second = tokens[i + 1];
            result = Number(first) - Number(second);
            tokens.splice(i - 1, 3, result.toString());
            i -= 1;
        }
    }
    return tokens;
}


function ResetCalculator() {
    Calculator.tokens = [];
    Calculator.current = "";
    Calculator.output = "";
    Render();
}

function DeleteCurrentNumber() {

    if (Calculator.error) {
        Calculator.error = false;
        Calculator.current = "";
        Render();
        return;
    }

    const currentNumber = Calculator.current.split("");
    currentNumber.pop();
    Calculator.current = currentNumber.join("");

    Render();
}

function ResolveEquation() {

    if (isNumber(Calculator.current)) {
        Calculator.tokens.push(Calculator.current);
        Calculator.current = ""; 
    }

    DisplayEquationRender();

    let tokensCopy = [...Calculator.tokens];

    let afterMulDiv = ResolveMultiplicationDivision(tokensCopy);

    if (Calculator.error) {
        ResultRender();
        return;
    }

    let result = ResolveAdditionSubstraction(afterMulDiv);

    if (Calculator.error) {
        ResultRender();
        return;
    }

    Calculator.output = result[0];

    ResultRender();

    Calculator.current = Calculator.output;
    Calculator.tokens = [];
}

// Render functions
function ThemeRender() {
    Calculator.theme = `theme${slider.value}`
    body.classList = 'none';
    body.className = Calculator.theme;
}

function DisplayEquationRender() {
    equation.textContent = Calculator.tokens.join("") + Calculator.current;
}

function CurrentNumberRender() {
    if (Calculator.error) {
        nextNumberAndResult.textContent = "ERROR";
        return;
    }

    nextNumberAndResult.textContent = Calculator.current;
}

function ResultRender() {
    if (Calculator.error) {
        nextNumberAndResult.textContent = "ERROR";
        return;
    }

    nextNumberAndResult.textContent = Calculator.output;
}

function Render() {
    ThemeRender();
    CurrentNumberRender();
    DisplayEquationRender();
}


//Event listeners

slider.addEventListener('input', function () {
    Render();
});

document.querySelectorAll(".digit").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        Number(Calculator.current += value);
        Render();
    })
});

document.querySelector(".decimal").addEventListener("click", () => {
    const decimalNumber = AddDecimal(Calculator.current);
    Calculator.current = decimalNumber;
    Render();
})

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        const operator = button.dataset.value;

        if (Calculator.current !== "") {
            Calculator.tokens.push(Calculator.current);
            Calculator.tokens.push(operator);
            Calculator.current = "";
            Render();
        }

    })
})

document.querySelector("#reset_button").addEventListener("click", () => {
    ResetCalculator();
});

document.querySelector("#delete_button").addEventListener("click", () => {
    DeleteCurrentNumber();
});

document.querySelector("#equal_button").addEventListener("click", () => {
    ResolveEquation();
});