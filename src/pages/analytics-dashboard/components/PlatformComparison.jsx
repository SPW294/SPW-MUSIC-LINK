import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PlatformComparison = ({ title = "Comparação de Plataformas" }) => {
  const platformData = [
    { platform: 'Spotify', streams: 285600, revenue: 5420.80, share: 35.2, color: '#1DB954' },
    { platform: 'YouTube Music', streams: 234800, revenue: 3890.40, share: 28.9, color: '#FF0000' },
    { platform: 'Apple Music', streams: 156200, revenue: 4680.60, share: 19.3, color: '#FA57C1' },
    { platform: 'Deezer', streams: 89400, revenue: 1780.20, share: 11.0, color: '#FEAA2D' },
    { platform: 'TikTok', streams: 67800, revenue: 890.50, share: 8.4, color: '#25F4EE' },
    { platform: 'Amazon Music', streams: 45200, revenue: 1240.80, share: 5.6, color: '#00A8E1' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          <p className="text-sm text-popover-foreground">
            Streams: {data?.streams?.toLocaleString('pt-BR')}
          </p>
          <p className="text-sm text-popover-foreground">
            Receita: R$ {data?.revenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-popover-foreground">
            Participação: {data?.share}%
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground">{data?.platform}</p>
          <p className="text-sm text-popover-foreground">{data?.share}% do total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart - Streams por Plataforma */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Streams por Plataforma</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="platform" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000)?.toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="streams" 
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Participação de Mercado */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Participação de Mercado</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="share"
                  label={({ platform, share }) => `${platform}: ${share}%`}
                  labelLine={false}
                  fontSize={10}
                >
                  {platformData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Platform Details Table */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Detalhes por Plataforma</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Plataforma</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Streams</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Receita</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Participação</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">RPM*</th>
              </tr>
            </thead>
            <tbody>
              {platformData?.map((platform, index) => (
                <tr key={platform?.platform} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: platform?.color }}
                      />
                      <span className="font-medium text-foreground">{platform?.platform}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 text-foreground">
                    {platform?.streams?.toLocaleString('pt-BR')}
                  </td>
                  <td className="text-right py-3 px-4 text-foreground">
                    R$ {platform?.revenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="text-right py-3 px-4 text-foreground">
                    {platform?.share}%
                  </td>
                  <td className="text-right py-3 px-4 text-foreground">
                    R$ {(platform?.revenue / platform?.streams * 1000)?.toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          *RPM = Receita por Mil streams
        </p>
      </div>
    </div>
  );
};

export default PlatformComparison;