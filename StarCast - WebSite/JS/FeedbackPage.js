const form = document.querySelector("#feedback-form");
form.addEventListener("submit" , (event) => {
    event.preventDefault();

    document.querySelector("#fNameError").textContent = "";
    document.querySelector("#lNameError").textContent = "";
    document.querySelector("#emailError").textContent = "";
    document.querySelector("#titleError").textContent = "";
    document.querySelector("#msgError").textContent = "";
    document.querySelector("#genreError").textContent = "";
    document.querySelector("#ratingError").textContent = "";
    document.querySelector("#recommendError").textContent = "";

    const fName = document.querySelector("#fName").value.trim();
    const lName = document.querySelector("#lName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const title = document.querySelector("#movieTitle").value.trim();
    const genre = document.querySelector("#movieGenre").value;
    const written = document.querySelector("#writtenReview").value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');
    const recommendation = document.querySelector('input[name="recommendation"]:checked');
    var isValid = true;

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
    if(title == ""){
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

    if(!isValid){ return; }

    
});