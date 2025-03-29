// Base configuration for Newt API
const NEWT_CDN_API_BASE = 'https://portfolio-okd.cdn.newt.so/v1/portfolio';
const NEWT_API_TOKEN = '8PClGqfTTiAaPWPknZidEuTLcH2r7gntjeYWu6GX7GM';

/**
 * Creates headers for Newt API requests
 */
export const getNewtHeaders = () => ({
  'Authorization': `Bearer ${NEWT_API_TOKEN}`,
  'Content-Type': 'application/json',
});

/**
 * Generic fetch function for Newt API calls
 */
export async function fetchFromNewt<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${NEWT_CDN_API_BASE}/${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: getNewtHeaders(),
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// Define interface for the Newt API response
export interface NewtSearchResponse<TModel> {
  skip: number;
  limit: number;
  total: number;
  items: TModel[];
}

export interface NewtItemResponse {
  _id: string;
}

// Define interface for Newt image
export interface NewtImage {
  _id: string;
  src: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  width: number;
  height: number;
  title: string;
  altText: string;
  description: string;
  metadata: Record<string, any>;
}