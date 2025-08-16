import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicMap = ({ title = "Performance Geográfico" }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countryData = [
    { country: 'Brasil', code: 'BR', streams: 145200, revenue: 2840.50, growth: '+12.5%', flag: '🇧🇷' },
    { country: 'Estados Unidos', code: 'US', streams: 89600, revenue: 1890.20, growth: '+8.2%', flag: '🇺🇸' },
    { country: 'México', code: 'MX', streams: 67800, revenue: 1245.80, growth: '+15.3%', flag: '🇲🇽' },
    { country: 'Argentina', code: 'AR', streams: 54200, revenue: 980.40, growth: '+6.7%', flag: '🇦🇷' },
    { country: 'Portugal', code: 'PT', streams: 43100, revenue: 825.60, growth: '+9.1%', flag: '🇵🇹' },
    { country: 'Espanha', code: 'ES', streams: 38900, revenue: 742.30, growth: '+4.8%', flag: '🇪🇸' },
    { country: 'França', code: 'FR', streams: 32500, revenue: 658.90, growth: '+7.2%', flag: '🇫🇷' },
    { country: 'Alemanha', code: 'DE', streams: 28700, revenue: 589.40, growth: '+3.5%', flag: '🇩🇪' }
  ];

  const topCountries = countryData?.slice(0, 5);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Icon name="Globe" size={20} className="text-muted-foreground" />
      </div>
      {/* Map Placeholder */}
      <div className="relative mb-6">
        <div className="w-full h-64 bg-muted/20 rounded-lg border border-border flex items-center justify-center">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Global Music Performance Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=-14.2350,-51.9253&z=4&output=embed"
            className="rounded-lg"
          />
        </div>
        
        {/* Map Overlay with Country Markers */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-2">Top Países</div>
          <div className="space-y-1">
            {topCountries?.slice(0, 3)?.map((country) => (
              <div key={country?.code} className="flex items-center space-x-2 text-xs">
                <span className="text-base">{country?.flag}</span>
                <span className="text-foreground font-medium">{country?.country}</span>
                <span className="text-success">{country?.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Country Performance List */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground mb-3">Performance por País</h4>
        <div className="grid gap-3">
          {countryData?.map((country, index) => (
            <div
              key={country?.code}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-muted/20 ${
                selectedCountry === country?.code ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => setSelectedCountry(selectedCountry === country?.code ? null : country?.code)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-muted/30 rounded-full">
                  <span className="text-lg">{country?.flag}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{country?.country}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {country?.streams?.toLocaleString('pt-BR')} streams
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  R$ {country?.revenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className={`text-xs ${country?.growth?.startsWith('+') ? 'text-success' : 'text-error'}`}>
                  {country?.growth}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeographicMap;