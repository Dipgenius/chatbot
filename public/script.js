const wheel = document.getElementById('wheel');
const investmentDisplay = document.getElementById('investment');
const pointsDisplay = document.getElementById('points');
const spinButton = document.getElementById('spin-button');
const greenLed = document.getElementById('green-led');
const blueLed = document.getElementById('blue-led');
const redLed = document.getElementById('red-led');
const yellowLed = document.getElementById('yellow-led');
const animationContainer = document.getElementById('animation-container');

let investment = 1000;
let points = 0;
let currentRotation = 0;

spinButton.addEventListener('click', () => {
    spinButton.disabled = true;
    let rotation = Math.floor(Math.random() * 360);
    currentRotation += (1440 + rotation); // Ensure the wheel keeps spinning

    wheel.style.transition = 'transform 2s ease-out';
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        let selectedSegment = (rotation % 360) / 90;
        let result;

        if (selectedSegment >= 0 && selectedSegment < 1) {
            result = 'addition';
            showLed(greenLed);
        } else if (selectedSegment >= 1 && selectedSegment < 2) {
            result = 'subtraction';
            showLed(blueLed);
        } else if (selectedSegment >= 2 && selectedSegment < 3) {
            result = 'multiplication';
            showLed(redLed);
        } else {
            result = 'division';
            showLed(yellowLed);
        }

        applyOperation(result);
        spinButton.disabled = false;
    }, 2000); // Adjusted timeout to match the new duration
});

function applyOperation(operation) {
    let amount;
    switch (operation) {
        case 'addition':
            amount = 100;
            investment += amount;
            points += 10;
            animateDollars(amount, 'up');
            break;
        case 'subtraction':
            amount = 100;
            investment -= amount;
            points -= 5;
            animateDollars(amount, 'down');
            break;
        case 'multiplication':
            amount = investment * 0.1;
            investment *= 1.1;
            points += 20;
            animateDollars(amount, 'up');
            break;
        case 'division':
            amount = investment * 0.1;
            investment /= 1.1;
            points -= 10;
            animateDollars(amount, 'down');
            break;
    }
    investmentDisplay.textContent = `Investment: $${investment.toFixed(2)}`;
    pointsDisplay.textContent = `Points: ${points}`;
}

function showLed(led) {
    [greenLed, blueLed, redLed, yellowLed].forEach(led => led.style.display = 'none');
    led.style.display = 'block';
}

function animateDollars(amount, direction) {
    const dollarDiv = document.createElement('div');
    dollarDiv.classList.add('dollar-animation');
    dollarDiv.textContent = (direction === 'up' ? '+' : '-') + `$${amount.toFixed(2)}`;

    if (direction === 'up') {
        dollarDiv.style.animation = 'dollar-up 2s forwards';
    } else {
        dollarDiv.style.animation = 'dollar-down 2s forwards';
    }

    animationContainer.appendChild(dollarDiv);

    setTimeout(() => {
        animationContainer.removeChild(dollarDiv);
    }, 2000);
}
