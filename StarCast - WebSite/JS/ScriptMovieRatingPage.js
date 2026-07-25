//Selecting the relavent elements
const filters = document.querySelectorAll(".filter");
const allGenres = document.querySelector(".all-genre");
const movieContainer = document.querySelector("#movies-container");

//This function loads the movies and then create the movie cards
function movieLoader (){
    fetch("Data/Movies.xml")
    .then(input => {
        if(!input.ok){
            throw new Error("XML File not found !");
        }
        return input.text()
    }).then(data =>{
        const parser = new DOMParser();
        const xml = parser.parseFromString(data , "application/xml");
        const movies = xml.getElementsByTagName("movie");
        for (let movie of movies){
            //Selecting the relavent attributes from the XML file
            const title = movie.querySelector("title").textContent;
            const genre = movie.querySelector("genre").textContent;
            const year = movie.querySelector("year").textContent;
            const stars = movie.querySelector("stars").textContent;
            const rating = movie.querySelector("rating").textContent;
            const image = movie.querySelector("image").textContent;
            const alt = movie.querySelector("alt").textContent;
            //Creating the movie card
            movieContainer.innerHTML += `
            <div class = "movie-card" data-genre = "${genre}">
                    <div class = "image-container">
                        <img src = "${image}" alt = "${alt}">
                    </div>
                    <div class = "movie-meta-data">
                        <div class="meta-row">
                            <span class="movie-genre">${genre}</span>
                            <span class="movie-year">${year}</span>
                        </div>
                        <h2 class="movie-title">${title}</h2>
                        <hr id ="divider">
                        <div class="stars-row">
                            <span class="stars">${stars}</span>
                            <span class="user-score">${rating}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        //Check if the movie page was loaded through the redirect of a search
        //Define the search format and obtain the search value
        const param = new URLSearchParams(window.location.search);
        const search = param.get("search");
        if (search){
            document.querySelector(".movie-search").value = search;
            //Call search function
            searchMovie(search);
        }
    });

}

//This function will read the movies and update the relevant movies according to the active filters by toggling the visibility
//through class attributes
function updateMovies (){
    const movies = document.querySelectorAll(".movie-card");
    const activeFilters = document.querySelectorAll(".filter.active");
    const activeGenre = [];
    activeFilters.forEach(button => {
        activeGenre.push(button.dataset.genre);
    });
    movies.forEach(movie =>{
        const movieGenre = movie.dataset.genre;
        if(activeGenre.includes("allGenre")){
            movie.classList.remove("hidden");
        }
        else if(activeGenre.includes(movieGenre)){
            movie.classList.remove("hidden");
        }
        else{
            movie.classList.add("hidden");
        }
    });
}

//This function will search whether there are movies including the entered values and hide or show different movie cards accordingly
function searchMovie(searchTerm){
    const movies = document.querySelectorAll(".movie-card");
    movies.forEach(movie => {
        const title = movie.querySelector(".movie-title").textContent.toLowerCase();
        if (title.includes(searchTerm.toLowerCase())){
            movie.classList.remove("hidden")
        }
        else { movie.classList.add("hidden"); }
    });
}

//Check if any filter button is clicked
filters.forEach(button => {
    button.addEventListener("click" , () => {
        //Sets only all genre to active state
        if (button == allGenres){
            filters.forEach(btn => {
                btn.classList.remove("active");
            });
            button.classList.add("active");
        }else{
            //All genre is deactivated while the clicked one is activated
            allGenres.classList.remove("active");
            button.classList.toggle("active");

            //Checks if all filters excluding all genre is active, then default to all genre
            const activeFilters = document.querySelectorAll(".filter.active");
            if (activeFilters.length == filters.length - 1){
                filters.forEach(btn => {
                    btn.classList.remove("active");
                })
                allGenres.classList.add("active");
            }
        }

        //If none of the filters are active, then default to all genre
        const activeFilters = document.querySelectorAll(".filter.active");
        if (activeFilters.length == 0){
            allGenres.classList.add("active");
        }
        //Call the update movie function
        updateMovies();
    });
});

//Call the movie loader
movieLoader();

//Obtain the search term and filter movies accordingly
const movieSearch = document.querySelector("#movie-search");
movieSearch.addEventListener("input", () => {
    searchMovie(movieSearch.value.trim())
});

