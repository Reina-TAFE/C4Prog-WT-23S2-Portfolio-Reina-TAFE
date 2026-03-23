/*jshint esversion: 8 */
// Reina Rowlands 20066312
import {Api} from './api.js';

const recipeApi = new Api("Recipe", "https://api.api-ninjas.com/v2/recipe?title=",
    null, "spaghetti");
const cocktailApi = new Api("Cocktail", "https://api.api-ninjas.com/v1/cocktail?name=",
    null, "cosmopolitan");
const nullApi = new Api(); // default api with no name or url
let selectedApi = nullApi;


export function displayError(api = null){
    resetResults();
    if (api === null){
        api = selectedApi;
    }
    if(api.apiError !== null){
        const resultsBox = document.getElementById("api_results");
        const errorTitle = document.createElement("h4");
        errorTitle.style.textTransform = "capitalize";
        errorTitle.style.color = "red";
        resultsBox.appendChild(errorTitle);
        const errorMsg = document.createElement("p");
        errorMsg.style.textAlign = "center";
        resultsBox.appendChild(errorMsg);

        // add text to new elements
        errorTitle.textContent = "Error!";
        errorMsg.textContent = api.apiError;
    }
}

export function updateResults(api){
    resetResults();
    const resultsBox = document.getElementById("api_results");
    // Check if no error has occurred
    if (api.apiError === null && api.responseData !== null)
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
        const data = api.responseData;
        if (api.apiName === "Cocktail"){
            name.textContent = data.name;
            servings.className = "hidden";
        }
        else if (api.apiName === "Recipe"){
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
}

async function SubmitButtonPressed(){
    const apiOptions = document.getElementsByName("api_option");
    let selectedApiOption = null;
    // let selectedApi = null;
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
    } else if(selectedApiOption === null){
        selectedApi = nullApi;
    }
    if (selectedApi.apiName === null) {
        selectedApi.apiError = "Error! No Api selected!";
    } else {
        let name = document.getElementById("api_input").value;
        if (name !== "") {
            if (regex.test(name) === true) {
                selectedApi.searchParameter = name;
            } else {
                selectedApi.apiError = `Error! Invalid ${selectedApi.apiName} Name! (aA-zZ, 1-9)`; // update selectedApi.errorMsg
                // results box is automatically updated with error msg when value of selectedApi.errorMsg is changed
                return;
            }
        } else {
            // if no cocktail name is given, set searchParameter to api default
            selectedApi.searchParameter = selectedApi.defaultSearch;
        }
        await selectedApi.callApi(); // call cocktail api here
        // results box is automatically updated when the value of selectedApi.responseData is changed and not null
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

window.onload= init;