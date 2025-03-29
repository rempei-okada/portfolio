import { WorkItem } from '@/api/works';
import React from 'react';

interface WorkMetadataProps {
    work: WorkItem;
}

export const WorkMetadata = ({ work }: WorkMetadataProps) => {
    return (
        <>
            {/* Roles */}
            {work.roles && work.roles.length > 0 && (
                <section className="mb-8">
                    <h3 className="text-lg font-medium text-sumi mb-4">担当</h3>
                    <div className="flex flex-wrap gap-2">
                        {work.roles.map((role, i) => (
                            <span key={i} className="bg-kinari text-sumi px-3 py-1 rounded-full text-sm">
                                {role}
                            </span>
                        ))}
                    </div>
                </section>
            )}
            
            {/* Tech Stack */}
            {work.stack && (
                <section className="mb-8">
                    <h3 className="text-lg font-medium text-sumi mb-4">技術スタック</h3>
                    <div 
                        className="prose text-font1 max-w-none" 
                        dangerouslySetInnerHTML={{ __html: work.stack }}
                    />
                </section>
            )}
            
            {/* URL Section */}
            {work.url && (
                <section className="mb-8">
                    <h3 className="text-lg font-medium text-sumi mb-4">リンク</h3>
                    <div className="mb-4">
                        <a 
                            href={work.url.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-ai hover:text-akane underline transition-colors"
                        >
                            {work.url.url}
                        </a>
                    </div>
                    {work.url.html && (
                        <div 
                            className="bg-paper1 p-4 rounded"
                            dangerouslySetInnerHTML={{ __html: work.url.html }}
                        />
                    )}
                </section>
            )}
            
            {/* Categories */}
            {work.category && work.category.length > 0 && (
                <section className="mb-6">
                    <h3 className="text-lg font-medium text-sumi mb-4">カテゴリ</h3>
                    <div className="flex flex-wrap gap-2">
                        {work.category.map((cat, i) => (
                            <span key={i} className="bg-akane/10 text-ai px-3 py-1 rounded text-sm">
                                {cat}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};

export default WorkMetadata;