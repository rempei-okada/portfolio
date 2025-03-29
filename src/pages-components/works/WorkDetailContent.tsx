import React from 'react';
import { Dialog } from '@headlessui/react';
import WorkGallery from './WorkGallery';
import WorkMetadata from './WorkMetadata';
import { WorkItem } from '@/api/works';

interface WorkDetailContentProps {
    work: WorkItem;
    onClose: () => void;
}

export const WorkDetailContent = ({ work, onClose }: WorkDetailContentProps) => {
    return (
        <>
            <div className="flex justify-between items-start mb-6">
                <Dialog.Title className="text-2xl font-medium text-ai">
                    {work.title}
                </Dialog.Title>
                <button 
                    onClick={onClose}
                    className="text-nezumi hover:text-akane transition-colors"
                    aria-label="閉じる"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            {/* Main Image (Thumbnail) */}
            {work.thumbnail && (
                <div className="mb-8 overflow-hidden rounded">
                    <img 
                        src={work.thumbnail.src} 
                        alt={work.thumbnail.altText || work.title} 
                        className="w-full h-auto object-cover"
                    />
                </div>
            )}
            
            {/* Content */}
            <section className="mb-8">
                <h3 className="text-lg font-medium text-sumi mb-4">詳細</h3>
                <div 
                    className="prose text-font1 max-w-none" 
                    dangerouslySetInnerHTML={{ __html: work.content }}
                />
            </section>
            
            {/* Additional Work Gallery */}
            <WorkGallery images={work.images} title={work.title} />
            
            {/* Work Metadata */}
            <WorkMetadata work={work} />
        </>
    );
};

export default WorkDetailContent;