import React from "react";
import { useQuery } from "react-query";
import "chartjs-adapter-date-fns";
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
// components
import Loader from "../../components/Loader";
// constants
import { chartOptions } from "../../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CasesGraph = ({ height }: any) => {
  const { data, isLoading, isError } = useQuery("cases", async () => {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );
    if (!response?.ok) {
      throw new Error("Failed to fetch cases data");
    }
    return response.json();
  });

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  const casesData = data?.cases;

  const chartData = {
    labels: casesData && Object.keys(casesData),
    datasets: [
      {
        label: "Cases",
        data: casesData && Object.values(casesData),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Cases Fluctuations</h2>

      <div className="mb-2" style={{ height: height || "100vh" }}>
        {isLoading ? (
          <Loader>
            <Line options={chartOptions} data={chartData} />
          </Loader>
        ) : (
          <Line options={chartOptions} data={chartData} />
        )}
      </div>
    </div>
  );
};

export default CasesGraph;
