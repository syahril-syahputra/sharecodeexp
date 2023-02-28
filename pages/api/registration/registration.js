import { baseApiUrl } from '../baseApi';
import FormData from 'form-data';
import axios from 'axios';
const fs = require('fs');

export default async (req, res) => {
    const data = req.body
    // const formData = {
    //     name: data.name,
    //     email: data.email,
    //     password: data.password,
    //     confirm_password: data.password,

    //     company_name: data.companyName,
    //     company_sector: data.companySector,
    //     company_phone: data.companyPhone,
    //     company_country: data.companyCountry.label,
    //     company_address: data.companyAddress,

    //     company_img: fs.createReadStream('C:/Users/Kadek Cahya/OneDrive/Pictures/apex.png'),
    //     company_RequiredDocuments: fs.createReadStream('C:/Users/Kadek Cahya/Downloads/dummy.pdf'),
    //     company_PaymentDocuments: fs.createReadStream('C:/Users/Kadek Cahya/Downloads/dummy.pdf'),
    // }

    var formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirm_password', data.password);

    formData.append('company_name', data.companyName);
    formData.append('company_sector', data.companySector);
    formData.append('company_phone', data.companyPhone);
    formData.append('company_country', data.companyCountry ? data.companyCountry.label : '');
    formData.append('company_address', data.companyAddress);

    formData.append('company_img', image);
    formData.append('company_RequiredDocuments', data.companyRequiredDocuments);
    formData.append('company_PaymentDocuments', data.companyPaymentDocuments);

    axios({
        url: baseApiUrl + "/register",
        method: "POST",
        data: formData
    }).then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        //handle error
        res.status(400).json(error.response.data);
    }).finally(() => { return null});

}

export function convertImage(base64img, callback){
    var img = new Image();
    img.onload = function() {
        callback(img);
    };
    img.src = base64img;
}