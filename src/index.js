import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

let arrBreedsId = [];

loaderEl.classList.replace('loader', 'visually-hidden');
catInfoEl.classList.add('visually-hidden');
errorEl.classList.add('visually-hidden');

fetchBreeds()
    .then((data) => {
        data.forEach(element => {
            arrBreedsId.push({ text: element.name, value: element.id });
         });
        new SlimSelect({
                select: selectEl,
                 data: arrBreedsId
        })
        selectEl.addEventListener('change', onSelectBreed);
    })
    .catch(fetchError)

function onSelectBreed(evt) {
    loaderEl.classList.replace('visually-hidden', 'loader');
    // selectEl.classList.add('visually-hidden');
    catInfoEl.classList.add('visually-hidden');

    let breedsId = evt.currentTarget.value;
    fetchCatByBreed(breedsId)
        .then((data) => {
            loaderEl.classList.replace('loader', 'visually-hidden');
            selectEl.classList.remove('is-hidden');            
            const { url, breeds } = data[0];
            catInfoEl.innerHTML =  
                `
                 <img src="${url}" alt="${breeds[0].name}"/>
                 <div class = 'cat-description'>
                    <h1>${breeds[0].name}</h1>
                    <p>${breeds[0].description}</p>
                    <p><span>Temperament:</span> ${breeds[0].temperament}</p>
                </div>`
             
            catInfoEl.classList.remove('visually-hidden');
        })      
        .catch(fetchError)
}
catInfoEl.classList.remove('visually-hidden');

function fetchError(error) {
    selectEl.classList.remove('visually-hidden');
    loaderEl.classList.replace('loader', 'visually-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'left-top',
        timeout: 3000,
        width: '500px',
        fontSize: '20px'
       
    });
};
