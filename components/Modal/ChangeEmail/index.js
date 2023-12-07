import React, {useState, useRef} from 'react';
import * as Yup from 'yup'
import {Formik, Form} from 'formik'
import TextInputValidate from '@/components/Interface/Form/TextInputValidation'
import {BaseModalMedium} from '@/components/Interface/Modal/BaseModal';
import LightButton from '@/components/Interface/Buttons/LightButton';

export default function ChangeEmaiVerification(props) {

  function isEmailCompany(email) {
    return /^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.id)(?!aol.com)(?!live.com)(?!outlook.com)(?!inbox.com)(?!icloud.com)(?!mail.com)(?!gmx.com)(?!yandex.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/gm.test(
      email
    )
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email address')
      .test('is-valid-email', 'The email field should email company', (value) =>
        isEmailCompany(value)
      )
      .required('The email field is required'),
  })

  const initialValue = {
    email: '',
  }

  const handleSubmit = () => {

  }

  return (
    <>
      <BaseModalMedium
        title="Change Email and Resend Verification"
        onClick={() => {
          props.closeModal()
        }}
        body={
          <div className="w-full md:w-10/12 md:shadow-md p-5 bg-white">
            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValue}
              validationSchema={validationSchema}
            >
              {({values, errors, ...formikProps}) => (
                <Form
                  className="pb-20"
                  id="register-form"
                  aria-label="form"
                  noValidate
                >
                  <div className='mt-8'>
                    <div className="flex flex-wrap mb-6">
                      <div className="w-full px-3 mb-6 md:mb-0">
                        <TextInputValidate
                          id="email"
                          label="New Email"
                          type="email"
                          className="w-full"
                          required
                          value={values.email}
                          onChange={formikProps.handleChange}
                          placeholder="Please enter company email here..."
                          error={
                            formikProps.touched.email &&
                            Boolean(errors.email)
                          }
                          helperText={
                            formikProps.touched.email && errors.email
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        }
        action={
          <>
            <LightButton
              className="mr-2"
              size="sm"

            >

            </LightButton>
          </>

        }
      />

    </>
  )


}