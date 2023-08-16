import {fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import './styles.css'
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectorEl = document.querySelector('.breed-select');
const catCardEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

loaderEl.classList.replace('loader', 'is-hidden');
errorEl.classList.add('is-hidden');
catCardEl.classList.add('is-hidden');

let arrBreedsId = [];
fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: selectorEl,
        data: arrBreedsId
    });
    })
.catch(fetchError);


selectorEl.addEventListener('change', onSelectBreed)

function onSelectBreed(e) {
    loaderEl.classList.replace('is-hidden', 'loader');
    selectorEl.classList.add('is-hidden');
    catCardEl.classList.add('is-hidden');

    const breedId = e.currentTarget.value;
    fetchCatByBreed(breedId).then(data => {
        loaderEl.classList.replace('loader', 'is-hidden');
      selectorEl.classList.remove('is-hidden');

        const { url, breeds } = data[0];

        catCardEl.innerHTML = `<div class="card-img">
        <img src="${url}" alt="${breeds[0].name}" width="300"/>
        </div>
        <div class="card">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><b>Temperament:</b> ${breeds[0].temperament}</p>
        </div>`
        catCardEl.classList.remove('is-hidden');
    }).catch(fetchError);
};

function fetchError(error) {
    selectorEl.classList.remove('is-hidden');
    loaderEl.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};