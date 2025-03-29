
export interface News {
    date: string;
    title: string;
    image: string;
    id:string;
}

export const newsItems: News[] = [
    {
        id: "1",
        date: "2024.08.07",
        title: "新しい飲食店コンサルティングサービス「レストラン成功の道」開始",
        image: "/images/news/consulting-service.jpg"
    },
    {
        id: "2",
        date: "2024.07.25",
        title: "夏季限定！飲食店開業セミナーを開催します",
        image: "/images/news/summer-seminar.jpg"
    },
    {
        id: "3",
        date: "2024.07.10",
        title: "成功事例：「和風居酒屋 匠」が月商1000万円を達成",
        image: "/images/news/success-story-izakaya.jpg"
    },
    {
        id: "4",
        date: "2024.06.30",
        title: "新規取引先「グルメフードサプライ株式会社」との提携を発表",
        image: "/images/news/new-partnership.jpg"
    },
    {
        id: "5",
        date: "2024.06.15",
        title: "飲食店向けDX推進サービスをリリースしました",
        image: "/images/news/dx-service.jpg"
    },
    {
        id: "6",
        date: "2024.06.01",
        title: "「第10回 飲食業界イノベーションアワード」で当社が金賞を受賞",
        image: "/images/news/award-winning.jpg"
    },
];
