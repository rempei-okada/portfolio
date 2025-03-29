import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaCloud, FaLaptopCode, FaServer } from "react-icons/fa";

import type { JSX } from "react";

export const siteName = "Renpei Okada"

export const TopProfile1 = () => <>
    広島県尾道市出身のエンジニア、{siteName}です。 <br />
    モノ作りの精神をもとに多彩な技術を提供します.
</>

export const TopProfile2 = () => <>
    高校を卒業後、地元の大学に進学し情報科学を専攻。<br/>
    新卒で大阪の医療系システムメーカーに入社し医療系システムの開発に従事。<br/>
</>

export const TopProfile3 = () => <>
    コールセンター向けSaasメーカーに転職後はフロントエンドチームのリーダーおよび開発部主任を経験。<br/>
    その後、地元のスタートアップ企業にUターン就職し幅広い開発業務の経験を経てフリーランスとして独立しました。<br/><br/>
</>

export const Profile1 = () => <>
    高校を卒業後、地元の大学に進学し情報科学を専攻。<br/>
    新卒で大阪の医療系システムメーカーに入社し医療系システムの開発に従事。<br/>
    コールセンター向けSaasメーカーに転職後はフロントエンドチームのリーダーおよび開発部主任を経験。<br/>
    その後、地元のスタートアップ企業にUターン就職し幅広い開発業務の経験を経てフリーランスとして独立しました。<br/><br/>


    学生時代からものづくりが好きで、趣味でプログラミング、ゲーム制作、機械学習などに勤しんでいました。<br/>

    フロントエンド、バックエンド、<br/>
    デスクトップアプリ、スマホアプリの開発を得意としています。<br/>

    幅広く目的に合わせた技術選定を行い様々な言語を経験してきましたが、<br/>
    TypescriptまたはC#での開発が得意です。<br/>
    特にC#に関しては日々最新情報や言語使用を追いかけており、<br/>
    Web、ネイティブアプリ、ゲーム問わず趣味では基本的にはC#で開発しています。<br/>
</>

export const resources ={

    email:"renpei.okada@outlook.com"
}

export interface Category {
    name: string;
    items: string[];
}

export interface Section {
    title: string;
    description?: string;
    icon: JSX.Element;
    categories: Category[];
}


export const sections: Section[] = [
    {
        title: 'WEBフロントエンド',
        icon: <FaLaptopCode className="inline-block mr-2" />,
        categories: [
            {
                name: '基本技術',
                items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
            },
            {
                name: 'フレームワーク・ライブラリ',
                items: ['React', 'Angular', 'Vue.js', 'Svelte', 'Ember.js'],
            },
            {
                name: 'スタイリング',
                items: ['Sass / SCSS', 'Less', 'Tailwind CSS', 'Bootstrap', 'Material-UI'],
            },
            {
                name: 'ビルドツール・バンドラー',
                items: ['Webpack', 'Parcel', 'Vite', 'Rollup'],
            },
            {
                name: 'その他',
                items: ['Next.js', 'Nuxt.js', 'Gatsby', 'Redux', 'MobX'],
            },
        ],
    },
    {
        title: 'WEBバックエンド',
        icon: <FaServer className="inline-block mr-2" />,
        categories: [
            {
                name: 'プログラミング言語',
                items: ['JavaScript / Node.js', 'TypeScript', 'Python', 'Ruby', 'Java', 'C#', 'PHP', 'Go', 'Rust'],
            },
            {
                name: 'フレームワーク',
                items: ['Express.js', 'Django', 'Flask', 'Ruby on Rails', 'Spring Boot', 'ASP.NET Core', 'Laravel', 'Gin', 'FastAPI'],
            },
            {
                name: 'API技術',
                items: ['RESTful API', 'GraphQL', 'gRPC'],
            },
            {
                name: 'データベース',
                items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis', 'Firebase Realtime Database', 'Cassandra'],
            },
            {
                name: 'その他',
                items: ['Docker', 'Kubernetes', 'JWT', 'OAuth 2.0'],
            },
        ],
    },
    {
        title: 'Cloud',
        icon: <FaCloud className="inline-block mr-2" />,
        categories: [
            {
                name: 'コンピューティング',
                items: ['Azure App Service', 'Azure Functions', 'Azure Virtual Machines', 'Azure Kubernetes Service (AKS)'],
            },
            {
                name: 'データベース・ストレージ',
                items: ['Azure SQL Database', 'Azure Cosmos DB', 'Azure Blob Storage', 'Azure Table Storage', 'Azure Cache for Redis'],
            },
            {
                name: 'ネットワーキング',
                items: ['Azure CDN', 'Azure Virtual Network', 'Azure API Management'],
            },
            {
                name: '開発・デプロイメント',
                items: ['Azure DevOps', 'Azure Pipelines', 'Azure Repos', 'Azure Artifacts'],
            },
            {
                name: 'セキュリティ',
                items: ['Azure Active Directory', 'Azure Key Vault', 'Azure Security Center'],
            },
            {
                name: '監視・分析',
                items: ['Azure Monitor', 'Azure Application Insights', 'Azure Log Analytics'],
            },
            {
                name: 'その他のサービス',
                items: ['Azure Logic Apps', 'Azure Event Hubs', 'Azure Service Bus'],
            },
        ],
    },
];
