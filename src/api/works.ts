import { fetchFromNewt, NewtSearchResponse, NewtImage } from './newt';

/**
 * Fetches a simplified list of works for preview
 */
export async function fetchWorksList(): Promise<WorkListItem[]> {
  const endpoint = 'works?select=_id,title,thumbnail,summery,category';
  const response = await fetchFromNewt<NewtSearchResponse<WorkItem>>(endpoint);
  return response.items;
}

/**
 * Fetches detailed information for a specific work
 */
export async function fetchWorkDetails(workId: string): Promise<WorkItem> {
  const endpoint = `works/${workId}`;
  return fetchFromNewt<WorkItem>(endpoint);
}


// Define interface for work item
export interface WorkItem {
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
  thumbnail: NewtImage;
  summery: string;
  content: string;
  images: NewtImage[];
  stack: string;
  roles: string[];
  category: string[];
  url?: {
    html: string;
    url: string;
  };
}

// Define a simpler interface for listing works
export interface WorkListItem {
  _id: string;
  title: string;
  thumbnail: NewtImage | null;
  summery: string;
  category: string[];
}

