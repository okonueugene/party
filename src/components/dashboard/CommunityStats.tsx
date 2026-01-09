import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  GroupIcon,
  BoxIconLine,
ChatIcon
} from "../../icons";
import { 
  FlagIcon 
} from '@heroicons/react/24/outline';
import Badge from "../ui/badge/Badge";
import type { DashboardMetrics } from "../../types/dashboard.types";

interface CommunityStatsProps {
  metrics: DashboardMetrics;
}

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  isCritical?: boolean;
}> = ({ title, value, change, icon, isCritical }) => {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${
        isCritical ? "bg-red-50 dark:bg-red-900/20" : "bg-gray-100 dark:bg-gray-800"
      }`}>
        <span className={isCritical ? "text-red-600" : "text-gray-800 dark:text-white/90"}>
          {icon}
        </span>
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {value}
          </h4>
        </div>

        {change !== undefined && (
          <Badge color={isPositive ? "success" : "error"}>
            {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {Math.abs(change)}%
          </Badge>
        )}
      </div>
    </div>
  );
};

export default function CommunityStats({ metrics }: CommunityStatsProps) {
  // Calculate total engagement: likes + comments
  const totalEngagement = metrics.engagement.today_likes + metrics.engagement.today_comments;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {/* Total Users */}
      <MetricCard
        title="Total Users"
        value={metrics.users.total.toLocaleString()}
        change={metrics.users.change_24h}
        icon={<GroupIcon className="size-6" />}
      />

      {/* Total Posts */}
      <MetricCard
        title="Total Posts"
        value={metrics.posts.total.toLocaleString()}
        change={metrics.posts.change_24h}
        icon={<BoxIconLine className="size-6" />}
      />

      {/* Today's Engagement */}
      <MetricCard
        title="Today's Engagement"
        value={totalEngagement.toLocaleString()}
        icon={<ChatIcon className="size-6" />} // Replace with Heart/Chat icon
      />

      {/* Moderation Alerts */}
      <MetricCard
        title="Pending Flags"
        value={metrics.moderation.pending_flags}
        icon={<FlagIcon className="size-6" />}
        isCritical={metrics.moderation.pending_flags > 0}
      />
    </div>
  );
}