import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";

// layout for page
import Admin from "layouts/Admin.js";

// components
import UsersList from "components/Table/Member/Users/UsersList"
import MiniSearchBar from "@/components/Shared/MiniSearchBar";
import DeleteUserModal from "@/components/Modal/Member/User/DeleteUser";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

export default function Users({session}) {

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
          let result = response.data.data
          setData(result)
        }).catch((error) => {
          setData([])
        }).finally(() => {
          setIsLoading(false)
        })
  }
  useEffect(() => {
    getData()
  }, [])

  const [selectedUser, setSelectedUser] = useState()

  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const openDeleteModalHandler = (item) => {
    setSelectedUser(item)
    setShowDeleteUserModal(true)
  }
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
    .then(() => {
      toast.success("Your Inquire Component Successfully Deleted", toastOptions)
      setShowDeleteUserModal(false)
      getData()
    }).catch((error) => {
      console.log(error)
      toast.error("Something went wrong", toastOptions)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleEditAccount = (id) => {
    alert(`not ready yet :( ${id}`)
  }

  const handleSearch = (item) =>{
    getData()
  }

  return(
    <>
      <div className="">
          <div className="mb-5 w-full lg:w-1/2">
              <MiniSearchBar searchItem={handleSearch}/>
          </div>
          <UsersList
              title="Contributors"
              isLoading={isLoading}
              data={data}
              deleteAccount={openDeleteModalHandler}
              editAccount={handleEditAccount}
          ></UsersList>
      </div>

      {/* modal */}
      <>
        {showDeleteUserModal ? (
            <DeleteUserModal
                isLoading={isLoading}
                item={selectedUser}
                setShowModal={setShowDeleteUserModal}
                acceptModal={handleDeleteAccount}
            />
        ) : null}
      </>
    </>
  )
}

Users.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session
      }
  }
}