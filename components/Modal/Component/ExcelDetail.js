import React, { useState, useEffect } from 'react'
import { Alert, Button, FileInput, Modal, Spinner } from 'flowbite-react';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton';
import DangerButton from '@/components/Interface/Buttons/DangerButton';
import SuccessButton from '@/components/Interface/Buttons/SuccessButton';
import axios from "lib/axios"
export default function ExcelDetail(props) {
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = props.show;

    const [isDetailLoading, setisDetailLoading] = props.loading
    const [uploadForm, setuploadForm] = useState(false)
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e);
    };
    useEffect(() => {
        setuploadForm(false);
    }, [isOpenConfirmDelete]);
    const validate = () => {
        if (!file) {

            return
        }

        props.upload(file.target.files[0])
    }

    return (
        <Modal show={isOpenConfirmDelete} size="lg" dismissible popup onClose={() => setIsOpenConfirmDelete(undefined)} className="z-50">
            <Modal.Header title='Detail File' />
            <Modal.Body>
                <div className="text-center">
                    <div className='flex space-x-4 items-center'>
                        <FontAwesomeIcon icon={faFileExcel}
                            className=" h-28 w-28 text-green-400 mx-auto"
                        />
                        <table className='flex-1  text-sm text-start'>
                            <tr>
                                <td className='p-1 font-bold' colSpan={2}>{props.data.name}</td>
                            </tr>
                            <tr>
                                <td className='p-1'>Company</td>
                                <td className='p-1'>{props.data?.company?.name}</td>
                            </tr>
                            <tr>
                                <td className='p-1'>Status</td>
                                <td className='p-1'>{props.data?.status}</td>
                            </tr>
                        </table>

                    </div>

                    {
                        isDetailLoading ? <div className='flex text-gray-600 space-x-4 justify-center items-center pt-8'>
                            <Spinner color="info" /><span>Loading</span>
                        </div> :
                            uploadForm ? <div className='p-4'>
                                <FileInput
                                    helperText="Select Excel File"
                                    className='border border-gray-300'
                                    id="file"
                                    accept=".xls, .xlsx"
                                    onChange={handleFileChange}
                                />
                                <div className='flex justify-center space-x-2 pt-4'>

                                    <DangerButton onClick={() => setuploadForm(false)}>Cancel</DangerButton>
                                    <SuccessButton onClick={() => validate()}>Upload</SuccessButton>
                                </div>
                            </div> :
                                <div className='flex justify-around pt-4'>
                                    <PrimaryButton onClick={() => props.download()}>Download</PrimaryButton>
                                    <DangerButton onClick={() => props.delete()}>Delete</DangerButton>
                                    <DangerButton onClick={() => props.reject()}>Reject</DangerButton>
                                    <SuccessButton onClick={() => setuploadForm(true)}>Upload</SuccessButton>
                                </div>
                    }


                </div>
            </Modal.Body>
        </Modal>
    )
}
