import { baseApiUrl } from '../baseApi';
import FormData from 'form-data';
import axios from 'axios';

export const register = async (data) => {
    const formData = new FormData();
    formData.append('name', 'kadek')
    formData.append('email', 'kadek@kade.com')

    axios({
        url: baseApiUrl + "/register",
        method: "POST",
        data: formData
    }).then((response) => {
        console.log(response)
    //handle success
    }).catch((error) => {
    //handle error
        console.log(error)
    });
}