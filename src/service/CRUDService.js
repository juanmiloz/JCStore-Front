import axios from 'axios';

export const ITEMS = 'items';
export const USERS = 'users';
export const LOGIN = 'auth';

export class CRUDService {

    static baseUrl = 'http://localhost:8080/';

    static getAll(serviceRoute) {

        const url = this.baseUrl + serviceRoute;

        return axios.get(
            url
        ).then(res => res.data);
    }

    static post(newItem, serviceRoute) {


        const url = this.baseUrl + serviceRoute;


        return axios.post(url, newItem)
            .then(res => res.data)
            .catch(function(error) {
                if (error.response) {
                    // Request made and server responded
                    alert("ERROR " + error.response.data.code + "\n" + error.response.data.message);

                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });

    }

    

}