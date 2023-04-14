import React, { useState } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { getSession } from "next-auth/react";

// components
import InputForm from "@/components/Shared/InputForm";

// layout for page
import Admin from "layouts/Admin.js";

export default function AddAccount({session}) {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const setDataHandler = (item, inputName) => {
    setInputData({...inputData, [inputName]:item.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorInfo({})
    setErrorMessage(null)
    const response = await axios.post(`/master/users/create`, inputData, {
      headers: {
        "Authorization" : `Bearer ${session.accessToken}`
      }
    })
      .then((response) => {
        let result = response.data.data
        setSuccesMessage("New account has been added succesfully")
        setInputData({
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
          });    
      }).catch((error) => {
        // console.log(error.data)
        setErrorMessage(error.data.data)
        setErrorInfo(error.data.data)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className="relative shadow">
        <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="flex justify-between">
              <div className="px-4">
                  <h3
                  className={
                      "font-semibold text-lg text-blueGray-700"
                  }
                  >
                  Add New Account
                  </h3>
              </div>
          </div>
        </div>

        <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="px-3 w-full lg:w-1/2">
            {errorMessage &&
              <div  className="w-50">
                  <div className="text-white px-6 py-4 border-0 relative mb-4 mt-5 bg-red-500">
                      <span className="text-xl inline-block mr-5 align-middle">
                          <i className="fas fa-bell"></i>
                      </span>
                      <span className="inline-block align-middle mr-8">
                          <b className="capitalize">{errorMessage}</b>
                      </span>
                  </div>
              </div>
            }
            {succesMessage &&
              <div  className="w-50">
                  <div className="text-white px-6 py-4 border-0 relative mb-4 mt-5 bg-emerald-500">
                      <span className="text-xl inline-block mr-5 align-middle">
                          <i className="fas fa-bell"></i>
                      </span>
                      <span className="inline-block align-middle mr-8">
                          <b className="capitalize">{succesMessage}</b>
                      </span>
                  </div>
              </div>
            }
          </div>
          <form onSubmit={handleSubmit}>
              <div className="w-full lg:w-1/2 px-3 mb-6">
                <InputForm
                    label="Name"
                    inputDataName="name"
                    value={inputData.name}
                    setData={setDataHandler}
                    errorMsg={errorInfo.name}
                />
              </div>
              <div className="w-full lg:w-1/2 px-3 mb-6">
                <InputForm
                  label="Email"
                  inputDataName="email"
                  value={inputData.email}
                  setData={setDataHandler}
                  errorMsg={errorInfo.email}
                />
              </div>
              <div className="w-full lg:w-1/2 px-3 mb-6">
                <InputForm
                  label="Password"
                  inputDataName="password"
                  value={inputData.password}
                  setData={setDataHandler}
                  errorMsg={errorInfo.password}
                  inputType="password"
                />
              </div>
              <div className="w-full lg:w-1/2 px-3 mb-6">
                <InputForm
                  label="Password Confirmation"
                  inputDataName="password_confirmation"
                  value={inputData.password_confirmation}
                  setData={setDataHandler}
                  errorMsg={errorInfo.password_confirmation}
                  inputType="password"
                />
              </div>
              <div className="w-full lg:w-1/2 px-3 mb-6 mt-20">
                <div className="mb-6">
                    {!isLoading && 
                        <button
                            type="submit"

                            className="w-1/2 text-white font-bold px-6 py-4 outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                        >
                        Save
                        </button>
                    }
                    {isLoading && 
                        <button
                            disabled
                            type="submit"
                            className="w-1/2 text-white font-bold px-6 py-4 outline-none mr-1 mb-1 bg-blueGray-400 uppercase text-sm shadow"
                        >
                            <i className="fas fa-circle-notch fa-spin"></i>
                        </button>
                    }
                </div>
              </div>

              
          </form>
        </div>
      </div>
    </>
  );
}

AddAccount.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
      props: {
          session: session
      }
  }
}