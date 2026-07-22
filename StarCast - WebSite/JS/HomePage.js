const recommendationMovies = document.querySelector("#recommendation-movies");
function loadRecommendationMovies (){
    fetch("Data/movies.xml")
    .then(input => {
        if(!input.ok){
            throw new Error ("XML File not found! ");
        }
        return input.text()
    }).then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data , "application/xml");
        const movies = xml.getElementsByTagName("movie");
        for(let i = 0; i < 5; i++){
            movie = movies[i];
            const title = movie.querySelector("title").textContent;
            const genre = movie.querySelector("genre").textContent;
            const year = movie.querySelector("year").textContent;
            const stars = movie.querySelector("stars").textContent;
            const rating = movie.querySelector("rating").textContent;
            const image = movie.querySelector("image").textContent;
            const alt = movie.querySelector("alt").textContent;
            recommendationMovies.innerHTML += `
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
    });
}

const featuredMovies = document.querySelector("#featured-movies");
function loadFeaturedMovies (){
    fetch("Data/movies.xml")
    .then(input => {
        if(!input.ok){
            throw new Error ("XML File not found! ");
        }
        return input.text()
    }).then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data , "application/xml");
        const movies = xml.getElementsByTagName("movie");
        for(let i = 0; i < 5; i++){
            let x = movies.length - i - 1;
            movie = movies[x];
            const title = movie.querySelector("title").textContent;
            const genre = movie.querySelector("genre").textContent;
            const year = movie.querySelector("year").textContent;
            const stars = movie.querySelector("stars").textContent;
            const rating = movie.querySelector("rating").textContent;
            const image = movie.querySelector("image").textContent;
            const alt = movie.querySelector("alt").textContent;
            featuredMovies.innerHTML += `
            <div class = "movie-card" data-genre = "${genre}">
                    <div class = "image-container">
                        <img src = "${image}" alt = "${alt}}">
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
    });
}

loadRecommendationMovies();
loadFeaturedMovies ();