import React, {useState} from 'react';
import {BaseModalMedium} from '@/components/Interface/Modal/BaseModal';
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton';
import {Accordion} from 'flowbite-react';
import Link from 'next/link'

export default function OutStockRestrictedModal({session, ...props}) {

  console.log(props, '<<props')
  const [stateEmail, setStateEmail] = useState()
  const [errorInfo, setErrorInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseModalMedium
        title="Active Orders"
        onClick={() => {
          props.closeModalRestrictedEditProduct()
          setIsLoading(false)
          props.closeModalOutOfStock(false)
        }}
        body={
          <>
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              {/* {`You have ${props.errorInfo?.length} active${props.errorInfo?.length > 0 ? '' : '(s)'} order`} */}
            </p>
            <Accordion>
              <Accordion.Panel isOpen={isOpen}>
                <Accordion.Title>
                  {`${props.errorInfo.notification ?? ''}`}
                </Accordion.Title>
                <Accordion.Content>
                  <div className="flex justify-between flex-wrap my-2">
                    <div>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Status
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Action
                      </p>
                    </div>
                  </div>
                  {
                    props?.errorInfo?.orders?.map((value, index) => {
                      return (
                        <div key={index + '-' + `${value.name}`} className="flex justify-between flex-wrap">
                          <div>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                              {value.name}
                            </p>
                          </div>
                          <div>
                            <Link
                              target="_blank"
                              href={`/admin/member/seller/incoming-inquiry/details/${value.slug}`}
                              className="underline text-blue-500"
                            >
                              view
                            </Link>
                          </div>
                        </div>
                      )
                    })
                  }
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </>
        }
        action={
          <>
            <SecondaryButton
              className="mr-2"
              size="sm"
              onClick={() => {
                props.closeModalRestrictedEditProduct()
                setIsLoading(false)
                // props.closeModalOutOfStock()
              }}
            >
              Close
            </SecondaryButton>

          </>

        }
      />
    </>
  )


}