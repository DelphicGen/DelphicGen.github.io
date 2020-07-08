// import {getMatches, getSavedMatches, getLeague} from './api.js';

$(document).ready(function () {
    AOS.init();
    $('.dropdown-trigger').dropdown();

    const loadPage = (page) => {
        if (page === "home") {
            getMatches(page);
        } else if (page === "saved") {
            getSavedMatches();
        } else if (page === 'league') {
            getLeague();
        }
    }

    $('.saved-page').on('click', () => {
        loadPage('saved');
    });

    let page = window.location.hash.substr(1);
    let url = window.location.href;
    if (page  === '' && !(url.includes('league'))) page = "home";
    else if (url.includes('league')) page = "league"

    loadPage(page);

});
