import { baseApiUrl } from "../baseApi"

export default async function handler(req, res) {
    const body = req.body

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)

    // Found the name.
    // Sends a HTTP success code
    // res.status(200).json({ data: `${body.first} ${body.last}` })

    const response = await fetch(baseApiUrl + "/register", {
        method: 'POST',
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({data: 'data'})
    })

    if(!response.ok){
        res.status(response.status).json({message: response.statusText})
    }

    const user = await response.json()
    res.status(200).json(user)

}
  