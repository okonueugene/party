import PageMeta from "../components/common/PageMeta";
import React, { useEffect, useState } from 'react';
import dashboardService from '../api/dashboard';
import type { DashboardData } from '../types/dashboard.types';
import { RotatingLines as Spinner } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import CommunityStats from "../components/dashboard/CommunityStats";
import UserDemographics from "../components/dashboard/UserDemographics";
import ModerationCard from "../components/dashboard/ModerationCard";
import EngagementChart from "../components/dashboard/EngagementChart";
import ModerationQueue from "../components/dashboard/ModerationQueue"; 

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getOverview();
      setData(response);
    } catch (error) {
      toast.error("Failed to sync dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen w-full">
      <Spinner height={40} width={40} color="#4F46E5" visible={true} strokeWidth={5} />
    </div>
  );

  if (!data) return <div className="p-10 text-center">No data available.</div>;

  return (
    <>
      <PageMeta title="Community Admin Dashboard" description="Overview of metrics" />
      
      {/* Container normalized to TailAdmin standard padding and max-width */}
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
          
          {/* 1. KPI SECTION - Full Width */}
          <div className="col-span-12">
            <CommunityStats metrics={data.metrics} />
          </div>

          {/* 2. MAIN ROW: Map & Moderation (Balanced Heights) */}
          <div className="col-span-12 xl:col-span-8 flex flex-col">
            {/* Height of this container should drive the row height */}
            <UserDemographics users={data.recent_activity.recent_users} />
          </div>

          <div className="col-span-12 xl:col-span-4 flex flex-col">
            {/* Removed the manual max-h and overflow. 
                Using flex-grow ensures this card stretches to match the Map card */}
            <ModerationCard 
              metrics={data.metrics.moderation} 
              recentFlags={data.recent_activity.recent_flags} 
            />
          </div>
          
          {/* 3. TRENDS ROW: Engagement & Health */}
          <div className="col-span-12 xl:col-span-7 flex flex-col">
            <EngagementChart engagement={data.metrics.engagement} />
          </div>

          <div className="col-span-12 xl:col-span-5 flex flex-col gap-4 md:gap-6">
            {/* Re-using the standard TailAdmin wrapper logic for the health card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6 h-full">
               <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
                 Community Health
               </h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Verified Users</span>
                    <span className="font-bold text-success text-lg">{data.metrics.users.verified}</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Daily Engagement Rate</span>
                    {/* Calculation example */}
                    <span className="font-bold text-gray-800 dark:text-white text-lg">
                      {((data.metrics.engagement.today_likes / data.metrics.users.total) * 100).toFixed(1)}%
                    </span>
                 </div>
               </div>
            </div>
          </div>

          {/* 4. TABLE SECTION - Full Width Footer */}
          <div className="col-span-12 mt-2">
            <ModerationQueue flags={data.recent_activity.recent_flags} />
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;