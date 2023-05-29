import WarningButton from "@/components/Interface/Buttons/WarningButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";

export default function PendingComponent(props) {
  return (
    <BaseModalMedium
      title="Pending Component"
      onClick={() => props.setShowModal(false)}
      body={
        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
          Do you want to pending <span className="text-blueGray-700 font-bold">{props.itemName}</span> Component Status?
        </p>
      }
      action={
        <>
          <LightButton
              className="font-bold uppercase mr-2"
              onClick={() => props.setShowModal(false)}
            >
              No, Close
          </LightButton>

          <WarningButton
            disabled={props.isLoading}
            className="font-bold uppercase"
            onClick={() => props.acceptModal()}
          >
            {props.isLoading &&
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            }
            Yes, Pending
          </WarningButton>
        </>
      }
    ></BaseModalMedium>
  )

  return (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 bg-orange-500">
                <h3 className="text-3xl font-semibold">
                  Pending Component
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
              <div className="relative p-4 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Do you want to pending <span className="text-blueGray-700 font-bold">{props.itemName}</span> as a Component?
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 ">
                <button
                  className="text-blueGray-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => props.setShowModal(false)}
                >
                  No, Close
                </button>
                <button
                  className="bg-orange-500 text-white active:bg-blueGray-700 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => props.acceptModal()}
                >
                  Yes, Pending
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  )
}