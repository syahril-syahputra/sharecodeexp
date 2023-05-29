import React, { useState } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { getSession } from "next-auth/react";

// layout for page
import Admin from "layouts/Admin.js";

// components
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import LightButton from "@/components/Interface/Buttons/LightButton";
import DangerNotification from "@/components/Interface/Notification/DangerNotification";
import TextInput from "@/components/Interface/Form/TextInput";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import { useRouter } from "next/router";

export default function AddAccount({session}) {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false)

  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const setDataHandler = (input) => {
    setInputData({...inputData, [input.name]:input.value})
  }
  const router = useRouter()
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
        toast.success(response.data.message, toastOptions)  
        router.push('/admin/member/settings/users')
      }).catch((error) => {
        toast.error("Something went wrong", toastOptions)
        setErrorMessage("Fill your form correctly")
        setErrorInfo(error.data.data)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <PrimaryWrapper>
      <PageHeader
        leftTop={
          <h3
            className="font-semibold text-lg text-blueGray-700">
            Add New Account
          </h3>
        }
        rightTop={
          <Link href="/admin/member/settings/users">
              <LightButton
                  size="sm"
              >   
                  <i className="mr-2 ml-1 fas fa-arrow-left"></i>
                  Back
              </LightButton>
          </Link>
        }
      ></PageHeader>
      {errorMessage &&
        <DangerNotification message={errorMessage}/>
      }
      <form onSubmit={handleSubmit} className="p-1">
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <TextInput
            label="Name"
            required
            name="name"
            value={inputData.name}
            onChange={(input) => setDataHandler(input)}
            errorMsg={errorInfo.name}
          ></TextInput>
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
        <TextInput
            label="Email"
            required
            name="email"
            type="email"
            value={inputData.email}
            onChange={(input) => setDataHandler(input)}
            errorMsg={errorInfo.email}
          ></TextInput>
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <div className="relative">                                                    
              <TextInput
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  name="password"
                  value={inputData.password}
                  errorMsg={errorInfo?.password}
                  onChange={(input) => setDataHandler(input)}
              /> 
              <div className="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ?  
                      <i className="fas fa-eye-slash text-slate-500"></i> :
                      <i className="fas fa-eye text-slate-500"></i>
                  }
              </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <div className="relative">                                                    
              <TextInput
                  label="Confirm Password"
                  type={showConfirmationPassword ? 'text' : 'password'}
                  required
                  name="password_confirmation"
                  value={inputData.password_confirmation}
                  errorMsg={errorInfo?.password_confirmation}
                  onChange={(input) => setDataHandler(input)}
              /> 
              <div className="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer" onClick={() => setShowConfirmationPassword(prev => !prev)}>
                  {showConfirmationPassword ?  
                      <i className="fas fa-eye-slash text-slate-500"></i> :
                      <i className="fas fa-eye text-slate-500"></i>
                  }
              </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6 mt-20">
          <PrimaryButton
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading &&
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            }
            Save
          </PrimaryButton>
        </div>
      </form>
    </PrimaryWrapper>
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