/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {PageSEO} from '@/components/Utils/SEO';
import siteMetadata from '@/utils/siteMetadata';
import axios from 'lib/axios';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {fadeIn, staggerContainer, textVariant} from '@/utils/motion';
//components
import Footer from 'components/Footers/Footer.js';
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton';
import TextInput from '@/components/Interface/Form/TextInput';
import Navbar from '@/components/Navbar2V';
import {TypingText} from '@/components/TypeText';
import {TitleText} from '@/components/TitleText';
import {toastOptions} from '@/lib/toastOptions';
import {toast} from 'react-toastify';

export default function Index() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  function searchComponent(event) {
    if (event.key === 'Enter' && !!search) {
      router.replace(`/product/search?q=${search}`);
    }
  }

  //search suggestion
  const [suggestion, setSuggestion] = useState([]);
  const [isSuggestionLoading, setSuggestionLoading] = useState(false);
  useEffect(() => {
    if (search) {
      setSuggestionLoading(true);
      const getData = setTimeout(() => {
        axios
          .get(`/search/suggest/${search}`)
          .then((response) => {
            setSuggestion(response.data.data);
          })
          .finally(() => setSuggestionLoading(false));
      }, 1000);

      return () => clearTimeout(getData);
    }
  }, [search]);

  const [statisticCounter, setStatisticCounter] = useState({
    memberCounter: 0,
    productCounter: 0,
  });
  const loadStatisticCounter = async () => {
    const request = await axios.get(`/statistic-counter`).then((respose) => {
      setStatisticCounter({
        memberCounter: respose.data.data.member,
        productCounter: respose.data.data.product,
      });
    });
  };
  const [dataContact, setDataContact] = useState({
    subject: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorInfo, setErrorInfo] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataContact({...dataContact, [name]: value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorInfo({});
    setErrorMessage(null);
    setIsLoading(true);
    await axios
      .post('/contact-us', dataContact)
      .then(() => {
        toast.success('Your message has been send successfully.', toastOptions);
        setDataContact({subject: '', email: '', message: ''});
      })
      .catch((error) => {
        toast.error('Something went wrong.', error.message);
        setErrorMessage('Please fill your form correctly');
        setErrorInfo(error.data.data);
        setDataContact({subject: '', email: '', message: ''});
      })
      .finally(() => {
        setIsLoading(false);
        setDataContact({subject: '', email: '', message: ''});
      });
  };

  useEffect(() => {
    loadStatisticCounter();
  }, []);

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <Navbar />
      <div className="w-full ">
        <section className="flex flex-col items-start justify-end relative h-[85.79161028416779vh] overflow-hidden bg-gradient-to-b from-transparent from-66% to-[#340135]">
          <div className="h-full z-0" />
          <Image
            src="/img/lukas-tennie-DAWnMmUSMdU-unsplash.png"
            alt="exepart.png"
            fill
            className="w-full h-full object-center object-cover -z-10 "
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView={'show'}
            viewport={{once: false, amount: 0.35}}
          >
            <div className="Container absolute left-1/4 top-1/2 -translate-x-[23.6153%] bottom-0 -translate-y-1/2 transform text-white ">
              <motion.h1
                variants={textVariant(0.5)}
                className="font-bold lg:text-[110px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[164.45px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px]  uppercase text-white tracking-widest"
              >
                <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
                  {'EXEPART'}
                </span>
              </motion.h1>
              <motion.p
                variants={fadeIn('up', 'tween', 0.3, 1)}
                className="inline-blog mt-[2px] sm:text-[28px] text-[18px] font-normal leading-relaxed text-white px-[8px]  "
              >
                <>
                  EXEpart is a closed sales platform that only allows verified
                  industrial manufacturers to list their excess stocks and buy
                  stocks from fellow manufacturers. It is a great tool to
                  overcome the shortage crisis while enabling the manufacturers
                  to capitalize their unused stocks. No brokers are allowed to
                  register at EXEpart.
                </>
              </motion.p>
              <motion.div
                variants={fadeIn('up', 'tween', 0.3, 1)}
                className="w-full ml-auto mr-auto pb-10 pt-8"
              >
                <div className="container px-4 relative flex">
                  <TextInput
                    value={search}
                    onChange={(target) => setSearch(target.value)}
                    onKeyDown={searchComponent}
                    type="text"
                    setIcon="fas fa-search"
                    placeholder="Search for the components"
                  />

                  <PrimaryButton
                    size={'lg'}
                    type="button"
                    className="mr-6 bg-sub-header "
                  >
                    <Link href={!!search ? `/product/search?q=${search}` : ''}>
                      Search
                    </Link>
                  </PrimaryButton>
                </div>
                <div className="text-left pt-2 pb-4 px-4">
                  {suggestion && suggestion.length > 0 && (
                    <div>
                      {isSuggestionLoading && (
                        <div className="text-blueGray-500">
                          Suggestion :
                          <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                        </div>
                      )}
                      {!isSuggestionLoading && (
                        <div className="flex justify-start">
                          <span className="text-blueGray-500">
                            Suggestion :
                          </span>
                          {suggestion.map((name) => (
                            <Link
                              key={name}
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
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
      <section className="w-full bg-sub-content py-8">
        <motion.div
          variants={staggerContainer}
          className="justify-start text-left flex flex-wrap"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView={'show'}
            className="container mx-auto px-4 "
            viewport={{once: false, amount: 0.25}}
          >
            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)}>
              <TypingText title="/ HOW EXEPART OPERATES" textStyle={''} />
              <TitleText
                title={
                  <>
                    Exepart offers a platform for manufacturers to list their
                    excess stock for sale while keeping full privacy, as well as
                    conveniently search for excess stocks of other manufacturers
                    at global scale.
                  </>
                }
                textStyle={''}
              />
            </motion.div>
            <motion.div
              variants={fadeIn('up', 'tween', 0.3, 1)}
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
              className="py-8"
            >
              <TitleText
                title={
                  <>
                    Members of Exepart can buy and sell electronic components
                    from each other via safe transactions enabled by Exepart
                    Escrow services, while being assured their purchase is new
                    and original. Non-member companies can also request
                    quotations for the stocks listed in Exepart by directly
                    contacting us from{' '}
                    <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] hover:text-footer-resources duration-500 ">
                      <a
                        href="mailto:purchasing@exepart.com?subject=%5BYour%20Purpose!%5D&body=Hi!"
                        arget="_blank"
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
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="w-full ml-auto mr-auto"
            >
              <Image
                src="/img/landing-pages/testing.png"
                alt="how-exepart-system-operates"
                height={1500}
                width={1500}
                className="mx-auto shadow-lg"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      <section className="relative bg-sub-content w-full py-8">
        <motion.div
          variants={staggerContainer}
          className="justify-start text-left flex flex-wrap"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView={'show'}
            viewport={{once: false, amount: 0.25}}
            className="container mx-auto px-4"
          >
            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)}>
              <TypingText title="/ OUR MEMBERS AND PRODUCTS" textStyle={''} />
              <TitleText
                title={
                  <>
                    The platform is currently growing. Registered members
                    already uploaded their excess stocks for purchase at global
                    scale. The manufacturers who enrolled from the Americas,
                    Europe and Turkey represent our global community of
                    manufactures. Exepart can also provide quotations to
                    non-members.
                  </>
                }
                textStyle={''}
              />
            </motion.div>
            <div className="container  mx-auto py-7">
              <div className="w-full md:px-4">
                <div className="py-10 mx-auto sm:max-w-xl md:w-1/2 lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                  <div className="grid grid-cols-2 row-gap-2 md:grid-cols-2">
                    <div className="text-center md:border-r">
                      <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl text-sub-header ">
                        {statisticCounter.memberCounter}
                      </h6>
                      <p className="text-sm font-medium tracking-widest text-sub-header uppercase lg:text-base  ">
                        Members
                      </p>
                    </div>
                    <div className="text-center md:border-r">
                      <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl  text-sub-header">
                        {statisticCounter.productCounter}
                      </h6>
                      <p className="text-sm font-medium tracking-widest text-sub-header uppercase lg:text-base ">
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
                    Having adopted the principle of not providing components for
                    weaponization, Exepart system only allows the defense
                    industry companies to upload their products for others to
                    purchase, yet does not allow their purchase of any item from
                    the platform.
                  </>
                }
                textStyle={''}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      <section className="relative bg-sub-content w-full py-8">
        <motion.div
          variants={staggerContainer}
          className="justify-start text-left flex flex-wrap"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView={'show'}
            viewport={{once: false, amount: 0.25}}
            className="container mx-auto px-4"
          >
            <motion.div variants={fadeIn('up', 'tween', 0.2, 1)}>
              <TypingText title="/ CONTACT US" textStyle={''} />
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
                <div className="bg-white rounded-lg shadow-lg py-5 my-8 lg:px-28 px-8">
                  <div className="md:flex items-center mt-12">
                    <div className="md:w-72 flex flex-col">
                      <label className="text-base font-semibold leading-none text-gray-800">
                        Subject
                      </label>
                      <input
                        arial-label="Please input subject"
                        type="text"
                        name="subject"
                        value={dataContact.subject}
                        onChange={handleChange}
                        className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-top-navbar mt-4 bg-gray-100 border   border-indigo-700 placeholder-gray-500"
                        placeholder="Please input  name"
                      />
                    </div>
                    <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                      <label className="text-base font-semibold leading-none text-gray-800">
                        Email Address
                      </label>
                      <input
                        arial-label="Please input email address"
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
                        defaultValue={''}
                        placeholder="Please input message"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <button className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700  hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none">
                      SUBMIT
                    </button>
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
                    We receive multiple requests everyday and we appreciate your
                    patience. For any urgent or non-member requests for
                    quotation, please contact{' '}
                    <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] hover:text-footer-resources duration-500 ">
                      <a
                        href="mailto:purchasing@exepart.com?subject=%5BYour%20Purpose!%5D&body=Hi!"
                        arget="_blank"
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
      <Footer />
    </>
  );
}
