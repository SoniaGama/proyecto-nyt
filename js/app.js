const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    searchField.value = '';
    getNews();
});

function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=3b41a660d08644568f4204191e5a6a73`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
};

const paintResults = response => {
    let output = ``;

    response.forEach((element, index) => {
        if (index < 5) {
            const title = element.headline.main;
            const snippet = element.snippet;
            const urlImage = element.multimedia[15].url;
            const imageNews = `https://www.nytimes.com/${urlImage}`;
            const newsUrl = element.web_url;

            output += `
                <div class="row">
                       <div>
                           <h5 class="header">${title}</h5>
                           <div class="card horizontal">
                               <div class="card-image">
                                   <img src="${imageNews}" alt="imageNews">
                               </div>
                               <div class="card-stacked">
                                   <div class="card-content">
                                       <p>${snippet}</p>
                                   </div>
                                   <div class="card-action">
                                       <a href="${newsUrl}" target="_blank">Here you can read the complete news</a>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               `
        }
    });
    responseContainer.innerHTML = output;
}


function addNews() {
    const data = JSON.parse(this.responseText);
    const response = data.response.docs;
    paintResults(response);
};

function handleError() {
    console.log('error');
};