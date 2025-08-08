const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");
const equals = document.querySelector(".equal");
let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;
    const tokens = expression.match(/(\d+(\.\d+)?|\+|\-|\*|\/|\%)/g) || []; //since the first enter is null i need this for default ||[]

    if (buttonValue.toLocaleLowerCase() === "del") {
      deleteLast();
    } else if (buttonValue.toLocaleLowerCase() === "clr") {
      clearDisplay();
    } else {
      const lastToken = tokens[tokens.length - 1];
      if (
        (isOperator(lastToken) && isOperator(buttonValue)) ||
        (display.value === "" && isOperator(buttonValue))
      ) {
        return;
      } else {
        expression += buttonValue;
        updateDisplay(expression);
      }
    }
  });
});

equals.addEventListener("click", () => {
  calculate();
});

function isOperator(char) {
  return ["-", "+", "*", "/", "%"].includes(char);
}
function clearDisplay() {
  display.value = "";
  expression = "";
}
function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay(expression);
}
function calculate() {
  try {
    const tokens = expression.match(/(\d+(\.\d+)?|\+|\-|\*|\/|\%)/g) || []; //example [3*2]
    let stack = [];

    for (let i = 0; i <= tokens.length - 1; i++) {
      //to loop every tokens we have //arr.length-1 is 2
      const token = tokens[i]; //1st loop 3 //2nd loop *
      if (token === "*") {
        //1st false  //2nd loop true
        const prev = parseFloat(stack.pop()); //2nd loop to get the prev value before the *
        const next = parseFloat(tokens[++i]); //2nd loop ++i because to add first then get the value
        stack.push(prev * next); //2nd loop stack [6]
      } else if (token === "/") {
        //1st false

        const prev = parseFloat(stack.pop());
        const next = parseFloat(tokens[++i]);
        stack.push(prev / next);
      } else if (token === "%") {
        //1st false
        let count = tokens.filter((ch) => ch === "%").length; //to get how many % in  array
        let prev = parseFloat(stack.pop());
        let next = parseFloat(tokens[++i]) || 1;
        stack.push((prev * (next / 100)).toFixed(count * 2)); //count *2 because i see on my calcu that theres a pattern on how many % you use its * 2 the decimal
        console.log(stack);
      } else {
        //1st false statement
        stack.push(token); //1st stack['3']
      }
    }

    let result = parseFloat(stack[0]);
    for (let i = 1; i <= stack.length - 1; i += 2) {
      const op = stack[i]; //get only the operato
      let num = parseFloat(stack[i + 1]); //number next the operator

      if (op === "+") {
        result += num;
      } else if (op === "-") {
        result -= num;
      }
    }
    if (isNaN(result) || String(result).toLowerCase().includes("e")) {
      throw new Error("Invalid calculation");
    }
    if (result === 2) {
      setTimeout(() => {
        window.open("https://www.youtube.com/watch?v=72AlNMT-XME", "_blank");
      }, 3000);
    }
    expression = result.toString(); // to continue
    updateDisplay(expression);
  } catch (error) {
    display.value = "error";
    expression = "";
  }
}

function updateDisplay(value) {
  display.value = value;

  // Reset font size to default
  display.style.fontSize = "2rem";

  // Shrink text if overflow happens
  while (display.scrollWidth > display.clientWidth) {
    let currentSize = parseFloat(window.getComputedStyle(display).fontSize);
    display.style.fontSize = currentSize - 1 + "px";
  }
}
const toggleBtn = document.querySelector(".toggle");
const bgMusic = document.getElementById("bg-music");
toggleBtn.addEventListener("click", () => {
  // Move slider
  toggleBtn.classList.toggle("active");

  // Switch dark mode
  document.body.classList.toggle("dark");

  if (toggleBtn.classList.contains("active")) {
    setTimeout(() => {
      bgMusic.play();
    }, 3000);
  }
});
