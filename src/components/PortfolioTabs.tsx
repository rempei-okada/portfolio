'use client';

import { useState } from "react";
import { ComponentType } from "react";

interface Tab {
    id: string;
    name: string;
    component: ComponentType;
}

interface PortfolioTabsProps {
    tabs: Tab[];
}

export const PortfolioTabs = ({ tabs }: PortfolioTabsProps) => {
    const [currentTab, setCurrentTab] = useState('profile');

    return (
        <div>
            {/* Header section */}
            <header className="p-4 bg-paper1 border-b border-nezumi/20 sticky top-0 z-50 md:space-y-8 md:p-12">
                <div className="flex items-baseline md:flex-col">
                    <h1 className="text-3xl md:text-5xl tracking-widest">
                        岡田 恋平
                    </h1>
                    <p className="text-xl md:text-2xl ml-4 md:mt-8 tracking-wider mt-2 text-nezumi">
                        Renpei Okada
                    </p>
                </div>

                {/* Tab navigation */}
                <nav className="">
                    <ul className="flex gap-1 sm:gap-2 md:gap-6 flex-wrap">
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setCurrentTab(tab.id)}
                                    className={`text-sm relative px-1 py-2 transition-colors duration-300 text-font1 rounded-sm ${currentTab === tab.id ? 'font-medium border-b-2 border-akane' : 'opacity-60 border-b border-transparent'}`}
                                >
                                    {tab.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <main className="">
                {currentTab && tabs.find(tab => tab.id === currentTab)?.component && (
                    <div>
                        {/* 動的に選択されたコンポーネントをレンダリング */}
                        {(() => {
                            const Component = tabs.find(tab => tab.id === currentTab)?.component || tabs[0].component;
                            return <Component />;
                        })()}
                    </div>
                )}
            </main>
        </div>
    );
};