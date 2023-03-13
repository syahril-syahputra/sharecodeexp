import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { useSession } from "next-auth/react";

// components
import TableAccount from "components/Table/Settings/TableAccount"

// components

// layout for page
import Admin from "layouts/Admin.js";

export default function Account() {
  const session = useSession()
  const [user, setUser] = useState({
    accessToken: ''
  })
  useEffect(() => { setUser({accessToken: session.data?.accessToken}) }, [session])

  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const getData = async () =>{
    if(!!user.accessToken){
      setIsLoading(true)
      const response = await axios.get(`/master/users`,
          {
            headers: {
              "Authorization" : `Bearer ${user.accessToken}`
            }
          }
        )
        .then((response) => {
          let result = response.data
          setData(result.data)
        }).catch((error) => {
          // console.log(error.response)
        }).finally(() => {
          setIsLoading(false)
        })
    }
  }
  useEffect(() => {
    getData()
  }, [user])

  return (
    <>
      <div className="">

        {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"> */}
          {/* <CardLineChart /> */}
            <TableAccount
              isLoading={isLoading}
              data={data}
            ></TableAccount>
        {/* </div> */}
      </div>
    </>
  );
}

Account.layout = Admin;
