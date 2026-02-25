/*jshint esversion: 8 */
// Reina Rowlands 20066312

async function CallApi(url, apiName){
    try {
        fetch(url, {
            method: 'GET',
            headers: {'X-Api-Key': 'WiDFwO870fMNxyjVTmqnwA==NAJuzdVok4VbZqPm'}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if(data.length > 0){
                    updateResult(data[0], apiName);
                }
                else{
                    let errorString = "Error: No results Found.";
                    console.error(errorString);
                    updateResult(errorString, "Error");
                }
                // return data;
            })
            .catch(error => {
                let errorString = `Error with fetch operation: ${error}`;
                console.error(errorString);
                updateResult(errorString, "Error");
            });
    }
    catch(error) {
        console.error(error);
    }
}

function updateResult(data, api){
    // Clear previous results
    resetResults();
    const resultsBox = document.getElementById("api_results");
    // Check if no error has occurred
    if (api !== "Error")
    {
        // Create common elements
        const name = document.createElement("h4");
        name.style.textTransform = "capitalize";
        resultsBox.appendChild(name);
        const servings = document.createElement("p");
        resultsBox.appendChild(servings);
        const ingredientsLabel = document.createElement('h5');
        ingredientsLabel.textContent = "Ingredients:";
        resultsBox.appendChild(ingredientsLabel);
        const ingredientList = document.createElement("ul");
        resultsBox.appendChild(ingredientList);
        const instructionsLabel = document.createElement('h5');
        instructionsLabel.textContent = "Instructions:";
        resultsBox.appendChild(instructionsLabel);
        const instructionsList = document.createElement('ol');
        instructionsList.className = "instructionsList";
        resultsBox.appendChild(instructionsList);
        // Apply data for API-specific elements
        if (api === "cocktail"){
            name.textContent = data.name;
            servings.className = "hidden";
        }
        else if (api === "recipe"){
            name.textContent = data.title;
            servings.className = "show-servings";
            servings.textContent = `${data.servings}`;
        }
        // Apply data shared elements
        data.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientList.appendChild(li);
        });
        const instructions = data.instructions.split(". ");
        instructions.forEach(instruction => {
            const li = document.createElement("li");
            li.textContent = instruction + ".";
            instructionsList.appendChild(li);
        });
    }
    // if error occurred, display error msg
    else {
        resultsBox.textContent = data;
    }

}

async function SubmitButtonPressed(){
    const apiOptions = document.getElementsByName("api_option");
    let selectedApi = null;
    let url = null;
    const regex = /^[A-Za-z0-9\s]*$/;
    for (let i = 0; i < apiOptions.length; i++) {
        if(apiOptions[i].checked){
            selectedApi = apiOptions[i].id;
        }
    }
    // Call selected API
    if(selectedApi === "cocktail_box"){
        let name = document.getElementById("api_input").value;
        if (name !== "") {
            if (regex.test(name) === true) {
                url = `https://api.api-ninjas.com/v1/cocktail?name=${name}`;
            } else {
                displayApiError("Error! Invalid Cocktail Name! (a-z, 1-9)")
                return
            }
        } else {
            // if no cocktail name is given, default to cosmopolitan
            url = "https://api.api-ninjas.com/v1/cocktail?name=cosmopolitan";
        }
        await CallApi(url, "cocktail");

    } else if(selectedApi === "recipe_box"){
        let title = document.getElementById("api_input").value;
        if (title !== ""){
            if (regex.test(title) === true) {
                url = `https://api.api-ninjas.com/v2/recipe?title=${title}`;
            } else {
                displayApiError("Error! Invalid Recipe Name! (a-z, 1-9)")
                return
            }
        } else {
            // if no recipe name is given, default to spaghetti
            url = "https://api.api-ninjas.com/v2/recipe?title=spaghetti";
        }
        await CallApi(url, "recipe");
    }
}

function displayApiError(message){
    resetResults();
    const resultsBox = document.getElementById("api_results");
    const errorMessage = document.createElement("h4");
    errorMessage.textContent = message;
    errorMessage.className = "errorMessage";
    resultsBox.appendChild(errorMessage);
}

function changeSelection(activeButton){
    const apiOptions = document.getElementsByName("api_option");
    const inputLabel = document.getElementById("api_input_label");
    const inputBox = document.getElementById("api_input");
    apiOptions.forEach(button =>{
        // if button is the clicked button, set as check, else unchecked
        button.checked = button.id === activeButton.id;
    });
    if(activeButton.id === "cocktail_box"){
        inputLabel.innerHTML = "Cocktail Name:";
    } else if(activeButton.id === "recipe_box"){
        inputLabel.innerHTML = "Recipe Name:";
    }
    inputBox.value = "";
    // Reset results
    resetResults();
}

function resetResults(){
    // Get results box element
    const resultBox = document.getElementById("api_results");
    // Remove all child elements
    resultBox.replaceChildren();
    // Create new section title
    const resultsTitle = document.createElement('h3');
    resultsTitle.textContent = "Results";
    resultBox.appendChild(resultsTitle);
}

function init() {
    'use strict';
    // Add event listeners to buttons
    document.getElementById("cocktail_box").addEventListener("click", (event) =>{
        changeSelection(event.target);
    });
    document.getElementById("recipe_box").addEventListener("click", (event) =>{
        changeSelection(event.target);
    });
    document.getElementById("submit_button").addEventListener("click", async (e) => {
        // Prevent page from reloading
        e.preventDefault();
        // Perform functionality
        await SubmitButtonPressed();
    });
    document.getElementById("clear_button").addEventListener("click", (e) => {
        // Prevent page from reloading
        e.preventDefault();
        // Perform functionality
        resetResults();
        document.getElementById("api_input").value = "";
    });

}

window.onload= init;