import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

function useData(userSession, bearerToken) {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const loadCompany = await axios.get('/company', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      const company = loadCompany.data.data
      setData(company)
    }

    if (userSession.role_id == 2 && bearerToken) {
      fetchData()
    }
  }, [bearerToken])

  return data
}

export default useData
