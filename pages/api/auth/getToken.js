import { getSession } from 'next-auth/react'

let accessToken;

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  accessToken = session.accessToken;
  const data = await getYTData();

  res.status(200).json(data);
}

const getYTData = async () => {
  const response = await fetch("https://rest.exepart.com/v1/test", {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
         }
    })

    if(!response.ok){
        console.log(response)
        res.status(response.status).json({message: response.statusText})
    }

    const res = await response.json()
    // res.status(200).json(user)

  return res;
};
