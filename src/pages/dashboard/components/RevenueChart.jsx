import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';

const RevenueChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const revenueData = [
    { date: '10/08', revenue: 1250, streams: 15420 },
    { date: '11/08', revenue: 1380, streams: 16890 },
    { date: '12/08', revenue: 1150, streams: 14200 },
    { date: '13/08', revenue: 1420, streams: 17650 },
    { date: '14/08', revenue: 1680, streams: 20100 },
    { date: '15/08', revenue: 1890, streams: 22340 },
    { date: '16/08', revenue: 2150, streams: 25680 }
  ];

  const periods = [
    { label: '7 dias', value: '7d' },
    { label: '30 dias', value: '30d' },
    { label: '90 dias', value: '90d' },
    { label: '1 ano', value: '1y' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-popover-foreground mb-2">{`Data: ${label}`}</p>
          <p className="text-sm text-success">
            {`Receita: R$ ${payload?.[0]?.value?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          </p>
          <p className="text-sm text-primary">
            {`Streams: ${payload?.[0]?.payload?.streams?.toLocaleString('pt-BR')}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Receita ao Longo do Tempo</h2>
          <p className="text-sm text-muted-foreground">Acompanhe seus ganhos diários</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {periods?.map((period) => (
            <Button
              key={period?.value}
              variant={selectedPeriod === period?.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPeriod(period?.value)}
            >
              {period?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full h-80" aria-label="Gráfico de Receita">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;