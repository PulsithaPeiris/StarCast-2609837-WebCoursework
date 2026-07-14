const searchBars = document.querySelectorAll("#movie-search");
searchBars.forEach(searchBar => {
    searchBar.addEventListener("keydown" , (event) =>{
        if(event.key === "Enter"){
            const value = searchBar.value.trim();
            if (value !== ""){
                window.location.href = `MoviesAndRatingPage.html?search=${encodeURIComponent(value)}`;
            }  
        }
    });
});
