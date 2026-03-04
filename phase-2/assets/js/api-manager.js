/*jshint esversion: 8 */
// Reina Rowlands 20066312

async function SubmitButtonPressed(){
    const apiOptions = document.getElementsByName("api_option");
    let selectedApi = null;
    let url = null;
    const regex = /^[A-Za-z0-9\s]*$/;
    for (let i = 0; i < apiOptions.length; i++) {
        if (apiOptions[i].checked) {
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
                pass(); // update results section api error msg
                return;
            }
        } else {
            // if no cocktail name is given, default to cosmopolitan
            url = "https://api.api-ninjas.com/v1/cocktail?name=cosmopolitan";
        }
        await asyncPass(); // call cocktail api here

    } else if(selectedApi === "recipe_box"){
        let title = document.getElementById("api_input").value;
        if (title !== ""){
            if (regex.test(title) === true) {
                url = `https://api.api-ninjas.com/v2/recipe?title=${title}`;
            } else {
                pass(); // update results section api error msg
                return;
            }
        } else {
            // if no recipe name is given, default to spaghetti
            url = "https://api.api-ninjas.com/v2/recipe?title=spaghetti";
        }
        await asyncPass(); // call recipe api here
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
        document.getElementById("api_input").value = "";;
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