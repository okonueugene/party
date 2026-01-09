import type { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import type { EngagementMetrics } from "../../types/dashboard.types";

interface EngagementChartProps {
  engagement: EngagementMetrics;
}

export default function EngagementChart({ engagement }: EngagementChartProps) {
  // Data for the Donut Chart
  const series = [engagement.today_likes, engagement.today_comments];
  
  const options: ApexOptions = {
    colors: ["#465FFF", "#9CB9FF"], // Primary brand colors
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    labels: ["Likes", "Comments"],
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 250,
          },
        },
      },
    ],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Engagement Breakdown
          </h3>
          <p className="text-sm text-gray-500">Today's interaction split</p>
        </div>
      </div>

      <div className="mb-2">
        <div id="engagementChart" className="flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Legend & Stats Section */}
        <div className="flex justify-between items-center p-3 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="block h-3 w-3 rounded-full bg-brand-500"></span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Likes</span>
          </div>
          <span className="text-sm font-bold text-gray-800 dark:text-white">
            {engagement.avg_likes_per_post.toFixed(1)}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="block h-3 w-3 rounded-full bg-blue-300"></span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Comments</span>
          </div>
          <span className="text-sm font-bold text-gray-800 dark:text-white">
            {engagement.avg_comments_per_post.toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-xs text-gray-400">
          Total lifetime engagement: <span className="font-semibold">{(engagement.total_likes + engagement.total_comments).toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
}