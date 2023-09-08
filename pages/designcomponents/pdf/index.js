// import PDF from "./PDFResult";
import PDF from "./ProformaExample";
import { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import axios from "lib/axios";
export default function ReportGenerator () {

    const [isClient, setIsClient] = useState(false)
    const [statisticCounter, setStatisticCounter] = useState({
      memberCounter: 0,
      productCounter: 0
    })
    
    useEffect(() => {
      const loadStatisticCounter = async () => {
        const request = await axios.get(`/statistic-counter`)
          .then((respose) => {
            setStatisticCounter({
              memberCounter: respose.data.data.member,
              productCounter: respose.data.data.product
            })
          })
      }

      loadStatisticCounter()
      setIsClient(true)
    }, [])
    
    return (
      <>
        { isClient ?
          <div>
            <PDFDownloadLink document={<PDF data={statisticCounter}/>} fileName="report.pdf">
              Download PDF
            </PDFDownloadLink>
            <div className="w-full ml-10">
              <PDFViewer  width={1100} height={1500}>
                  <PDF data={statisticCounter}/>
              </PDFViewer>
            </div>
          </div>
        : 'Loading...'}
      </>
    )
  }