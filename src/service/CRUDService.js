import axios from 'axios';

export const ITEMS = 'items';
export const USERS = 'users';
export const LOGIN = 'auth';
export const ORDERS = 'orders';

export class CRUDService {

    static baseUrl = 'http://localhost:8080/';

    static getAll(serviceRoute) {

        const url = this.baseUrl + serviceRoute;
        const config = this.getHeaderConfig();
        
        return axios.get(
            url, config
        ).then(res => res.data);
    }

    static post(newItem, serviceRoute) {


        const url = this.baseUrl + serviceRoute;
        const config = this.getHeaderConfig();


        return axios.post(url, newItem, config)
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

    static patch(itemId, updatedItem, serviceRoute) {

        const url = this.baseUrl + serviceRoute + '/' + itemId
        const config = this.getHeaderConfig()

        return axios.patch(url, updatedItem, config)
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

    static getHeaderConfig(){

        const webToken = localStorage.getItem("webToken")?localStorage.getItem("webToken"):'';

        const config = {
            headers: { Authorization: 'Bearer '+ webToken}
        };

        return config;

    }

    

}