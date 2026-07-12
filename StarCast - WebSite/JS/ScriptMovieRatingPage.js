const filters = document.querySelectorAll(".filter");
const allGenres = document.querySelector(".all-genre");


function updateMovies (){
    const movies = document.querySelectorAll(".movie-card");
    const activeFilters = document.querySelectorAll(".filter.active");
    const activeGenre = []
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