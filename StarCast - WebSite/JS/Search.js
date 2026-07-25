//Select the search term
const searchBars = document.querySelectorAll("#movie-search");
searchBars.forEach(searchBar => {
    //Check if the enter key is pressed
    searchBar.addEventListener("keydown" , (event) =>{
        if(event.key === "Enter"){
            const value = searchBar.value.trim();
            if (value !== ""){
                //Redirect the user to movie ratings page while adding the search value to the URL
                window.location.href = `MoviesAndRatingPage.html?search=${encodeURIComponent(value)}`;
            }  
        }
    });
});
