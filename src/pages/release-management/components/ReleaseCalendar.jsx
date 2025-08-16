import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReleaseCalendar = ({ releases, onReschedule, onViewRelease }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week

  // Get calendar data
  const getCalendarData = () => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days?.push(new Date(current));
      current?.setDate(current?.getDate() + 1);
    }
    
    return days;
  };

  const getReleasesForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return releases?.filter(release => {
      const releaseDate = new Date(release.releaseDate)?.toISOString()?.split('T')?.[0];
      return releaseDate === dateStr;
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(newDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const formatMonthYear = (date) => {
    return date?.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date?.getMonth() === currentDate?.getMonth();
  };

  const calendarDays = getCalendarData();
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">
            Calendário de Lançamentos
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Mês
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Semana
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(-1)}
            iconName="ChevronLeft"
            iconSize={16}
          />
          <span className="text-lg font-medium text-foreground min-w-48 text-center">
            {formatMonthYear(currentDate)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(1)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week Day Headers */}
        {weekDays?.map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays?.map((day, index) => {
          const dayReleases = getReleasesForDate(day);
          const isCurrentMonthDay = isCurrentMonth(day);
          const isTodayDay = isToday(day);

          return (
            <div
              key={index}
              className={`min-h-24 p-2 border border-border/50 ${
                isCurrentMonthDay ? 'bg-background' : 'bg-muted/20'
              } ${isTodayDay ? 'ring-2 ring-primary' : ''}`}
            >
              <div className={`text-sm font-medium mb-1 ${
                isCurrentMonthDay ? 'text-foreground' : 'text-muted-foreground'
              } ${isTodayDay ? 'text-primary' : ''}`}>
                {day?.getDate()}
              </div>
              {dayReleases?.length > 0 && (
                <div className="space-y-1">
                  {dayReleases?.slice(0, 2)?.map((release) => (
                    <div
                      key={release?.id}
                      className="bg-primary/10 border border-primary/20 rounded p-1 cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => onViewRelease(release)}
                    >
                      <div className="flex items-center space-x-1">
                        <Image
                          src={release?.artwork}
                          alt={release?.title}
                          className="w-4 h-4 rounded object-cover"
                        />
                        <span className="text-xs text-foreground truncate">
                          {release?.title}
                        </span>
                      </div>
                    </div>
                  ))}
                  {dayReleases?.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{dayReleases?.length - 2} mais
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Calendar Legend */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-sm text-muted-foreground">Lançamentos Agendados</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-primary rounded"></div>
            <span className="text-sm text-muted-foreground">Hoje</span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Total de lançamentos este mês: {releases?.filter(release => {
            const releaseDate = new Date(release.releaseDate);
            return releaseDate?.getMonth() === currentDate?.getMonth() && 
                   releaseDate?.getFullYear() === currentDate?.getFullYear();
          })?.length}
        </div>
      </div>
    </div>
  );
};

export default ReleaseCalendar;