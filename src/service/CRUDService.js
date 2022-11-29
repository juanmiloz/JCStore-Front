
import axios from 'axios';

export const ITEMS = 'items';
export const USERS = 'users';

export class CRUDService{

	static baseUrl = 'http://localhost:8080/';

	static getAll(serviceRoute){
		return axios.get(this.baseUrl+serviceRoute).then(res => res.data);
	}

	static post(newItem, serviceRoute){

		return axios.post(this.baseUrl+serviceRoute,newItem)
	   			.then(res => res.data)
	   			.catch(function (error) {
				    if (error.response) {
				      // Request made and server responded
					  this.showError(error);
			
				    } else if (error.request) {
				      // The request was made but no response was received
				      console.log(error.request);
				    } else {
				      // Something happened in setting up the request that triggered an Error
				      console.log('Error', error.message);
				    }

	 		 	});

	}

	static showError(error){

		let code = error.response.data.code;
		let msg = error.response.data.message;
		alert("ERROR "+code+"\n"+msg);

	}



}