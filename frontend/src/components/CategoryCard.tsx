// src/components/CategoryCard.tsx
import React from 'react';
import { CatItem } from './CategorySection';

export interface CategoryCardProps {
  item: CatItem;
  onClick: (item: CatItem) => void;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  item,
  onClick,
  className = '',
}) => (
  <div
    className={`card card-compact bg-base-100 image-full w-64 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 ${className}`}
    onClick={() => onClick(item)}
  >
    <figure className="h-32 overflow-hidden">
      <img
        src={item.icon}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </figure>
    <div className="card-body items-center text-center">
      <h3 className="card-title text-lg">{item.name}</h3>
    </div>
  </div>
);
