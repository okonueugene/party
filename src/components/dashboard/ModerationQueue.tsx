import React from 'react';
import type { RecentFlag } from '../../types/dashboard.types';
import Badge from '../ui/badge/Badge';

interface ModerationQueueProps {
  flags: RecentFlag[];
}

export default function ModerationQueue({ flags }: ModerationQueueProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
          Moderation Queue
        </h3>
        <div className="flex gap-2">
           <button className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200">
             Export CSV
           </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left bg-gray-50 dark:bg-gray-800/50">
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                Post Content
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                Author
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                Reason
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                Reported By
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                Date
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {flags.map((flag) => (
              <tr key={flag.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-800 dark:text-gray-200 max-w-xs truncate">
                    {flag.post_content}
                  </p>
                  <span className="text-[10px] text-gray-400">ID: #{flag.post_id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {flag.post_author}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge color="error">{flag.reason}</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {flag.reported_by}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(flag.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button className="text-xs font-bold text-green-600 hover:text-green-700">
                      Dismiss
                    </button>
                    <button className="text-xs font-bold text-red-600 hover:text-red-700">
                      Delete Post
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {flags.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  No flags currently in queue.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}