import { getSession } from 'next-auth/react'
import { baseApiUrl } from '../baseApi';

let accessToken;

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  accessToken = session.accessToken;
  const data = await getTest();

  res.status(200).json(data);
}

const getTest = async () => {
    const res = await fetch(baseApiUrl + "/test", {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
         }
    })

    const user = await res.json()
    if (res.ok && user) {
        return user
    }                
    return null
};
