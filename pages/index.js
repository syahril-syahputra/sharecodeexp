import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import axios from 'lib/axios'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  fadeIn,
  staggerContainer,
  textVariant,
  fadeInOperates,
} from '@/utils/motion'
//components
import Footer from 'components/Footers/Footer.js'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import TextInput from '@/components/Interface/Form/TextInput'
import Navbar from '@/components/Navbar2V'
import { TypingText } from '@/components/TypeText'
import { TitleText } from '@/components/TitleText'
import { toastOptions } from '@/lib/toastOptions'
import { toast } from 'react-toastify'
import TextInputSearchComponent from '@/components/Interface/Form/TextInputForSearchComponent'
import Container from '@/components/Container'

export default function Index() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [loadingSearch, setLoadingSearch] = useState(false)
  function searchComponent(event) {
    setLoadingSearch(true)
    if (event.key === 'Enter' && !!search) {
      event.preventDefault()
      router.replace(`/product/search?q=${search}`)
    }
  }

  function searchComponentOnClick(){
    router.replace(`/product/search?q=${search}`)
  }

  //search suggestion
  const [suggestion, setSuggestion] = useState([])
  const [isSuggestionLoading, setSuggestionLoading] = useState(false)
  useEffect(() => {
    if (!!search) {
      setSuggestionLoading(true)
      const getData = setTimeout(() => {
        axios
          .get(`/search/suggest/${search}`)
          .then((response) => {
            setSuggestion(response.data.data)
          })
          .finally(() => setSuggestionLoading(false))
      }, 1000)

      return () => clearTimeout(getData)
    }
    setSuggestionLoading(false)
  }, [search])

  const [statisticCounter, setStatisticCounter] = useState({
    memberCounter: 0,
    productCounter: 0,
  })
  const loadStatisticCounter = async () => {
    const request = await axios.get(`/statistic-counter`).then((respose) => {
      setStatisticCounter({
        memberCounter: respose.data.data.member,
        productCounter: respose.data.data.product,
      })
    })
  }
  const [dataContact, setDataContact] = useState({
    subject: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorInfo, setErrorInfo] = useState({})
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setDataContact({ ...dataContact, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorInfo({})
    setErrorMessage(null)
    setIsLoading(true)
    await axios
      .post('/contact-us', dataContact)
      .then((result) => {
        toast.success(result.data.message, toastOptions)
        setDataContact({ subject: '', email: '', message: '' })
      })
      .catch((error) => {
        toast.error(error.data.message, error.message)
        setErrorMessage('Please fill your form correctly')
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    loadStatisticCounter()
  }, [])

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <Navbar />
      <div className="flex flex-col">
        <div className="w-full">
          <section className="flex flex-col items-center justify-end relative h-[90vh] sm:h-[72vh] bg-gradient-to-b from-transparent to-purple ">
            <Image
              src="/img/landing-pages/hero.png"
              alt="exepart.png"
              fill
              className="w-full h-full object-center object-cover -z-10"
              sizes="90vw"
              priority
            />
            <Container className="my-auto flex items-center justify-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: true, amount: 0.05 }}
              >
                <div className="flex flex-col items-center justify-center xl:w-[70rem] md:w-[40rem] sm:w-[40rem] text-center text-light">
                  <motion.h1
                    variants={textVariant(0.5)}
                    className="font-bold uppercase lg:px-[6px] md:px-0 text-[44px] sm:text-[40px] md:text-[40px] 2xl:text-[110px] lg:text-[110px]"
                  >
                    <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                      <>EXEPART</>
                    </span>
                  </motion.h1>
                  <motion.p
                    variants={fadeIn('up', 'tween', 0.05, 1)}
                    className="inline-block py-4 md:px-1 lg:px-3 sm:text-[12px] md:text-[14px] lg:text-[20px] font-normal leading-relaxed text-white font-in"
                  >
                    <>
                      EXEpart is a closed sales platform that only allows
                      verified industrial manufacturers to list their excess
                      stocks and buy stocks from fellow manufacturers. It is a
                      great tool to overcome the shortage crisis while enabling
                      the manufacturers to capitalize their unused stocks. No
                      brokers are allowed to register at EXEpart.
                    </>
                  </motion.p>
                  <motion.div
                    variants={fadeIn('up', 'tween', 0.2, 1)}
                    className="w-full ml-auto mr-auto xs:pb-10 xs:pt-8 "
                  >
                    <div className="pt-2 sm:pt-0 pb-4 md:pb-1 lg:px-3 md:px-[3px]">
                      <form className="flex items-center">
                        <div className="relative w-full h-full">
                            <input
                              value={search}
                              onChange={({target}) => setSearch(target.value)}
                              onKeyDown={searchComponent}
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-2xl sm:text-[12px] md:text-[14px] lg:text-[20px] text-sm focus:ring-blue-500 focus:border-blue-500 block w-full h-16 ps-10 p-5" 
                              placeholder="Write part number / key word" required/>
                                <button 
                                  type="button" 
                                  className="absolute inset-y-0 end-0 flex items-center pe-3 pr-6"
                                  onClick={searchComponentOnClick}
                                  >
                                  <svg
                                    className="w-6 h-6 text-footer-resources"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                  >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                  />
                                </svg>
                              </button>
                        </div>
                    </form>           
                      <div className="text-left py-2">
                        {suggestion && suggestion.length > 0 && (
                          <div>
                            {isSuggestionLoading && (
                              <div className="text-blueGray-500 text-lg">
                                Suggestion :
                                <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                              </div>
                            )}
                            {!isSuggestionLoading && (
                              <div className="flex justify-start text-lg">
                                <span className="text-blueGray-500">
                                  Suggestion :
                                </span>
                                {suggestion.map((name, index) => (
                                  <Link
                                    key={`${name}--${index}`}
                                    href={`/product/search?q=${name}`}
                                    className="mx-1 underline text-blue-500 italic"
                                  >
                                    {name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        {isSuggestionLoading && suggestion.length === 0 && (
                          <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                        )}
                      </div>                      
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Container>
          </section>
        </div>
        <section className="w-full bg-sub-content  py-2">
          <motion.div
            variants={staggerContainer}
            className="justify-start text-left flex flex-wrap xl:mt-2 2xl:mt-2 lg:mt-2 mt-2"
          >
            <motion.div
              variants={staggerContainer}
              initial="show"
              whileInView={'show'}
              className="container mx-auto lg:px-4 px-6 md:px-6"
              viewport={{ once: true, amount: 0.05 }}
            >
              <motion.div variants={fadeIn('right', 'tween', 0.2, 1)}>
                <TypingText title="/ HOW EXEPART OPERATES" textStyle={''} />
                <TitleText
                  title={
                    <>
                      Exepart offers a platform for manufacturers to list their
                      excess stock for sale while keeping full privacy, as well
                      as conveniently search for excess stocks of other
                      manufacturers at global scale.
                    </>
                  }
                  textStyle={''}
                />
              </motion.div>
              <motion.div
                variants={fadeIn('up', 'tween', 0.05, 1)}
                className="w-full ml-auto mr-auto pt-10"
              >
                <Image
                  src="/img/landing-pages/how_exepart_operates.png"
                  alt="how-exepart-system-operates"
                  height={1500}
                  width={1500}
                  className="mx-autoshadow-lg"
                />
              </motion.div>
              <motion.div
                variants={fadeIn('up', 'tween', 0.2, 1)}
                className="pt-8 pb-2"
              >
                <TitleText
                  title={
                    <>
                      Members of Exepart can buy and sell electronic components
                      from each other via safe transactions enabled by Exepart
                      Escrow services, while being assured their purchase is new
                      and original.
                    </>
                  }
                  textStyle={''}
                />
              </motion.div>
              <motion.div
                variants={fadeIn('up', 'tween', 0.2, 1)}
                className="pb-8"
              >
                <TitleText
                  title={
                    <>
                      Non-member companies can also request quotations for the
                      stocks listed in Exepart by directly contacting us from{' '}
                      <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] hover:text-footer-resources duration-500 ">
                        <a
                          href="mailto:purchasing@exepart.com?"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          purchasing@exepart.com.
                        </a>
                      </span>
                    </>
                  }
                  textStyle={''}
                />
              </motion.div>
              <motion.div
                variants={fadeIn('up', 'tween', 0.05, 1)}
                className="w-full ml-auto mr-auto sm:pb-4"
              >
                <Image
                  src="/img/landing-pages/testing.png"
                  alt="how-exepart-system-operates"
                  height={1500}
                  width={1500}
                  className="mx-auto shadow-lg"
                />
              </motion.div>
              <motion.div
                variants={fadeIn('up', 'tween', 0.2, 1)}
                className="pt-8 pb-4"
              >
                <TitleText
                  title={
                    <>
                      The platform mandates authenticity checks of all orders
                      via AS6081 certified White Horse Laboratory before they
                      are traded. This process is essential to detect and
                      prevent trade of premium copy and refurbished components
                      through our platform. Additionally, the platform ensures
                      privacy and confidentiality of the members during the
                      buying and selling processes.{' '}
                    </>
                  }
                  textStyle={''}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
        <section className="relative bg-sub-content w-full py-4 lg:py-6 xs:py-4 sm:pb-4 sm:pt-0">
          <motion.div
            variants={staggerContainer}
            className="justify-start text-left flex flex-wrap"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: true, amount: 0.05 }}
              className="container mx-auto lg:px-4 px-6 md:px-6"
            >
              <motion.div
                variants={fadeIn('up', 'tween', 0.05, 1)}
                className="w-full ml-auto mr-auto py-4"
              >
                <Image
                  src="/img/landing-pages/linebar.png"
                  alt="how-exepart-system-operates"
                  height={10}
                  width={1500}
                  className="mx-autoshadow-lg"
                />
              </motion.div>
              <motion.div variants={fadeIn('right', 'tween', 0.2, 1)}>
                <TypingText title="/ OUR MEMBERS AND PRODUCTS" textStyle={''} />
                <TitleText
                  title={
                    <>
                      The platform is currently growing. Registered members
                      already uploaded their excess stocks for purchase at
                      global scale. The manufacturers who enrolled from the
                      Americas, Europe and Turkey represent our global community
                      of manufactures. Exepart can also provide quotations to
                      non-members.
                    </>
                  }
                  textStyle={''}
                />
              </motion.div>
              <div className="container  mx-auto py-4  sm:py-0">
                <div className="w-full md:px-4">
                  <div className="py-4 mx-auto sm:max-w-xl  lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-4">
                    <div className="grid grid-cols-2 row-gap-32 md:grid-cols-2 ">
                      <div className="text-center ">
                        <h6 className="text-4xl font-bold lg:text-6xl xl:text-7xl text-sub-header ">
                          {statisticCounter.memberCounter}
                        </h6>
                        <p className="text-sm font-medium tracking-widest text-sub-header uppercase lg:text-base xl:text-lg ">
                          Members
                        </p>
                      </div>
                      <div className="text-center ">
                        <h6 className="text-4xl font-bold lg:text-6xl xl:text-7xl  text-sub-header">
                          {statisticCounter.productCounter}
                        </h6>
                        <p className="text-sm font-medium tracking-widest text-sub-header uppercase lg:text-base xl:text-lg">
                          Products
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div variants={fadeIn('down', 'tween', 0.2, 1)}>
                <TitleText
                  title={
                    <>
                      Having adopted the principle of not providing components
                      for weaponization, Exepart system only allows the defense
                      industry companies to upload their products for others to
                      purchase, yet does not allow their purchase of any item
                      from the platform.
                    </>
                  }
                  textStyle={''}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
        <section className="relative bg-sub-content w-full py-4 lg:py-6 xs:py-4 sm:pb-4 sm:pt-0">
          <motion.div
            variants={staggerContainer}
            className="justify-start text-left flex flex-wrap"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: true, amount: 0.05 }}
              className="container mx-auto lg:px-4 px-6 md:px-6"
            >
              <motion.div
                variants={fadeIn('up', 'tween', 0.05, 1)}
                className="w-full ml-auto mr-auto py-4"
              >
                <Image
                  src="/img/landing-pages/linebar.png"
                  alt="how-exepart-system-operates"
                  height={10}
                  width={1500}
                  className="mx-autoshadow-lg"
                />
              </motion.div>
              {/* <motion.div variants={fadeIn('right', 'tween', 0.2, 1)}>
               
                <TitleText
                  title={
                    <>
                      Please share your contact details along with your inquiry
                      and our team will get in touch with you.
                    </>
                  }
                  textStyle={''}
                />
              </motion.div> */}
              <motion.div variants={fadeIn('right', 'tween', 0.2, 1)}>
                <TypingText title="/ CONTACT US" textStyle={''} />{' '}
                <TitleText
                  title={
                    <>
                      Please share your contact details along with your inquiry
                      and our team will get in touch with you.
                    </>
                  }
                  textStyle={''}
                />
              </motion.div>
              <motion.div
                variants={fadeIn('up', 'tween', 0.2, 1)}
                className="w-full flex items-center justify-center "
              >
                <form onSubmit={handleSubmit}>
                  <div className="bg-white shadow-lg py-5 my-8 lg:px-28 px-8">
                    <div className="md:flex items-center mt-12">
                      <div className="md:w-72 flex flex-col">
                        <label className="text-base font-semibold leading-none text-gray-800">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={dataContact.subject}
                          onChange={handleChange}
                          className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-top-navbar mt-4 bg-gray-100 border   border-indigo-700 placeholder-gray-500"
                          placeholder="Please input subject"
                        />
                      </div>
                      <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                        <label className="text-base font-semibold leading-none text-gray-800">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={dataContact.email}
                          onChange={handleChange}
                          className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-top-navbar mt-4 bg-gray-100 border   border-indigo-700 placeholder-gray-500"
                          placeholder="Please input email address"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="w-full flex flex-col mt-8">
                        <label className="text-base font-semibold leading-none text-gray-800">
                          Message
                        </label>
                        <textarea
                          aria-label="leave a message"
                          role="textbox"
                          name="message"
                          value={dataContact.message}
                          onChange={handleChange}
                          className="h-36 text-base leading-none border-spacing-2 text-gray-900 p-3 focus:oultine-none focus:border-top-navbar mt-4 bg-gray-100 border border-indigo-700  placeholder-gray-500 "
                          placeholder="Please input message"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-full">
                      {/* <button
                        className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700  hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none"
                        disabled={
                          !dataContact.email &&
                          !dataContact.message &&
                          !dataContact.subject
                        }
                      >
                        SUBMIT
                      </button> */}
                      <PrimaryButton
                        className="mt-8 px-8 py-3 font-semibold"
                        type="submit"
                        disabled={
                          !dataContact.email &&
                          !dataContact.message &&
                          !dataContact.subject &&
                          !isLoading
                        }
                      >
                        {isLoading && (
                          <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        )}
                        SUBMIT
                      </PrimaryButton>
                    </div>
                  </div>
                </form>
              </motion.div>
              <motion.div
                variants={fadeIn('up', 'tween', 0.2, 1)}
                className="pb-10"
              >
                <TitleText
                  title={
                    <>
                      We receive multiple requests everyday and we appreciate
                      your patience. For any urgent or non-member requests for
                      quotation, please contact{' '}
                      <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] hover:text-footer-resources duration-500 ">
                        <a
                          href="mailto:purchasing@exepart.com?subject=%5BYour%20Purpose!%5D&body=Hi!"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          purchasing@exepart.com.
                        </a>
                      </span>
                    </>
                  }
                  textStyle={''}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  )
}
