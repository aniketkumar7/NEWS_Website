/* These two lines of code are defining constants `API_KEY` and `url`. `API_KEY` is a unique key
provided by the News API service that is used to authenticate and authorize the user to access the
API. `url` is the base URL for the News API service that is used to fetch news articles. The `q=`
parameter in the URL is used to specify the search query for the news articles. */
const API_KEY = "0d49a421d862469fa8732c24f4ef8af3";
const url = "https://newsapi.org/v2/everything?q=";




/**
 * The code loads news related to India on page load and includes a function to reload the page.
 */
window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}



/**
 * This function fetches news articles based on a query and API key, and then binds the data to a
 * webpage.
 * @param query - The query parameter is a string that represents the search query for the news
 * articles that we want to fetch. It is used to construct the URL for the API request.
 */
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}



/**
 * This function binds data to a news card template and appends it to a container element.
 * @param articles - an array of objects representing news articles, each object containing information
 * such as the article title, author, description, and image URL.
 */
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}





/**
 * The function fills data from an article object into a card template.
 * @param cardClone - A cloned HTML element that represents a news card.
 * @param article - an object containing information about a news article, including its title,
 * description, source, image URL, and publication date.
 */
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}




/**
 * The function handles the click event on a navigation item, fetches news based on the clicked item's
 * ID, and updates the active state of the clicked item.
 * @param id - The id of the navigation item that was clicked.
 */
/**
 * The function handles the click event on a navigation item, fetches news based on the clicked item's
 * ID, and updates the active state of the clicked item.
 * @param id - The id of the navigation item that was clicked.
 */
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}





/* This code is adding a click event listener to a search button element and fetching news articles
based on the search query entered in a search text input element. When the search button is clicked,
the function retrieves the value of the search text input element, checks if it is not empty, and
then calls the `fetchNews` function with the search query as a parameter. It also removes the active
state from any previously selected navigation item and sets the `curSelectedNav` variable to null. */
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
