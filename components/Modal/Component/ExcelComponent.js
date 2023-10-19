import React, { useState } from 'react'
import { Alert, Button, Modal, Spinner } from 'flowbite-react'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
export default function ExcelComponent(props) {
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = props.show
  const [isDeleting, setisDeleting] = props.delete
  const [error, seterror] = useState('')

  const excecute = async () => {
    seterror('')
    setisDeleting(true)
    try {
      const response = await props.deleteHandler()
    } catch (error) {
      seterror(error.data?.message)
    } finally {
      setisDeleting(false)
    }
  }
  return (
    <Modal
      show={isOpenConfirmDelete}
      size="md"
      popup
      onClose={() => setIsOpenConfirmDelete(undefined)}
      className="z-50"
    >
      <Modal.Body>
        <div className="text-center">
          <ExclamationCircleIcon className=" h-28 w-28 text-gray-400 mx-auto" />

          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this File {'"'}
            {props.fileName}
            {'"'} ?
          </h3>
          {error && (
            <Alert
              color="failure"
              icon={ExclamationCircleIcon}
              className="text-center mx-auto my-2 items-center"
            >
              <span>
                <p>{error}</p>
              </span>
            </Alert>
          )}
          {isDeleting ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              <DangerButton onClick={() => excecute()}>
                Yes, I{"'"}m sure
              </DangerButton>
              <PrimaryButton onClick={() => setIsOpenConfirmDelete(undefined)}>
                No, cancel
              </PrimaryButton>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}
