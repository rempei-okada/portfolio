import { fetchFromNewt, NewtSearchResponse, NewtImage } from "./newt";

/**
 * Define interface for photo item
 */
export interface PhotoItem {
  _id: string;
  _sys: {
    createdAt: string;
    updatedAt: string;
    customOrder: number;
    raw: {
      createdAt: string;
      updatedAt: string;
      firstPublishedAt: string;
      publishedAt: string;
    }
  };
  title: string;
  images: NewtImage[];
  descriptionHtml: string;
}

/**
 * Define a simpler interface for listing photos
 */
export interface PhotoListItem {
  _id: string;
  title: string;
  images: NewtImage[];
  descriptionHtml: string;
}

/**
 * Fetches detailed information for a specific photo
 */
export async function fetchPhotoDetails(photoId: string): Promise<PhotoItem> {
  const endpoint = `photo/${photoId}`;
  return fetchFromNewt<PhotoItem>(endpoint);
}

/**
 * Fetches a simplified list of photos for preview (server-side)
 * This function can be used in getStaticProps for SSG
 */
export async function fetchPhotosList(): Promise<PhotoListItem[]> {
  try {
    const endpoint = 'photo?select=_id,title,images,descriptionHtml&order=-_sys.customOrder&limit=100';
    const response = await fetchFromNewt<NewtSearchResponse<PhotoListItem>>(endpoint);
    return response.items;
  } catch (error) {
    console.error('Error fetching photos for SSG:', error);
    return [];
  }
}

