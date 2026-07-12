const filters = document.querySelectorAll(".filter");
const allGenres = document.querySelector(".all-genre");
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
    });
});