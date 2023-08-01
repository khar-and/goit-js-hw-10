import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";


const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

let arrBreedsId = [];

fetchBreeds()
    .then((data) => {
        data.forEach(element => {
            arrBreedsId.push({ text: element.name, value: element.id });
         });
        new SlimSelect({
                select: selectEl,
                 data: arrBreedsId
        })
    })
    .catch(err => console.log(err))

selectEl.addEventListener('change', onSelectBreed);

function onSelectBreed(evt) {
    let breedsId = evt.currentTarget.value;
    fetchCatByBreed(breedsId)
        .then((data) => {
            const { url, breeds } = data[0];
            catInfoEl.innerHTML = 
                `
                 <img src="${url}" alt="${breeds[0].name}" width="500"/>
                 <h1>${breeds[0].name}</h1>
                <p>${breeds[0].description}</p>
                <p><b>Temperament:</b> ${breeds[0].temperament}</p>`
    })
        .catch(err => console.log(err))
}

function createMarkup() {
    return 
    
}