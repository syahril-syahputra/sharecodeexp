// import { baseApiUrl } from "../baseApi"

// export default async function handler(req, res) {
//     const response = await fetch(baseApiUrl + "/register", {
//         method: 'POST',
//         headers: { 
//             "Content-Type": "application/json",
//             "Accept": 'application/json, text/plain, */*',
//             'User-Agent': '*',
//         },
//         body: req.body
//     })

//     if(!response.ok){
//         res.status(response.status).json({message: response.statusText})
//     }

//     const user = await response.json()
//     res.status(200).json(user)

// }
  


// export default async function register(regInfo){
    // try {
    //   const data = await fetch("http://127.0.0.1:8000/v1/register",{
    //     mode: 'no-cors',
    //     method: 'POST',
    //     headers: { 
    //         "Accept": "application/json",
    //         "Content-Type": "multipart/form-data"
    //     },
    //     body: regInfo
    //   })
    //   .then((res) => 
    //     {
    //         if(res.errors){
    //             return res
    //         }
    //     }
    //   );
    //   return data;
    // } catch (err) {
    //   console.log(err);
    //   return err;
    // }
// }



import { baseApiUrl } from '../baseApi';

export default async (req, res) => {
    // const data = await getTest(req.body);
    // res.status(200).json(data);

    const data = JSON.parse(req.body)
    const response = await fetch(baseApiUrl + "/register", {
        mode: 'no-cors',
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Accept": 'application/json, text/plain, */*',
            'User-Agent': '*',
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            confirm_password: data.password,

            company_name: data.companyName,
            company_sector: data.companySector,
            company_phone: data.companyPhone,
            company_country: data.companyCountry,
            company_address: data.companyAddress,

            company_img: data.companyImage,
            company_RequiredDocuments: data.companyRequiredDocuments,
            company_PaymentDocuments: data.companyPaymentDocuments,
        })
    })

    const result = await response.json()

    if (result.ok && result) {
        res.status(200).json(result);
    } 
    console.log(result)
    res.status(400).json(result);
}

