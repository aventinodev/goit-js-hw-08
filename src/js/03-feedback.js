import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  textArea: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onSaveValue, 500));
refs.form.addEventListener('submit', onFormSubmit);

const FEEDBACK_KEY = 'feedback-form-state';
let formData = {};
let saveFormData = '';
let storageData = '';

onInputSaveValue();

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_KEY);
  formData = {};
}

function onSaveValue(e) {
  formData[e.target.name] = e.target.value;

  saveFormData = JSON.stringify(formData);
  console.log(saveFormData);
  localStorage.setItem(FEEDBACK_KEY, saveFormData);
}

function onInputSaveValue() {
  storageData = localStorage.getItem(FEEDBACK_KEY);

  if (storageData) {
    formData = JSON.parse(storageData);

    for (let key of Object.keys(formData)) {
      let inputEl = refs.form.querySelector(`[name="${key}"]`);
      if (inputEl) {
        inputEl.value = formData[key];
      }
    }
  }
}
