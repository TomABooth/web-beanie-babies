/* Imports */
import { getAstroSigns, getBeanies } from './fetch-utils.js';
import { renderAstroSignOption, renderBeanie } from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notification-display');
const beanieList = document.getElementById('beanie-list');
const astroSignSelect = document.getElementById('astro-sign-select');

/* State */
let beanies = [];
let error = null;
let astroSigns = [];

/* Events */
window.addEventListener('load', async () => {
    findBeanies();
    const response = await getAstroSigns();

    error = response.error;
    astroSigns = response.data;

    if (!error) {
        displayAstroSignOption();
    }
});

async function findBeanies() {
    const response = await getBeanies();

    error = response.error;
    beanies = response.data;

    displayNotifications();
    if (!error) {
        displayBeanies();
    }
}

/* Display Functions */
function displayBeanies() {
    beanieList.innerHTML = '';

    for (const beanie of beanies) {
        const beanieEl = renderBeanie(beanie);
        beanieList.append(beanieEl);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
    }
}

function displayAstroSignOption() {
    for (const astroSign of astroSigns) {
        const option = renderAstroSignOption(astroSign);
        console.log(option, astroSignSelect);
        astroSignSelect.append(option);
    }
}

// (don't forget to call any display functions you want to run on page load!)
