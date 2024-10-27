import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const createButton = document.querySelector('button');
const form = document.querySelector('.form');

const delayInput = form.elements.delay; 
const stateInput = form.elements.state; 
let delayValue, stateValue;

function createPromise(delayValue, stateValue) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stateValue === 'fulfilled') {
                resolve(delayValue);
            } else {
                reject(delayValue); 
            }
        }, delayValue); 
    });
}
const enableButton = (button) => {
    if (!button.classList.contains('active')) {
        button.classList.add('active');
        button.disabled = false;
    }
}
const disableButton = (button) => {
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        button.disabled = true;
    }
}

form.addEventListener('input', ()=> {
    delayInput.value.trim() && stateInput.value ? enableButton(createButton) : disableButton(createButton);
})

form.addEventListener('submit', event => {
    event.preventDefault();

    delayValue = parseInt(delayInput.value); 
    stateValue = stateInput.value;

    createPromise(delayValue, stateValue)
        .then((delay) => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
                color: 'green',
            });
        })
        .catch((delay) => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
                color: 'red',
            });
        });

});