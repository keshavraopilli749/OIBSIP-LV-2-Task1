const display = document.getElementById("calc-display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let operator = null;
let previousValue = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        // Clear functionality
        if (button.id === "clear") {
            currentInput = "";
            previousValue = "";
            operator = null;
            updateDisplay();
            return;
        }

        // Equal functionality
        if (button.id === "equal") {
            if (operator && previousValue !== "" && currentInput !== "") {
                currentInput = calculate(previousValue, operator, currentInput);
                operator = null;
                previousValue = "";
                updateDisplay();
            }
            return;
        }

        // Operator functionality
        if (button.classList.contains("operator")) {
            if (currentInput !== "") {
                if (operator && previousValue !== "") {
                    // Perform calculation if chaining operators
                    currentInput = calculate(previousValue, operator, currentInput);
                }
                operator = value;
                previousValue = currentInput;
                currentInput = "";
            }
            updateDisplay();
            return;
        }

        // Append number or decimal to current input
        if (value) {
            currentInput += value;
        }

        updateDisplay();
    });
});

// Function to calculate the result
function calculate(a, operator, b) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    if (isNaN(num1) || isNaN(num2)) return "Error";

    switch (operator) {
        case "+":
            return (num1 + num2).toString();
        case "-":
            return (num1 - num2).toString();
        case "*":
            return (num1 * num2).toString();
        case "/":
            return num2 !== 0 ? (num1 / num2).toString() : "Error";
        default:
            return "Error";
    }
}

// Function to update the display
function updateDisplay() {
    display.value = currentInput || previousValue || "0";
}
