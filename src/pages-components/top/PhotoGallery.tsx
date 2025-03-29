'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { SectionType1 } from '@/components/SectionType1';
import { Section1Title } from '@/components/Section1Title';
import Image from 'next-export-optimize-images/picture';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useWindowsSize } from '@/libs/useWindowSize';

// 型定義
export interface PhotoImage {
    src: string;
    altText?: string;
    title?: string;
    description?: string;
    width?: number;  // 画像の実際の幅
    height?: number; // 画像の実際の高さ
    aspectRatio?: number; // アスペクト比
}

export interface PhotoListItem {
    _id: string;
    title: string;
    descriptionHtml?: string;
    images: PhotoImage[];
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const generateGridLayout = (images: PhotoImage[], screenSize: string) => {
    // Generate initial positions and dimensions based on aspect ratio
    const layouts = images.map((image, imgIndex) => {
        // Calculate aspect ratio with fallbacks
        const aspectRatio = image.width && image.height 
            ? image.width / image.height 
            : image.aspectRatio || 1.5;
        
        // Classification based on aspect ratio
        const isWide = aspectRatio > 1.5;
        const isTall = aspectRatio < 0.7;
        const isSquarish = !isWide && !isTall;
        
        let w = 1, h = 1, x = 0, y = 0;
        
        // Size allocation based on screen size and aspect ratio
        switch (screenSize) {
            case 'lg':

                    if(aspectRatio > 2.5) {
                        w = 4;
                        h = 1;
                    }
                    else if (aspectRatio > 1.5) {
                        w = 3;
                        h = 1;
                    } 
                    else if (aspectRatio > 1) {
                        w = 2;
                        h = 1;
                    }
                    else if (aspectRatio > 0.95 && aspectRatio < 1.05) {
                        w = 1;
                        h = 1;
                    } 
                    else  {
                        w = 2;
                        h = 2;
                    }

                break;
                
            case 'md':
                if (isWide) {
                    w = Math.min(8, Math.max(4, Math.round(aspectRatio * 2)));
                    h = 2;
                } else if (isTall) {
                    w = 3;
                    h = 4;
                } else {
                    w = 4;
                    h = 3;
                }
                break;
                
            case 'sm':
                if (isWide) {
                    w = 6;
                    h = 2;
                } else if (isTall) {
                    w = 3;
                    h = 4;
                } else {
                    w = 3;
                    h = 3;
                }
                break;
                
            case 'xs':
                w = 6;
                h = isWide ? 2 : (isTall ? 4 : 3);
                break;
        }
        
        return { 
            i: `${imgIndex}`, 
            w, 
            h, 
            x, 
            y, 
            static: false 
        };
    });
    
    return layouts;
};

interface PhotoGalleryProps {
    photos?: PhotoListItem[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos = [] }) => {
    const galleryPhotos = photos;
    const { innerWidth } = useWindowsSize();


    return (
        <SectionType1 className="bg-paper1">
            <div className="justify-start flex flex-col items-start gap-1 sm:gap-2 md:gap-3 w-full">
                <Section1Title title="Gallery" subTitle="作品集" />

                <p className="text-nezumi max-w-2xl mt-6 leading-relaxed">
                    余白と質素さを大切にした作品の数々。
                    自然との調和を意識した制作プロセスから生まれる、
                    非対称の美しさをご覧ください。
                </p>

                {/* Gallery grid with React Grid Layout */}
                <div className="w-full">
                    <div className="space-y-24">
                        {galleryPhotos.map((photo) => {
                            return (
                                <div key={photo._id} className="mb-16">
                                    <h3 className="text-2xl font-medium mb-4 text-title1">{photo.title}</h3>

                                    {/* Description with HTML */}
                                    {photo.descriptionHtml && (
                                        <div
                                            className="prose prose-sm mb-6"
                                            dangerouslySetInnerHTML={{ __html: photo.descriptionHtml }}
                                        />
                                    )}

                                    {/* Images with React Grid Layout */}
                                    {photo.images.length > 0 && (
                                        <PhotoGalleryChild  photo={photo}/>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </SectionType1>
    );
};

const PhotoGalleryChild = ({ photo}: {
    photo: PhotoListItem
}) => {
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted before rendering grid layout (client-side only)
    useEffect(() => {
        setMounted(true);
    }, []);

    const photos = photo?.images ?? [];

    // Preprocess images to ensure they all have an aspect ratio
    const processedPhotos = useMemo(() => {
        return photos.map(img => {
            const aspectRatio = img.width && img.height 
                ? img.width / img.height 
                : img.aspectRatio || 1.5;
            
            return {
                ...img,
                aspectRatio
            };
        });
    }, [photos]);

    // useMemoを使用してレイアウトの計算を最適化
    const layouts = () => ({
        lg: generateGridLayout(processedPhotos, 'lg'),
        md: generateGridLayout(processedPhotos, 'md'),
        sm: generateGridLayout(processedPhotos, 'sm'),
        xs: generateGridLayout(processedPhotos, 'xs')
    });

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={layouts()}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
            cols={{ lg: 12, md: 8, sm: 6, xs: 6 }}
            rowHeight={200}
            compactType="horizontal" 
            preventCollision={false}
            autoSize
            margin={[12, 12]}
            containerPadding={[0, 0]}
            useCSSTransforms={mounted}
            isDraggable={false}
            isResizable={false}
            onLayoutChange={(layout) => {
                // Optional: You can save the layout if needed
            }}
        >
            {processedPhotos.map((image, imgIndex) => (
                <div
                    key={`${imgIndex}`}
                    className="group relative overflow-hidden border-[0.1rem] border-sumi transition-transform duration-500 bg-white bg-opacity-50 hover:shadow-lg"
                    style={{
                        transform: `rotate(${imgIndex % 2 === 0 ? '-0.5deg' : '0.5deg'})`,
                        transition: 'transform 0.5s ease-in-out'
                    }}
                >
                    <Image
                        src={image.src}
                        alt={image.altText || photo.title}
                        width={image.width || 800}
                        height={image.height || 600}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={imgIndex === 0}
                        loading={imgIndex === 0 ? "eager" : "lazy"}
                    />

                    {/* Image title overlay */}
                    {image.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-white text-sm block">
                                {image.title}
                            </span>
                            {image.description && (
                                <span className="text-white/80 text-xs mt-1 block">
                                    {image.description}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </ResponsiveGridLayout>
    );
}
