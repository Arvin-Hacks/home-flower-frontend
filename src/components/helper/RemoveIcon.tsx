// src/components/RemoveIcon.tsx
import React from 'react';
import { X } from 'lucide-react';

interface RemoveIconProps {
  onClick: () => void;
}

const RemoveIcon: React.FC<RemoveIconProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="relative bottom-20 left-6 bg-red-600 rounded-full p-1">
      <X className="h-4 w-4 text-white" />
    </button>
  );    
};

export default RemoveIcon;
