import React from 'react';
import { WorkCard } from './WorkCard';
import { WorkListItem } from '@/api/works';

interface WorksGridProps {
    works: WorkListItem[];
    onSelectWork: (id: string) => void;
}

export const WorksGrid = ({ works, onSelectWork }: WorksGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {works.map((work, index) => (
                <WorkCard
                    key={work._id}
                    work={work}
                    index={index}
                    onClick={() => onSelectWork(work._id)}
                />
            ))}
        </div>
    );
};

export default WorksGrid;