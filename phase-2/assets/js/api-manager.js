/*jshint esversion: 8 */
// Reina Rowlands 20066312

const recipeApi = new Api("Recipe", "https://api.api-ninjas.com/v2/recipe?title=",
    null, "spaghetti");
const cocktailApi = new Api("Cocktail", "https://api.api-ninjas.com/v1/cocktail?name=",
    null, "cosmopolitan");

async function SubmitButtonPressed(){
    const apiOptions = document.getElementsByName("api_option");
    let selectedApiOption = null;
    let selectedApi = null;
    const regex = /^[A-Za-z0-9\s]*$/;
    for (let i = 0; i < apiOptions.length; i++) {
        if (apiOptions[i].checked) {
            selectedApiOption = apiOptions[i].id;
        }
    }
    // Call selected API
    if(selectedApiOption === "cocktail_box"){
        selectedApi = cocktailApi;
    } else if(selectedApiOption === "recipe_box") {
        selectedApi = recipeApi;
    }
    if (selectedApi === null) {
        pass();
    } else if (selectedApi != null){
        let name = document.getElementById("api_input").value;
        if (name !== "") {
            if (regex.test(name) === true) {
                selectedApi.searchParameter = name;
            } else {
                selectedApi.apiError = `Error! Invalid ${selectedApi.apiName} Name! (a-z, 1-9)`; // update results section api error msg
                return;
            }
        } else {
            // if no cocktail name is given, set searchParameter to api default
            selectedApi.searchParameter = selectedApi.defaultSearch;
        }
        await selectedApi.callApi(); // call cocktail api here
        // pass selected api to display function
    }
}

// unselect previous option (checkbox) when new api option is selected
function changeSelection(activeButton){
    const apiOptions = document.getElementsByName("api_option");
    const inputLabel = document.getElementById("api_input_label");
    const inputBox = document.getElementById("api_input");
    apiOptions.forEach(button =>{
        // if checkbox is the selected button, set as checked, else unchecked
        button.checked = button.id === activeButton.id; // returns true if ID is equal to id of selected box, else false
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

// clear all extra child elements of results section
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

// Placeholder function to be replaced by functionality later
function pass(){
    return true;
}

async function asyncPass(){
    return true;
}

window.onload= init;