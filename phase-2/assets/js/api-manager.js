function init() {
    'use strict';
    // Add event listeners to buttons
    document.getElementById("cocktail_box").addEventListener("click", (event) =>{
        pass();
    });
    document.getElementById("recipe_box").addEventListener("click", (event) =>{
        pass();
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
        pass();
    });
}

// Placeholder function to be replaced by functionality later
function pass(){
    return true;
}