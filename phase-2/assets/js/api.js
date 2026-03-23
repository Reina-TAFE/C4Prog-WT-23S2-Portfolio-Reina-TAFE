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

        // return new Proxy(this, handler);
    }

    get responseData(){
        return this._responseData;
    }

    // Send response data to updateResults() function when value is changed
    set responseData(newValue){
        const oldValue = this._responseData;
        this._responseData = newValue;

        if(oldValue !== newValue && newValue !== null){
            updateResults(this);
        }
    }

    get apiError(){
        return this._apiError;
    }

    set apiError(newValue){
        const oldValue = this._apiError;
        this._apiError = newValue;

        if(oldValue !== newValue && newValue !== null){
            displayError(this);
        }
    }

    async callApi(){
        try {
            if(this.baseUrl !== null){

                let url = `${this.baseUrl}${this.searchParameter}`;

                await fetch(url, {
                    method: 'GET',
                    headers: {'X-Api-Key': 'WiDFwO870fMNxyjVTmqnwA==NAJuzdVok4VbZqPm'}
                })
                    .then(response => {
                        if (!response.ok) {
                            this.responseData = null;
                            throw new Error(`HTTP Error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                        if(data.length > 0){
                            this.apiError = null;
                            this.responseData = data[0]; // update results section with api result here
                        }
                        else{
                            let errorString = "Error: No results Found.";
                            console.error(errorString);
                            this.apiError = errorString; // update results section with error message here
                        }
                        // return data;
                    })
                    .catch(error => {
                        let errorString = `Error with fetch operation: ${error}`;
                        console.error(errorString);
                        this.apiError = errorString; // update results section with error message here
                    });
            }
        }
        catch(error) {
            console.error(error);
        }
    }
}