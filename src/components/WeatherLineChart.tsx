import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

type Props = {
  hourlyRain: any;
  hours: Array<any>;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Neerslag (mm)",
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 0,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export function WeatherLineChart({ hourlyRain, hours }: Props) {
  let hour = new Date().getHours();
  let hoursFormatted = hours
    .map((x) => {
      return new Date(x).getHours();
    })
    .filter((x) => x > hour);
  let labels = hoursFormatted.map((x: Number) => x + "u");
  const data = {
    labels,
    datasets: [
      {
        label: "Neerslag verwacht",
        data: hoursFormatted.map((x, i) => hourlyRain[x]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
