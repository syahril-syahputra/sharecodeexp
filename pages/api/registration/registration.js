import { baseApiUrl } from '../baseApi';
import FormData from 'form-data';
import axios from 'axios';

export default async (req, res) => {
    const formData = new FormData();
    formData.append('name', 'kadek')
    // formData.append('email', 'kadek@cahya.com')
    
    axios({
        url: baseApiUrl + "/register",
        method: "POST",
        data: req.body
    }).then((response) => {
        console.log(response)
    //handle success
    }).catch((error) => {
    //handle error
        console.log(error)
    });


    // console.log(req.body)
    // const data = JSON.parse(req.body)
    // console.log(typeof data.companyRequiredDocuments)
    // const response = await fetch(baseApiUrl + "/register", {
    //     mode: 'no-cors',
    //     method: 'POST',
    //     headers: { 
    //         "Content-Type": "application/json",
    //         "Accept": 'application/json, text/plain, */*',
    //         'User-Agent': '*',
    //     },
    //     body: JSON.stringify({
    //         name: data.name,
    //         email: data.email,
    //         password: data.password,
    //         confirm_password: data.password,

    //         company_name: data.companyName,
    //         company_sector: data.companySector,
    //         company_phone: data.companyPhone,
    //         company_country: data.companyCountry.label,
    //         company_address: data.companyAddress,

    //         company_img: data.companyImage,
    //         company_RequiredDocuments: data.companyRequiredDocuments,
    //         company_PaymentDocuments: data.companyPaymentDocuments,
    //     })
    //     // body: req.body
    // })
    // const result = await response.json()
    // console.log(result)
    // if (result.ok && result) {
    //     res.status(200).json(result);
    // } 
    // res.status(400).json(result);

}