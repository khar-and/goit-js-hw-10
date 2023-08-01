const URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_s0lcBzs1W5DxJIB5XebaVk00xplSx3NdATmq6PeVLBHF4GzB1tD0m15CvTjtWoQ8';


export function fetchBreeds() {
    return fetch(`${URL}/breeds?api-key=${API_KEY}`)
        .then((response) => {
            // console.log(response.json());
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();      //   це буде проміс
            
        })
}

export function fetchCatByBreed(breedId) {
    return fetch(`${URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        })
}