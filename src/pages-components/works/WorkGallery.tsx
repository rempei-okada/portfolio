import { NewtImage } from '@/api/newt';
import React from 'react';

interface WorkGalleryProps {
    images: NewtImage[];
    title: string;
}

export const WorkGallery = ({ images, title }: WorkGalleryProps) => {
    if (!images || images.length === 0) return null;
    
    return (
        <section className="mb-8">
            <h3 className="text-lg font-medium text-sumi mb-4">ギャラリー</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((image, index) => (
                    <div key={image._id} className="overflow-hidden rounded">
                        <img 
                            src={image.src} 
                            alt={image.altText || `${title} image ${index + 1}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkGallery;