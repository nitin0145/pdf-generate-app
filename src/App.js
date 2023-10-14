import { useEffect, useState } from "react"
import "./App.css"
import { PrintPage } from "./components/PrintPage"
import printerIcon from "./assets/printer.svg"
import generatePDF, { Margin, Options, Resolution } from "react-to-pdf"
import { ChartData } from "chart.js"

const pdfOptions = {
  filename: "burglary-report-chart.pdf",
  method: "save",
  resolution: Resolution.HIGH,
  page: {
    margin: Margin.NONE,
    format: "A4",
    orientation: "portrait",
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      compress: false,
    },
    canvas: {
      scale: 9.3,
      useCORS: true,
    },
  },
}

const downloadPdf = () =>
  generatePDF(() => document.getElementById("print-page"), pdfOptions)

const defaultChartData = {
  label: "Burglary",
  borderColor: "#1463FF",
  backgroundColor: "transparent",
  pointBorderWidth: 0,
}

const App = () => {
  const [chartData, setChartData] = useState(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"
      )
      const data = await res.json()
      if (!data?.data?.length) return

      const labels = data.data.map((item) => item.data_year)
      const burglary = data.data.map((item) => item.Burglary)

      setChartData({
        labels,
        datasets: [
          {
            data: burglary,
            ...defaultChartData,
          },
        ],
      })
    }
    fetchData()
  }, [])

  return (
    <div className="main">
      <button
        onClick={downloadPdf}
        className="print-button"
        disabled={!chartData}
      >
        <img src={printerIcon} alt="printer icon" />
        Print
      </button>

      {chartData && (
        <div id="print-page">
          <PrintPage chartData={chartData} />
        </div>
      )}
    </div>
  )
}

export default App
