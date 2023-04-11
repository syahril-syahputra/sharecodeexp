import { useEffect, useState } from "react"
import AcceptButton from "@/components/Buttons/AcceptButton";
import InputForm from "@/components/Shared/InputForm";
import ErrorInput from '@/components/Shared/ErrorInput';
export default function Modal(props) {
    const [email, setEmail] = useState('')
    const setEmailHandler = (item, inputName) => {
      setEmail(item.value)
    }

    const [subject, setSubject] = useState('')
    const setSubjectHandler = (item, inputName) => {
      setSubject(item.value)
    }
    
    const [messages, setMessages] = useState('')

    const handleSend = () => {
        props.acceptModal(email, subject, messages)
    }

    return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full h-full max-w-lg md:h-auto">
              {/*content*/}
              <div className="border-0  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200">
                  <h3 className="text-3xl font-semibold">
                    Send Email
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className=""> 
                <div className="flex flex-wrap mt-10">
                      <div className="w-full px-3">
                          <InputForm
                              label="Email"
                              inputDataName="email"
                              value={email}
                              setData={setEmailHandler}
                              errorMsg={props.errorInfo?.subject}
                          />
                      </div>
                  </div>
                  <div className="flex flex-wrap mt-10">
                      <div className="w-full px-3">
                          <InputForm
                              label="Subject"
                              inputDataName="subject"
                              value={subject}
                              setData={setSubjectHandler}
                              errorMsg={props.errorInfo?.subject}
                          />
                      </div>
                  </div>
                  <div className="relative p-3 flex-auto mt-5">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Messages
                    </label>
                    <textarea 
                      value={messages}
                      onChange={({target}) => 
                        setMessages(target.value)
                      }
                      autoComplete="off" 
                      type="text"
                      placeholder="Write your reason here before rejecting"
                      className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                      {props.errorInfo?.messages &&
                        <ErrorInput error={props.errorInfo?.messages}/>
                      }
                  </div>
                </form>
                
                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 ">
                  <button
                    className="text-blueGray-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Close
                  </button>

                  <AcceptButton
                      buttonTitle="Send"
                      isLoading={props.isLoading}
                      onClick={handleSend}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}