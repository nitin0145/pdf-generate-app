import locationIcon from "../assets/location.svg"
import realassistLogo from "../assets/realassist_logo.svg"
import "./PrintPage.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  LineController,
} from "chart.js"
import { Chart, ChartProps } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController
)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          size: 9,
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 9,
        },
      },
      grid: {
        display: false,
      },
    },
  },
  aspectRatio: 3,
}

export const PrintPage = ({
  chartData,
}) => {
  return (
    <main>
      <div>
        <header>
        <img src={realassistLogo} alt="realassist_logo"/>
          <p>123 Main Street, Dover, NH 03820-4667</p>
        </header>
        <div className="hr" />
      </div>

      <div className="blank"></div>
      <div className="blank"></div>
      <div className="blank"></div>

      <div className="crime-section">
        <div className="crime-section__header">
          <img src={locationIcon} alt="location icon" />
          <p>Crime</p>
          <div className="hr" />
        </div>
 
         <div>
          <div className="crime-section__chart-header">Burglary</div>
          <div className="crime-section__chart-body">
            <p>Arrests</p>
            <div className="crime-section__chart">
              <Chart type="line" options={chartOptions} data={chartData} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="hr" />
        <footer>
          <p className="p-blue">Report Genereted on September 26, 2023</p>
          <p> RealAssist Property Report | Page 1 of 25</p>
        </footer>
      </div>
    </main>
  )
}
