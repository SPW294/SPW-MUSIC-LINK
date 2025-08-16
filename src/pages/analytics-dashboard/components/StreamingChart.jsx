import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StreamingChart = ({ data, title = "Tendência de Streaming" }) => {
  const chartData = [
    { date: '01/08', spotify: 12500, apple: 8200, youtube: 15600, deezer: 3400 },
    { date: '02/08', spotify: 13200, apple: 8800, youtube: 16200, deezer: 3600 },
    { date: '03/08', spotify: 11800, apple: 7900, youtube: 14800, deezer: 3200 },
    { date: '04/08', spotify: 14500, apple: 9200, youtube: 17800, deezer: 3800 },
    { date: '05/08', spotify: 15800, apple: 10100, youtube: 19200, deezer: 4200 },
    { date: '06/08', spotify: 16200, apple: 10800, youtube: 20100, deezer: 4400 },
    { date: '07/08', spotify: 17500, apple: 11200, youtube: 21500, deezer: 4600 },
    { date: '08/08', spotify: 18200, apple: 11800, youtube: 22800, deezer: 4800 },
    { date: '09/08', spotify: 19100, apple: 12400, youtube: 24200, deezer: 5100 },
    { date: '10/08', spotify: 20500, apple: 13100, youtube: 25800, deezer: 5400 },
    { date: '11/08', spotify: 21800, apple: 13800, youtube: 27200, deezer: 5700 },
    { date: '12/08', spotify: 23200, apple: 14500, youtube: 28900, deezer: 6000 },
    { date: '13/08', spotify: 24100, apple: 15200, youtube: 30100, deezer: 6200 },
    { date: '14/08', spotify: 25500, apple: 15800, youtube: 31800, deezer: 6500 },
    { date: '15/08', spotify: 26800, apple: 16500, youtube: 33200, deezer: 6800 },
    { date: '16/08', spotify: 28200, apple: 17200, youtube: 34800, deezer: 7100 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{`Data: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value?.toLocaleString('pt-BR')} streams`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Spotify</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Apple Music</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span>YouTube Music</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span>Deezer</span>
          </div>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000)?.toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="spotify" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-success)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="apple" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="youtube" 
              stroke="var(--color-error)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-error)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-error)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="deezer" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-warning)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StreamingChart;