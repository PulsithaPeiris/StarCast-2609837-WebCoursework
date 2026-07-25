//Selecting the relevant elements
const movieInput = document.querySelector("#movieTitle");
const movieSuggestion = document.querySelector("#movieSuggestions");
//Declare block scope list
let movieTitle = [];

//This function will read the XML file and add all the movie titles to the movieTitle list
function loadMovieTitle (){
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
            movieTitle.push(title);
        }
    });
}

//Calling the function
loadMovieTitle();

//Detecting if a title is entered if yes filter the saved titles on the condition where the inputed 
// value is included in the current movie title
movieInput.addEventListener("input", () => {
    const value = movieInput.value.toLowerCase();
    movieSuggestion.innerHTML = "";
    if (value == "") {return;}
    const filteredMovies = movieTitle.filter(movie => movie.toLowerCase().includes(value));
    //Checks if a suggestion is clicked, if yes add the clicked value into the input field
    filteredMovies.forEach(movie => {
        const option = document.createElement("p");
        option.textContent = movie;
        option.addEventListener("click", () => {
            movieInput.value = movie;
            movieSuggestion.innerHTML = "";
        });
        movieSuggestion.appendChild(option);
    });
})

//Select the form and check if the submit button is clicked
const form = document.querySelector("#feedback-form");
form.addEventListener("submit" , (event) => {
    //Alter the default execution style
    event.preventDefault();

    //Reset the errors
    document.querySelector("#fNameError").textContent = "";
    document.querySelector("#lNameError").textContent = "";
    document.querySelector("#emailError").textContent = "";
    document.querySelector("#titleError").textContent = "";
    document.querySelector("#msgError").textContent = "";
    document.querySelector("#genreError").textContent = "";
    document.querySelector("#ratingError").textContent = "";
    document.querySelector("#recommendError").textContent = "";

    //Select the relevant fields and initialize the isValid variable
    const fName = document.querySelector("#fName").value.trim();
    const lName = document.querySelector("#lName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const title = document.querySelector("#movieTitle").value.trim();
    const genre = document.querySelector("#movieGenre").value;
    const written = document.querySelector("#writtenReview").value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');
    const recommendation = document.querySelector('input[name="recommendation"]:checked');
    var isValid = true;

    //Check if the entered value is empty or against valid values or formats
    //If illegal value is entered then display error
    if(fName == ""){
        document.querySelector("#fNameError").textContent = "Please enter your first name !";
        isValid = false;
    }
    if(lName == ""){
        document.querySelector("#lNameError").textContent = "Please enter your last name !";
        isValid = false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email)){
        document.querySelector("#emailError").textContent = "Please enter a valid email address !";
        isValid = false;
    }
    if(title == "" || !movieTitle.includes(title)){
        document.querySelector("#titleError").textContent = "Please enter a valid movie title !";
        isValid = false;
    }
    if(genre == ""){
        document.querySelector("#genreError").textContent = "Please select a movie genre !";
        isValid = false;
    }
    if(!rating){
        document.querySelector("#ratingError").textContent = "Please provide a rating !";
        isValid = false;     
    }
    if(!recommendation){
        document.querySelector("#recommendError").textContent = "Please select either yes or no !";
        isValid = false;  
    }
    if(written.length < 20){
        document.querySelector("#msgError").textContent = "Review must at least be 20 charachters long !";
        isValid = false;
    }

    //If valid display to the user success message and reset errors to empty
    if(!isValid){ return; }
    alert("Review submitted successfully!");
    form.reset();
    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });

    
});