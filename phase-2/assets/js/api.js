/*jshint esversion: 8 */
// Reina Rowlands 20066312

class Api {
    constructor(name, baseURL, searchParameter, defaultSearch) {
        this.apiName = name;
        this.baseUrl = baseURL
        this.searchParameter = searchParameter;
        this.defaultSearch = defaultSearch;
        this.responseData = null;
        this.apiError = null;
    }

    async callApi(){
        try {
            let url = `${this.baseUrl}${this.searchParameter}`;

            await fetch(url, {
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
                        this.apiError = null;
                        this.responseData = data[0] // update results section with api result here
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
        catch(error) {
            console.error(error);
        }
    }
}