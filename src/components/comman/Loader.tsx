// LoadingIcon.tsx
import React from 'react';

const LoadingIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = 'blue' }) => {
  return (
    <div className={`flex items-center justify-center h-${size} w-${size}`}>
      <div className={`relative inline-block w-${size}`}>
        <div className={`absolute top-0 left-0 inline-block w-full h-full bg-${color}-200 rounded-full opacity-75 animate-ping`}></div>
        <div className={`relative inline-block w-full h-full bg-${color}-500 rounded-full animate-bounce`}></div>
      </div>
    </div>
  );
};

export default LoadingIcon;


// export default LoadingIcon;
