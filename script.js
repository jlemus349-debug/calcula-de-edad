const form = document.getElementById('age-form');
const birthInput = document.getElementById('birth-year');
const currentInput = document.getElementById('current-year');
const result = document.getElementById('result');
const ageValue = document.getElementById('age-value');
const ageUnit = document.getElementById('age-unit');
const message = document.getElementById('message');
const editButton = document.getElementById('edit-btn');
const clearButton = document.getElementById('clear-btn');

// El año actual se completa automáticamente, pero el usuario puede cambiarlo.
currentInput.value = new Date().getFullYear();

function hideResult() {
  result.hidden = true;
  message.textContent = '';
}

function calculateAge(event) {
  event.preventDefault();
  message.textContent = '';

  const birthYear = Number(birthInput.value);
  const currentYear = Number(currentInput.value);

  if (birthInput.value.trim() === '' || currentInput.value.trim() === '') {
    message.textContent = 'Por favor, completa los dos campos.';
    hideResult();
    return;
  }

  if (!Number.isInteger(birthYear) || !Number.isInteger(currentYear)) {
    message.textContent = 'Ingresa años válidos, sin decimales.';
    hideResult();
    return;
  }

  if (birthYear < 1 || currentYear < 1) {
    message.textContent = 'Los años deben ser mayores que cero.';
    hideResult();
    return;
  }

  if (birthYear > currentYear) {
    message.textContent = 'El año de nacimiento no puede ser posterior al año actual.';
    hideResult();
    return;
  }

  const age = currentYear - birthYear;
  ageValue.textContent = age;
  ageUnit.textContent = age === 1 ? 'año' : 'años';
  result.hidden = false;
}

form.addEventListener('submit', calculateAge);

editButton.addEventListener('click', () => {
  birthInput.focus();
  message.textContent = 'Modifica los años y vuelve a presionar “Calcular edad”.';
});

clearButton.addEventListener('click', () => {
  form.reset();
  currentInput.value = new Date().getFullYear();
  hideResult();
  birthInput.focus();
});

[birthInput, currentInput].forEach((input) => {
  input.addEventListener('input', hideResult);
});
