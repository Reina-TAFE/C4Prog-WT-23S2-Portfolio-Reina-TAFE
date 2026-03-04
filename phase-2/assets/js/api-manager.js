/*jshint esversion: 8 */
// Reina Rowlands 20066312

//
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
        pass();
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

window.onload= init;