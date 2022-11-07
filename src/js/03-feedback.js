import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  textArea: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onSaveValue, 500));
refs.form.addEventListener('submit', onFormSubmit);

const FEEDBACK_KEY = 'feedback-form-state';
const formData = {};
let saveFormData = '';
let storageData = '';
let getStorageData = {};

onInputSaveValue();

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_KEY);
}

function onSaveValue(e) {
  formData[e.target.name] = e.target.value;

  saveFormData = JSON.stringify(formData);
  localStorage.setItem(FEEDBACK_KEY, saveFormData);
}

function onInputSaveValue() {
  storageData = localStorage.getItem(FEEDBACK_KEY);
  getStorageData = JSON.parse(storageData);

  if (storageData) {
    refs.input.value = getStorageData.email;
    refs.textArea.value = getStorageData.message;
  }
}
