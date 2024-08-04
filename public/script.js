const wheel = document.getElementById('wheel');
const investmentDisplay = document.getElementById('investment');
const pointsDisplay = document.getElementById('points');
const spinButton = document.getElementById('spin-button');
const greenLed = document.getElementById('green-led');
const blueLed = document.getElementById('blue-led');
const redLed = document.getElementById('red-led');
const yellowLed = document.getElementById('yellow-led');
const animationContainer = document.getElementById('animation-container');
const signUpForm = document.getElementById('sign-up-form');
const logInForm = document.getElementById('log-in-form');
const authForms = document.getElementById('auth-forms');
const profileSection = document.getElementById('profile');

let investment = 100;
let points = 0;
let currentRotation = 0;

spinButton.addEventListener('click', () => {
    spinButton.disabled = true;
    let rotation = Math.floor(Math.random() * 360);
    currentRotation += (1440 + rotation); // Ensure the wheel keeps spinning

    wheel.style.transition = 'transform 2s ease-out';
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        let selectedSegment = Math.floor((rotation % 360) / 90);
        let result;

        switch (selectedSegment) {
            case 0:
                result = 'addition';
                showLed(greenLed);
                break;
            case 1:
                result = 'subtraction';
                showLed(blueLed);
                break;
            case 2:
                result = 'multiplication';
                showLed(redLed);
                break;
            case 3:
                result = 'division';
                showLed(yellowLed);
                break;
        }

        applyOperation(result);
        spinButton.disabled = false;
    }, 2000); // Adjusted timeout to match the new duration
});

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('sign-up-username').value;
    const password = document.getElementById('sign-up-password').value;
    
    console.log('Sign Up:', { username, password });
    
    // Replace with actual sign-up logic
});

logInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('log-in-username').value;
    const password = document.getElementById('log-in-password').value;
    
    console.log('Log In:', { username, password });
    
    // Replace with actual log-in logic
    // Display profile section and hide auth forms
    authForms.style.display = 'none';
    profileSection.style.display = 'block';
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
    investmentDisplay.textContent = `Investment: ₹${investment.toFixed(2)}`;
    pointsDisplay.textContent = `Points: ${points}`;
}

function showLed(led) {
    [greenLed, blueLed, redLed, yellowLed].forEach(led => led.style.display = 'none');
    led.style.display = 'block';
}

function animateDollars(amount, direction) {
    const dollarDiv = document.createElement('div');
    dollarDiv.classList.add('dollar-animation');
    dollarDiv.textContent = (direction === 'up' ? '+' : '-') + `₹${amount.toFixed(2)}`;

    dollarDiv.style.animation = direction === 'up' ? 'dollar-up 2s forwards' : 'dollar-down 2s forwards';

    animationContainer.appendChild(dollarDiv);

    setTimeout(() => {
        animationContainer.removeChild(dollarDiv);
    }, 2000);
}
