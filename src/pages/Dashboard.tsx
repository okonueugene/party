import React from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import { Users, AlertTriangle, FileText, Activity } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  // Mock Data conforming to specs (Users per ward, Engagement) 
  const userGrowthData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Registrations',
        data: [12, 19, 8, 15, 22, 30, 45],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const flagsByReasonData = {
    labels: ['Hate Speech', 'Misinfo', 'Spam', 'Harassment'],
    datasets: [
      {
        label: 'Flagged Content',
        data: [15, 8, 24, 5],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',  // Red
          'rgba(245, 158, 11, 0.7)', // Orange
          'rgba(107, 114, 128, 0.7)', // Gray
          'rgba(59, 130, 246, 0.7)', // Blue
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening in Siaya & Nakuru.</p>
        </div>
        <div className="mt-4 md:mt-0">
           {/* Action button placeholder */}
           <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
             Download Report
           </button>
        </div>
      </div>

      {/* 1. Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Users" 
          value="1,245" 
          icon={<Users size={24} />} 
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard 
          title="Pending Flags" 
          value="42" 
          icon={<AlertTriangle size={24} />} 
          trend={{ value: 5, isPositive: false }}
          color="red"
        />
        <StatsCard 
          title="Posts Today" 
          value="189" 
          icon={<FileText size={24} />} 
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard 
          title="Engagement Rate" 
          value="24%" 
          icon={<Activity size={24} />} 
          color="yellow"
        />
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Growth Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">User Growth & Activity</h3>
          <div className="h-64">
            <Line options={{ responsive: true, maintainAspectRatio: false }} data={userGrowthData} />
          </div>
        </div>

        {/* Secondary Stats Chart */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Flags by Reason</h3>
          <div className="h-64">
             <Bar 
               options={{ 
                 responsive: true, 
                 maintainAspectRatio: false,
                 indexAxis: 'y' as const // Horizontal Bar Chart
               }} 
               data={flagsByReasonData} 
             />
          </div>
        </div>
      </div>

      {/* 3. Recent Activity List (Simplified Table) */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Recent Flagged Content</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Hate Speech</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nakuru East</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 mins ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <button className="text-sm text-blue-600 font-medium hover:text-blue-800">View All Queue &rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;