import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Clock,
  History,
  Layers,
  Database,
  Cpu,
  CheckCircle2
} from 'lucide-react';

const eventHeatmapData = [
  { name: 'Mon', maintenance: 12, dr: 2, patch: 45 },
  { name: 'Tue', maintenance: 15, dr: 1, patch: 30 },
  { name: 'Wed', maintenance: 25, dr: 5, patch: 15 },
  { name: 'Thu', maintenance: 10, dr: 0, patch: 50 },
  { name: 'Fri', maintenance: 5, dr: 0, patch: 60 },
  { name: 'Sat', maintenance: 40, dr: 8, patch: 5 },
  { name: 'Sun', maintenance: 35, dr: 12, patch: 2 },
];

const KPI_CARDS = [
  { title: 'Scheduled Events', value: '124', trend: '+12%', color: 'emerald', icon: Calendar },
  { title: 'Active Conflicts', value: '0', trend: 'Healthy', color: 'emerald', icon: CheckCircle2 },
  { title: 'Avg Service Impact', value: '15%', trend: 'Low', color: 'emerald', icon: Activity },
  { title: 'Approval Velocity', value: '4.2h', trend: 'Stable', color: 'slate', icon: Clock },
];

const ContinuityDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Service Continuity Hub</h1>
          <p className="text-slate-400">Strategic oversight of global maintenance windows and resilience operations.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Export Schedule
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Schedule Event
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('+') || card.trend === 'Healthy' ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Heatmap */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Weekly Operational Intensity</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={eventHeatmapData}>
                <defs>
                  <linearGradient id="colorMaint" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="maintenance" stroke="#10b981" fill="url(#colorMaint)" name="Maintenance" />
                <Area type="monotone" dataKey="patch" stroke="#3b82f6" fill="transparent" strokeDasharray="5 5" name="Patching" />
                <Area type="monotone" dataKey="dr" stroke="#f59e0b" fill="transparent" strokeDasharray="5 5" name="DR Drills" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Service Impact Mix</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'Core API Gateway', value: 45, color: 'bg-emerald-500' },
              { name: 'Auth & Identity', value: 30, color: 'bg-blue-500' },
              { name: 'Data Pipeline', value: 15, color: 'bg-amber-500' },
              { name: 'External Services', value: 10, color: 'bg-slate-500' },
            ].map((service) => (
              <div key={service.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{service.name}</span>
                  <span className="text-slate-400">{service.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${service.color}`} style={{ width: `${service.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Upcoming Global Windows</h3>
          <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">View Full Calendar</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Event Title</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Start (UTC)</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Risk</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { title: 'Patch Cycle Q2 - Auth', type: 'PATCH', start: '2026-05-01 10:00', duration: '4h', risk: 'LOW', status: 'APPROVED' },
                { title: 'Regional DR Drill - US-WEST', type: 'DR_TEST', start: '2026-05-03 22:00', duration: '12h', risk: 'HIGH', status: 'PENDING' },
                { title: 'Database Optimization Hub', type: 'MAINT', start: '2026-05-05 02:00', duration: '2h', risk: 'MEDIUM', status: 'DRAFT' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium text-slate-300">{row.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.start}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.duration}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      row.risk === 'LOW' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      row.risk === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.status}</td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-400 hover:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContinuityDashboard;
