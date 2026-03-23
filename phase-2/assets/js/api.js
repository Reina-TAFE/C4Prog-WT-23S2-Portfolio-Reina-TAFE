/*jshint esversion: 8 */
// Reina Rowlands 20066312
import {updateResults, displayError} from './api-manager.js';


export class Api {
    constructor(name = null, baseURL = null, searchParameter = null, defaultSearch = null) {
        this.apiName = name;
        this.baseUrl = baseURL;
        this.searchParameter = searchParameter;
        this.defaultSearch = defaultSearch;
        this._responseData = null;
        this._apiError = null;
    }

    // getter for _responseData, returns _responseData
    get responseData(){
        return this._responseData;
    }

    // Setter for _responseData. Passes self to updateResults() function whenever new _responseData value is set
    set responseData(newValue){
        const oldValue = this._responseData;
        this._responseData = newValue;

        if(oldValue !== newValue && newValue !== null){ // don't display results when value is the same or being reset
            updateResults(this); // pass self for updateResults()
        }
    }

    // getter for _apiError, returns _apiError
    get apiError(){
        return this._apiError;
    }

    // Setter for _apiError. Passes self to displayError() function whenever new _apiError value is set
    set apiError(newValue){
        const oldValue = this._apiError;
        this._apiError = newValue;

        if(oldValue !== newValue && newValue !== null){  // don't display error when value is the same or being reset
            displayError(this); // pass self to displayError()
        }
    }

    async callApi(){
        try {
            if(this.baseUrl !== null){

                let url = `${this.baseUrl}${this.searchParameter}`; // add search parameter to url

                // Call Api
                await fetch(url, {
                    method: 'GET',
                    headers: {'X-Api-Key': 'WiDFwO870fMNxyjVTmqnwA==NAJuzdVok4VbZqPm'}
                })
                    .then(response => {
                        if (!response.ok) {
                            this.responseData = null; // clear _responseData
                            this._apiError = `HTTP Error! status: ${response.status}`; // set apiError
                            throw new Error(`HTTP Error! status: ${response.status}`); // throw error
                        }
                        return response.json(); // cenvert responce to JSON
                    })
                    .then((data) => {
                        console.log(data);
                        if(data.length > 0){
                            this.apiError = null; // clear apiError
                            this.responseData = data[0]; // update results section with api result here
                        }
                        else{
                            let errorString = "Error: No results Found.";
                            console.error(errorString); // print error to console
                            this.apiError = errorString; // update results section with error message here
                        }
                    })
                    .catch(error => {
                        let errorString = `Error with fetch operation: ${error}`;
                        console.error(errorString); // print error to console
                        this.apiError = errorString; // update results section with error message here
                    });
            }
        }
        catch(error) {
            console.error(error);
            this.apiError = `Error! ${error}`;
        }
    }
}