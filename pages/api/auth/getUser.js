export default async function handler(req, res) {
    const response = await fetch("http://127.0.0.1:8000/api/auth/user-profile", {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3NzEyNjU2MCwiZXhwIjoxNjc3MTMwMTYwLCJuYmYiOjE2NzcxMjY1NjAsImp0aSI6IjlBZUFjS01UUTJEaFI5WUUiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.cfl18g_oXqavo6fNcH21SYRv3PJhEGP2b30pBhaxDKo"
         }
    })

    if(!response.ok){
        console.log(response)
        res.status(response.status).json({message: response.statusText})
    }

    const user = await response.json()
    res.status(200).json(user)

}
  