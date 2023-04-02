import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";

// components
import TableAccount from "components/Table/Settings/TableAccount"

// components

// layout for page
import Admin from "layouts/Admin.js";

export default function Account({session}) {

  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const getData = async () =>{
      setIsLoading(true)
      const response = await axios.get(`/master/users`,
          {
            headers: {
              "Authorization" : `Bearer ${session.accessToken}`
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
  useEffect(() => {
    getData()
  }, [])

  const handleDeleteAccount = async (userId) => {
    setIsLoading(true)
    const response = await axios.delete(`/master/users/delete`, {
      headers: {
        "Authorization" : `Bearer ${session.accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: userId
      }
    })
    .then((response) => {
      console.log(response)
      getData()
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleEditAccount = (id) => {
    alert(`not ready yet :( ${id}`)
  }

  return (
    <>
      <div className="">

        {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"> */}
          {/* <CardLineChart /> */}
            <TableAccount
              isLoading={isLoading}
              data={data}
              deleteAccount={handleDeleteAccount}
              editAccount={handleEditAccount}
            ></TableAccount>
        {/* </div> */}
      </div>
    </>
  );
}

Account.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session: session
      }
  }
}