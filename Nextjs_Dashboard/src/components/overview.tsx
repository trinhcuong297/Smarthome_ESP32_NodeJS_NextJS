'use client';

import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Jan',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'Feb',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'Mar',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'Apr',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'May',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'Jun',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'Jul',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'Aug',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'Sep',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'Oct',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'Nov',
    temperature: Math.floor(Math.random() * 10) + 20
  },
  {
    name: 'Dec',
    temperature: Math.floor(Math.random() * 10) + 20
  }
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#000" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#000" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis
        dataKey="name"
        />
        <YAxis
        domain={[0, 50]}
        />
        <Tooltip />
        <Area type="monotone" dataKey="temperature" fillOpacity={1} fill="url(#colorUv)" stroke="#000" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
