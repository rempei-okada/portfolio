import { PhotoGallery } from "@/pages-components/top/PhotoGallery";
import { fetchPhotosList } from "@/api/gallery";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ギャラリー | 岡田 恋平',
  description: '岡田恋平の作品ギャラリーページです。様々な写真作品をご覧いただけます。',
  keywords: ['ギャラリー', '写真', '作品集', 'ポートフォリオ'],
};

// ビルド時にデータを取得
async function getData() {
  const photos = await fetchPhotosList();
  return {
    photos
  };
}

export default async function GalleryPage() {
  const data = await getData();
  
  return (
    <div className="min-h-screen font-sans bg-paper1">
      <PhotoGallery photos={data.photos} />
    </div>
  );
}