const toggleIngredients = document.getElementById('toggleIngredients');
const ingredients = document.getElementById('ingredients');

const toggleSteps = document.getElementById('toggleSteps');
const steps = document.getElementById('steps');

const startCooking = document.getElementById('startCooking');
const nextStep = document.getElementById('nextStep');
const stepItems = steps.querySelectorAll('li');

const progress = document.getElementById('progress');
const timerDisplay = document.getElementById('timer');

let currentStep = 0;
let timer;
let timeLeft = 30 * 60; // 30 minutes in seconds

// Toggle Ingredients
toggleIngredients.addEventListener('click', () => {
  ingredients.classList.toggle('hidden');
  toggleIngredients.textContent = ingredients.classList.contains('hidden') ? 'Show Ingredients' : 'Hide Ingredients';
});

// Toggle Steps
toggleSteps.addEventListener('click', () => {
  steps.classList.toggle('hidden');
  toggleSteps.textContent = steps.classList.contains('hidden') ? 'Show Steps' : 'Hide Steps';
});

// Start Cooking
startCooking.addEventListener('click', () => {
  if (steps.classList.contains('hidden')) steps.classList.remove('hidden');
  currentStep = 0;
  highlightStep();
  nextStep.disabled = false;
  startTimer();
});

// Next Step
nextStep.addEventListener('click', () => {
  currentStep++;
  highlightStep();
  updateProgress();
});

// Highlight Step
function highlightStep() {
  stepItems.forEach((li, index) => {
    li.style.background = index === currentStep ? '#ffe5d9' : '';
  });
  if (currentStep >= stepItems.length) {
    nextStep.disabled = true;
  }
}

// Update Progress Bar
function updateProgress() {
  const percent = ((currentStep + 1) / stepItems.length) * 100;
  progress.style.width = `${percent}%`;
}

// Timer
function startTimer() {
  timerDisplay.classList.remove('hidden');
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "Time's up!";
      return;
    }
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}
