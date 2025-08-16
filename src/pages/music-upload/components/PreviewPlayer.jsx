import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PreviewPlayer = ({ audioFile, metadata }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio || !audioFile) return;

    const audioUrl = URL.createObjectURL(audioFile);
    audio.src = audioUrl;

    const handleLoadedMetadata = () => {
      setDuration(audio?.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio?.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio?.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio?.addEventListener('timeupdate', handleTimeUpdate);
    audio?.addEventListener('ended', handleEnded);

    return () => {
      audio?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio?.removeEventListener('timeupdate', handleTimeUpdate);
      audio?.removeEventListener('ended', handleEnded);
      URL.revokeObjectURL(audioUrl);
    };
  }, [audioFile]);

  const togglePlayPause = () => {
    const audio = audioRef?.current;
    if (!audio) return;

    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const audio = audioRef?.current;
    const progressBar = progressRef?.current;
    if (!audio || !progressBar) return;

    const rect = progressBar?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!audioFile) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="Music" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Nenhum arquivo selecionado</h3>
          <p className="text-muted-foreground">
            Faça upload de um arquivo de áudio para visualizar o player de preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Preview da Música</h3>
      <audio ref={audioRef} preload="metadata" />
      {/* Track Info */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Music" size={32} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-medium text-foreground truncate">
              {metadata?.title || audioFile?.name}
            </h4>
            <p className="text-muted-foreground truncate">
              {metadata?.artist || 'Artista não informado'}
            </p>
            <p className="text-sm text-muted-foreground">
              {metadata?.album && `${metadata?.album} • `}
              {(audioFile?.size / (1024 * 1024))?.toFixed(1)} MB
            </p>
          </div>
        </div>
      </div>
      {/* Player Controls */}
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div
            ref={progressRef}
            className="w-full h-2 bg-muted rounded-full cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg transition-all duration-100"
              style={{ left: `calc(${progressPercentage}% - 8px)` }}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (audioRef?.current) {
                audioRef.current.currentTime = Math.max(0, currentTime - 10);
              }
            }}
            iconName="RotateCcw"
          />
          
          <Button
            variant="default"
            size="lg"
            onClick={togglePlayPause}
            iconName={isPlaying ? "Pause" : "Play"}
            className="w-12 h-12 rounded-full"
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (audioRef?.current) {
                audioRef.current.currentTime = Math.min(duration, currentTime + 10);
              }
            }}
            iconName="RotateCw"
          />
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              iconName={volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"}
            />
            
            {showVolumeSlider && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-popover border border-border rounded-lg p-3 shadow-lg">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            )}
          </div>
          
          <span className="text-sm text-muted-foreground">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
      {/* Audio Quality Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm font-medium text-foreground">Formato</div>
            <div className="text-xs text-muted-foreground">
              {audioFile?.type?.split('/')?.[1]?.toUpperCase() || 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Tamanho</div>
            <div className="text-xs text-muted-foreground">
              {(audioFile?.size / (1024 * 1024))?.toFixed(1)} MB
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Duração</div>
            <div className="text-xs text-muted-foreground">
              {formatTime(duration)}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Status</div>
            <div className="text-xs text-success">Pronto para distribuição</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default PreviewPlayer;