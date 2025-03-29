'use client';

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { SectionType1 } from "@/components/SectionType1";
import { fetchWorksList, fetchWorkDetails, WorkListItem, WorkItem } from "@/api/works";

// Import extracted components
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import WorksGrid from "./WorksGrid";
import WorkDetailDialog from "./WorkDetailDialog";

// Main WorksSection component
export const WorksSection = ({ initialWorks = [] }: { initialWorks?: WorkListItem[] }) => {
    const element = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start start", "end end"]
    });

    const [position, setPosition] = useState(0)
    useMotionValueEvent(scrollYProgress, "change", v => {
        setPosition(v)
    })

    // State for works data
    const [works, setWorks] = useState<WorkListItem[]>(initialWorks);
    const [loading, setLoading] = useState(initialWorks.length === 0);
    const [error, setError] = useState<string | null>(null);
    
    // State for selected work and dialog
    const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);

    // Load works if none were provided as props
    useState(() => {
        if (initialWorks.length === 0) {
            async function loadWorks() {
                try {
                    setLoading(true);
                    const data = await fetchWorksList();
                    setWorks(data);
                } catch (err) {
                    console.error('Error fetching works:', err);
                    setError(err instanceof Error ? err.message : 'An unknown error occurred');
                } finally {
                    setLoading(false);
                }
            }
            loadWorks();
        }
    });

    // Function to fetch work details when a work is selected
    const handleWorkClick = async (workId: string) => {
        if (detailLoading) return;
        
        try {
            setDetailLoading(true);
            const data = await fetchWorkDetails(workId);
            setSelectedWork(data);
            setIsDialogOpen(true);
        } catch (err) {
            console.error('Error fetching work details:', err);
            alert('詳細の取得に失敗しました');
        } finally {
            setDetailLoading(false);
        }
    };

    // Function to close the dialog
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <SectionType1 className="bg-paper2">
                <div className="container mx-auto" ref={element}>
                    <section className="p-4 md:p-8 w-full">
                        <header className="mb-12 md:mb-16">
                            <div className="relative mb-8">
                                <h1 className="text-3xl md:text-4xl font-serif text-font1">作品集</h1>
                                <div className="absolute bottom-0 left-0 w-16 h-1 bg-akane"></div>
                            </div>

                            <div className="max-w-2xl">
                                <p className="leading-relaxed text-nezumi">
                                    余白と質素さを大切にした作品の数々。
                                    自然との調和を意識した制作プロセスから生まれる、
                                    非対称の美しさをご覧ください。
                                </p>
                            </div>
                        </header>

                        <div className="px-8 py-24 md:px-16 lg:px-32"
                            style={{ backgroundColor: 'rgba(179, 77, 77, 0.04)' }}>
                            <div className="max-w-5xl mx-auto">
                                {loading ? (
                                    <LoadingIndicator />
                                ) : error ? (
                                    <ErrorMessage message={`エラーが発生しました: ${error}`} />
                                ) : (
                                    <WorksGrid works={works} onSelectWork={handleWorkClick} />
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </SectionType1>

            <WorkDetailDialog 
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                work={selectedWork}
                loading={detailLoading}
            />
        </>
    );
};