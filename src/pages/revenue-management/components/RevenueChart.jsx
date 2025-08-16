import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RevenueChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('6months');

  const revenueData = [
    { month: 'Fev', revenue: 3200, streams: 45000, platforms: 8 },
    { month: 'Mar', revenue: 4100, streams: 58000, platforms: 9 },
    { month: 'Abr', revenue: 3800, streams: 52000, platforms: 10 },
    { month: 'Mai', revenue: 5200, streams: 72000, platforms: 11 },
    { month: 'Jun', revenue: 4900, streams: 68000, platforms: 12 },
    { month: 'Jul', revenue: 6100, streams: 85000, platforms: 13 },
    { month: 'Ago', revenue: 6800, streams: 95000, platforms: 14 }
  ];

  const platformData = [
    { name: 'Spotify', value: 35, color: '#1DB954' },
    { name: 'Apple Music', value: 25, color: '#FA57C1' },
    { name: 'YouTube Music', value: 20, color: '#FF0000' },
    { name: 'Deezer', value: 10, color: '#FEAA2D' },
    { name: 'TikTok', value: 7, color: '#25F4EE' },
    { name: 'Outros', value: 3, color: '#8B5CF6' }
  ];

  const chartTypeOptions = [
    { value: 'line', label: 'Linha' },
    { value: 'area', label: 'Área' },
    { value: 'bar', label: 'Barras' }
  ];

  const timeRangeOptions = [
    { value: '3months', label: 'Últimos 3 meses' },
    { value: '6months', label: 'Últimos 6 meses' },
    { value: '1year', label: 'Último ano' },
    { value: '2years', label: 'Últimos 2 anos' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-popover-foreground">
                {entry?.name === 'revenue' 
                  ? `R$ ${entry?.value?.toLocaleString('pt-BR')}` 
                  : entry?.value?.toLocaleString('pt-BR')
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data?.payload?.color }}
            />
            <span className="font-medium text-popover-foreground">{data?.name}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {data?.value}% da receita total
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: revenueData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="var(--color-primary)" 
              fillOpacity={1} 
              fill="url(#colorRevenue)"
              name="Receita"
            />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="var(--color-primary)" name="Receita" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              name="Receita"
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
      {/* Revenue Trend Chart */}
      <div className="xl:col-span-2 bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Tendência de Receita</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Evolução dos ganhos ao longo do tempo
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Select
              options={chartTypeOptions}
              value={chartType}
              onChange={setChartType}
              className="w-32"
            />
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="w-40"
            />
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">+23.5%</p>
            <p className="text-sm text-muted-foreground">Crescimento</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">R$ 6.800</p>
            <p className="text-sm text-muted-foreground">Último mês</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">95.000</p>
            <p className="text-sm text-muted-foreground">Reproduções</p>
          </div>
        </div>
      </div>
      {/* Platform Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Receita por Plataforma</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Distribuição percentual
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>

        <div className="h-64 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {platformData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {platformData?.map((platform, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: platform?.color }}
                />
                <span className="text-sm font-medium text-foreground">{platform?.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-foreground">{platform?.value}%</span>
                <p className="text-xs text-muted-foreground">
                  R$ {(6800 * platform?.value / 100)?.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;