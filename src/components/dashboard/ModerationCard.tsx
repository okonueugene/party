import { useState } from "react";
import { MoreDotIcon } from "../../icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import Badge from "../ui/badge/Badge";
import type { ModerationMetrics, RecentFlag } from "../../types/dashboard.types";

interface ModerationCardProps {
  metrics: ModerationMetrics;
  recentFlags: RecentFlag[];
}

export default function ModerationCard({ metrics, recentFlags }: ModerationCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Moderation Summary
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Requires immediate attention
          </p>
        </div>
        <div className="relative inline-block">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
            <DropdownItem onItemClick={() => setIsOpen(false)}>View All Flags</DropdownItem>
            <DropdownItem onItemClick={() => setIsOpen(false)}>Moderation Logs</DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-2 gap-4 my-6">
        <div className="flex flex-col p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
          <span className="text-xs font-medium text-red-600 uppercase">Pending</span>
          <span className="text-2xl font-bold text-red-700 dark:text-red-500">
            {metrics.pending_flags}
          </span>
        </div>
        <div className="flex flex-col p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <span className="text-xs font-medium text-gray-500 uppercase">Actioned</span>
          <span className="text-2xl font-bold text-gray-800 dark:text-white/90">
            {metrics.action_taken}
          </span>
        </div>
      </div>

      {/* Flag Priority List */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Recent Reports
        </h4>
        <div className="space-y-3">
          {recentFlags.slice(0, 3).map((flag) => (
            <div 
              key={flag.id} 
              className="group p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-900/50 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <Badge color="error" className="text-[10px] px-2 py-0">
                  {flag.reason}
                </Badge>
                <span className="text-[10px] text-gray-400 italic">
                  Reported by {flag.reported_by}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                "{flag.post_content}"
              </p>
              <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-800 flex justify-end">
                <button className="text-xs font-bold text-brand-500 hover:text-brand-600">
                  Take Action →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button className="mt-6 w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
        Go to Moderation Center
      </button>
    </div>
  );
}