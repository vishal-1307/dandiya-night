"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        const data = await res.json();
        if (data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-white">Loading stats...</div>;
  if (!stats) return <div className="text-red-500">Failed to load stats.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Registrations" value={stats.totalRegistrations} />
        <StatCard title="Today's Registrations" value={stats.todaysRegistrations} />
        <StatCard title="Checked In" value={stats.totalCheckedIn} />
        <StatCard 
          title="Capacity" 
          value={`${stats.capacity.filled} / ${stats.capacity.total}`} 
          subtitle={`${stats.capacity.remaining} remaining`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">By Type</h2>
          <div className="space-y-4">
            {Object.entries(stats.byType || {}).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-gray-400 capitalize">{type}</span>
                <span className="text-white font-semibold bg-gray-800 px-3 py-1 rounded-full">
                  {count as number}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">By Status</h2>
          <div className="space-y-4">
            {Object.entries(stats.byStatus || {}).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="text-gray-400 capitalize">{status}</span>
                <span className="text-white font-semibold bg-gray-800 px-3 py-1 rounded-full">
                  {count as number}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }: { title: string, value: string | number, subtitle?: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <div className="text-3xl font-bold text-white">{value}</div>
      {subtitle && <div className="text-gray-500 text-xs mt-2">{subtitle}</div>}
    </div>
  );
}
