// src/components/Icon.tsx
import React from 'react';

interface IconProps {
  name: string;
  width: number;
  height: number;
}

const Icon: React.FC<IconProps> = ({ name, width, height }) => {
  const iconPath = `/public/assets/icons/${name}.svg`;

  return <img src={iconPath} alt={name} width={width} height={height} />;
};

export default Icon;
