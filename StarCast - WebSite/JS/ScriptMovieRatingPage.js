const filters = document.querySelectorAll(".filter");
const allGenres = document.querySelector(".all-genre");
const movieContainer = document.querySelector("#movies-container");

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
            const title = movie.querySelector("title").textContent;
            const genre = movie.querySelector("genre").textContent;
            const year = movie.querySelector("year").textContent;
            const stars = movie.querySelector("stars").textContent;
            const rating = movie.querySelector("rating").textContent;
            const image = movie.querySelector("image").textContent;
            movieContainer.innerHTML += `
            <div class = "movie-card" data-genre = "${genre}">
                    <div class = "image-container">
                        <img src = "${image}" alt = "independence-day-cover">
                    </div>
                    <div class = "movie-meta-data">
                        <div class="meta-row">
                            <span class="movie-genre">${genre}</span>
                            <span class="movie-year">${year}</span>
                        </div>
                        <h3 class="movie-title">${title}</h3>
                        <hr id ="divider">
                        <div class="stars-row">
                            <span class="stars">${stars}</span>
                            <span class="user-score">${rating}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        const param = new URLSearchParams(window.location.search);
        const search = param.get("search");
        if (search){
            document.querySelector(".movie-search").value = search;
            searchMovie(search);
        }
    });

}

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

filters.forEach(button => {
    button.addEventListener("click" , () => {
        if (button == allGenres){
            filters.forEach(btn => {
                btn.classList.remove("active");
            });
            button.classList.add("active");
        }else{
            allGenres.classList.remove("active");
            button.classList.toggle("active");

            const activeFilters = document.querySelectorAll(".filter.active");
            if (activeFilters.length == filters.length - 1){
                filters.forEach(btn => {
                    btn.classList.remove("active");
                })
                allGenres.classList.add("active");
            }
        }
        const activeFilters = document.querySelectorAll(".filter.active");
        if (activeFilters.length == 0){
            allGenres.classList.add("active");
        }
        updateMovies();
    });
});

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

movieLoader();

const movieSearch = document.querySelector("#movie-search");
movieSearch.addEventListener("input", () => {
    searchMovie(movieSearch.value.trim())
});

