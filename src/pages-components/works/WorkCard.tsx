import { WorkListItem } from '@/api/works';
import React from 'react';

interface WorkCardProps {
    work: WorkListItem;
    index: number;
    onClick: () => void;
}

export const WorkCard = ({ work, index, onClick }: WorkCardProps) => {
    return (
        <article 
            className={`relative p-6 bg-white bg-opacity-80 transform cursor-pointer border ${
                index % 2 === 0 ? 'rotate-1' : '-rotate-1'
            } ${
                index % 3 === 1 ? 'md:mt-8' : ''
            }`}
            onClick={onClick}
        >
            {work.thumbnail && (
                <div className="mb-4 overflow-hidden">
                    <img 
                        src={work.thumbnail.src} 
                        alt={work.thumbnail.altText || work.title} 
                        className="w-full h-48 object-cover hover:scale-105 transition-transform"
                    />
                </div>
            )}
            <h3 className="text-xl mb-4 font-medium text-ai">{work.title}</h3>
            {work.summery && (
                <p className="leading-relaxed mb-6 text-font1">
                    {work.summery}
                </p>
            )}
            {work.category && work.category.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {work.category.map((cat, i) => (
                        <span key={i} className="text-xs bg-akane/10 text-ai px-2 py-1 rounded">
                            {cat}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
};

export default WorkCard;