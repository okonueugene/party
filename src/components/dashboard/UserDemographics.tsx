import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import CommunityMap from "./CommunityMap"; // Using the map we built earlier
import type { RecentUser } from "../../types/dashboard.types";

interface UserDemographicsProps {
  users: RecentUser[];
}

export default function UserDemographics({ users }: UserDemographicsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Group users by County for the list (Logic can be adjusted to Ward/Constituency)
  const countyCounts = users.reduce((acc, user) => {
    acc[user.county] = (acc[user.county] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedCounties = Object.entries(countyCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Show top 5 regions

  const totalRecent = users.length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            User Geography
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Distribution of recent sign-ups by region
          </p>
        </div>
        
        <div className="relative inline-block">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
            <DropdownItem onItemClick={() => setIsOpen(false)}>Export Data</DropdownItem>
            <DropdownItem onItemClick={() => setIsOpen(false)}>Refresh Map</DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Map Container */}
      <div className="px-4 py-6 my-6 overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-800 sm:px-6">
        <div className="h-[212px] w-full">
           <CommunityMap users={users} />
        </div>
      </div>

      {/* Dynamic Region List */}
      <div className="space-y-5">
        {sortedCounties.map(([county, count]) => {
          const percentage = Math.round((count / totalRecent) * 100);
          
          return (
            <div key={county} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold">
                  {county.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                    {county}
                  </p>
                  <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                    {count} New Users
                  </span>
                </div>
              </div>

              <div className="flex w-full max-w-[140px] items-center gap-3">
                <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                  <div 
                    style={{ width: `${percentage}%` }}
                    className="absolute left-0 top-0 h-full rounded-sm bg-brand-500"
                  ></div>
                </div>
                <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {percentage}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}