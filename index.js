let currentNum = "";
let prevNum = "";
let operator = "";

const currentDisplayNum = document.querySelector(".currentNum");
const prevDisplayNum = document.querySelector(".prevNum");

window.addEventListener("keydown", handleKeyPress);

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
    if (currentNum != "" && prevNum != "") calculate();
});


const decimal = document.querySelector(".decimal");
decimal.addEventListener('click', () => {
    addDecimal();
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalc);

const deleteNum = document.querySelector(".delete");
deleteNum.addEventListener("click", deleteLastNum);

const numBtn = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

numBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(num) {
    if (prevNum !== "" && currentNum !== "" && operator !== "") {
        currentDisplayNum.textContent = currentNum;
    }
    if (currentNum.length <= 11) {
        currentNum += num;
        currentDisplayNum.textContent = currentNum;
    }
}

operators.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    if (prevNum === "") {
      prevNum = currentNum;
      operatorCheck(op);
    } else if (currentNum === "") {
      operatorCheck(op);
    } else {
      calculate();
      operator = op;
      currentDisplayNum.textContent = "0";
      prevDisplayNum.textContent = prevNum + " " + operator;
    }
  }
  
  function operatorCheck(text) {
    operator = text;
    prevDisplayNum.textContent = prevNum + " " + operator;
    currentDisplayNum.textContent = "0";
    currentNum = "";
  }

function calculate() {
    prevNum = parseFloat(prevNum);
    currentNum = parseFloat(currentNum);

    if (operator === "+") {
        prevNum += currentNum;
    } else if (operator === "-") {
        prevNum -= currentNum;
    } else if (operator === "x") {
        prevNum *= currentNum;
    } else if (operator === "/") {
        if (currentNum <= 0) {
            prevNum = "Cannot divide by 0";
            prevDisplayNum.textContent = "";
            currentDisplayNum.textContent = prevNum;
            operator = "";
            return;
        }
        prevNum /= currentNum;
    }

    prevNum = Math.round(prevNum * 1000000) / 1000000;
    prevNum = prevNum.toString();
    displayResult();
}

function displayResult() {
    if (prevNum.length <= 11) {
        currentDisplayNum.textContent = prevNum;
    } else {
        currentDisplayNum.textContent = prevNum.slice(0, 11) + "...";
    }
    prevDisplayNum.textContent = "";
    operator = "";
    currentNum = "";
}

function clearCalc() {
    currentNum = "";
    prevNum = "";
    operator = "";
    currentDisplayNum.textContent = "0";
    prevDisplayNum.textContent = "";
}

function addDecimal() {
    if (!currentNum.includes(".")) {
        currentNum += ".";
        currentDisplayNum.textContent = currentNum;
    }
}

function deleteLastNum() {
    if (currentNum !== "") {
        currentNum = currentNum.slice(0, -1);
        currentDisplayNum.textContent = currentNum;
    }
}

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key === "Backspace") deleteLastNum();
    if (e.key >= 0 && e.key <= 9) handleNumber(e.key);
    if (e.key === "Enter" || e.key === "=" && currentNum !== "" && prevNum !== "") calculate();
    if (e.key === "+" || e.key === "-" || e.key === "/") handleOperator(e.key);
    if (e.key === "*") handleOperator("x");
    if (e.key === "." || e.key === ",") addDecimal();
}
