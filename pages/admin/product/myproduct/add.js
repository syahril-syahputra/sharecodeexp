import React, { useState } from "react";
import Link from "next/link";

// components
import InputForm from "@/components/Shared/InputForm";

// layout for page
import Admin from "layouts/Admin.js";

export default function MyProduct() {
  const [productData, setProductData] = useState({
    AvailableQuantity: '',
    moq: '',
    UnitPrice: '',
    product_id: '',
    package: '',
    packaging: ''
  });

  const [errorInfo, setErrorInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const setDataHandler = (item, inputName) => {
    setProductData({...productData, [inputName]:item.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(productData)
  }

  return (
    <>
      <div className="relative shadow">
        <div className="mb-0 px-4 py-3 border-0 bg-white">
          <div className="flex justify-between">
              <div className="px-4">
                  <h3
                  className={
                      "font-semibold text-lg text-blueGray-700"
                  }
                  >
                  Add New Product
                  </h3>
              </div>
              {/* <div className="px-4 mt-2">
                  <Link href="/admin/product/myproduct/add" className="relative bg-blueGray-700 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                      Add Product</Link>
              </div> */}
          </div>
        </div>

        <div className="mb-0 px-4 py-3 border-0 bg-white">
          <form>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <InputForm
                  label="Available Quantity"
                  inputDataName="AvailableQuantity"
                  setData={setDataHandler}
                  errorMsg=""
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <InputForm
                  label="MOQ"
                  inputDataName="moq"
                  setData={setDataHandler}
                  errorMsg=""
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <InputForm
                  label="Unit Price"
                  inputDataName="UnitPrice"
                  setData={setDataHandler}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <InputForm
                  label="Product ID"
                  inputDataName="product_id"
                  setData={setDataHandler}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <InputForm
                  label="Package"
                  inputDataName="package"
                  setData={setDataHandler}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <InputForm
                  label="Packaging"
                  inputDataName="packaging"
                  setData={setDataHandler}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 mt-20">
                <div className="mb-6">
                    {!isLoading && 
                        <button
                            type="submit"

                            className="w-1/2 text-white font-bold px-6 py-4 outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                        >
                        Save
                        </button>
                    }
                    {isLoading && 
                        <button
                            disabled
                            type="submit"
                            className="w-1/2 text-white font-bold px-6 py-4 outline-none mr-1 mb-1 bg-blueGray-400 uppercase text-sm shadow"
                        >
                            <i className="fas fa-circle-notch fa-spin"></i>
                        </button>
                    }
                </div>
              </div>

              
          </form>
        </div>
      </div>
    </>
  );
}

MyProduct.layout = Admin;
