import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { getSession } from "next-auth/react";

// layout for page
import Admin from "layouts/Admin.js";

// components
import LightButton from "@/components/Interface/Buttons/LightButton";
import AdditionalDocument from "@/components/Table/Member/Company/AdditionalDocument"
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import UpdateAdditionalDocsModal from "@/components/Modal/Member/Company/UpdateAdditionalDocs";

export default function ShowAdditionalDocument({session}) {
  
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [additionalDocs, setAdditionalDocs] = useState([])
  const getData = async () =>{
    setIsLoading(true)
    const request = await axios.get(`/master/company/RegistrationDocument/Additional`,
        {
            headers: {
              "Authorization" : `Bearer ${session.accessToken}`
            }
        }
        )
        .then((response) => {
            setAdditionalDocs(response.data.data)          
        }).catch((error) => {
            setAdditionalDocs([])
            toast.error("Something went wrong. Can not load aditional document", toastOptions)           
        }).finally(() => {
            setIsLoading(false)
        })
  }
  useEffect(() => {
      getData()
  }, [])


  const [errorInfo, setErrorInfo] = useState()
  const [showEditDocModal, setShowEditDocModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState({})
  const editHandlerModal = (item) => {
    setSelectedDocument(item)
    setShowEditDocModal(true)
  }

  const editHandlerAction = async (data) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData();
    formData.append("AddtionalDoc", data.document);
    formData.append("id", data.id);
    const request = await axios.post(`master/company/RegistrationDocument/Additional/edit`, formData,
    {
      headers: {
        "Authorization" : `Bearer ${session.accessToken}`
      }
    })
    .then(() => {
      toast.success("Additional Document has been updated", toastOptions)
      setShowEditDocModal(false)
      setSelectedDocument({})
    })
    .catch((error) => {
      setErrorInfo(error.data.data)
      toast.error("Something went wrong", toastOptions)
    })
    .finally(() => {
      getData()
    })
  }

  return (
    <>
      <div className="mb-10">
        <AdditionalDocument
          isLoading={isLoading}
          title="Aditional Document"
          items={additionalDocs}
          editHandler={editHandlerModal}
        ></AdditionalDocument>
      </div>

      {showEditDocModal && 
        <UpdateAdditionalDocsModal
          item={selectedDocument}
          isLoading={isLoading}
          errorInfo={errorInfo}
          setShowModal={setShowEditDocModal}
          submitHandler={editHandlerAction}
        ></UpdateAdditionalDocsModal>
      }
    </>
  );
}

ShowAdditionalDocument.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session: session
      }
  }
}
