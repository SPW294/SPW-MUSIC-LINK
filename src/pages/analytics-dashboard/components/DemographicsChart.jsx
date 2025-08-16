import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Button from '../../../components/ui/Button';

const DemographicsChart = ({ title = "Demografia dos Ouvintes" }) => {
  const [activeTab, setActiveTab] = useState('age');

  const ageData = [
    { range: '13-17', listeners: 45200, percentage: 12.8 },
    { range: '18-24', listeners: 128600, percentage: 36.4 },
    { range: '25-34', listeners: 98400, percentage: 27.9 },
    { range: '35-44', listeners: 52800, percentage: 15.0 },
    { range: '45-54', listeners: 19600, percentage: 5.6 },
    { range: '55+', listeners: 8100, percentage: 2.3 }
  ];

  const genderData = [
    { gender: 'Feminino', listeners: 198400, percentage: 56.2, color: '#EC4899' },
    { gender: 'Masculino', listeners: 142800, percentage: 40.4, color: '#3B82F6' },
    { gender: 'Não informado', listeners: 12000, percentage: 3.4, color: '#6B7280' }
  ];

  const deviceData = [
    { device: 'Mobile', listeners: 245600, percentage: 69.6, color: '#10B981' },
    { device: 'Desktop', listeners: 78200, percentage: 22.1, color: '#F59E0B' },
    { device: 'Tablet', listeners: 18400, percentage: 5.2, color: '#8B5CF6' },
    { device: 'Smart TV', listeners: 10500, percentage: 3.0, color: '#EF4444' },
    { device: 'Outros', listeners: 300, percentage: 0.1, color: '#6B7280' }
  ];

  const timeData = [
    { hour: '00-02', listeners: 8200 },
    { hour: '02-04', listeners: 4100 },
    { hour: '04-06', listeners: 6800 },
    { hour: '06-08', listeners: 18600 },
    { hour: '08-10', listeners: 32400 },
    { hour: '10-12', listeners: 28900 },
    { hour: '12-14', listeners: 35200 },
    { hour: '14-16', listeners: 42800 },
    { hour: '16-18', listeners: 48600 },
    { hour: '18-20', listeners: 52400 },
    { hour: '20-22', listeners: 45200 },
    { hour: '22-00', listeners: 28100 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-1">{label}</p>
          <p className="text-sm text-popover-foreground">
            Ouvintes: {data?.listeners?.toLocaleString('pt-BR') || payload?.[0]?.value?.toLocaleString('pt-BR')}
          </p>
          {data?.percentage && (
            <p className="text-sm text-popover-foreground">
              Percentual: {data?.percentage}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'age':
        return (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="range" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000)?.toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="listeners" 
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'gender':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="listeners"
                    label={({ gender, percentage }) => `${gender}: ${percentage}%`}
                    labelLine={false}
                    fontSize={12}
                  >
                    {genderData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {genderData?.map((item) => (
                <div key={item?.gender} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item?.color }} />
                    <span className="text-sm font-medium text-foreground">{item?.gender}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {item?.listeners?.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-muted-foreground">{item?.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'device':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="listeners"
                    label={({ device, percentage }) => `${device}: ${percentage}%`}
                    labelLine={false}
                    fontSize={12}
                  >
                    {deviceData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {deviceData?.map((item) => (
                <div key={item?.device} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item?.color }} />
                    <span className="text-sm font-medium text-foreground">{item?.device}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {item?.listeners?.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-muted-foreground">{item?.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'time':
        return (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="hour" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000)?.toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="listeners" 
                  fill="var(--color-accent)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        <Button
          variant={activeTab === 'age' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('age')}
          className="mb-2"
        >
          Faixa Etária
        </Button>
        <Button
          variant={activeTab === 'gender' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('gender')}
          className="mb-2"
        >
          Gênero
        </Button>
        <Button
          variant={activeTab === 'device' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('device')}
          className="mb-2"
        >
          Dispositivo
        </Button>
        <Button
          variant={activeTab === 'time' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('time')}
          className="mb-2"
        >
          Horário
        </Button>
      </div>

      {/* Chart Content */}
      {renderContent()}
    </div>
  );
};

export default DemographicsChart;