import React from 'react';

const LoginBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      
      {/* Animated Music Notes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 animate-pulse">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        
        <div className="absolute bottom-32 left-1/4 animate-pulse delay-2000">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        
        <div className="absolute top-1/3 right-10 animate-pulse delay-3000">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10,8 16,12 10,16"/>
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-1/3 animate-pulse delay-4000">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10,8 16,12 10,16"/>
          </svg>
        </div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
  );
};

export default LoginBackground;