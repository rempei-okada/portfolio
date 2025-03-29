import { createClient } from "microcms-js-sdk"

export const client = createClient({
    serviceDomain: "renpei-okada",
    apiKey: "2ONOlBD38EqQaKMI4xUJgXUI8mFa8SxWSVv4",
});

export const fetchWork = async (id: string): Promise<Work> => {
    const response = await client.get<Work>({
        endpoint: "works",
        contentId: id,
    });

    return {
        id: response.id,
        createdAt: new Date(response.createdAt),
        updatedAt: new Date(response.updatedAt),
        publishedAt: new Date(response.publishedAt),
        revisedAt: new Date(response.revisedAt),
        title: response.title,
        summary: response.summary,
        stack: response.stack,
        role: response.role,
        category: response.category,
        body: response.body,
        date: response.date,
        images: response.images,
    }
}

export const fetchWorks = async (): Promise<WorkMeta[]> => {
    const response = await client.getList<WorkMeta>({
        endpoint: "works",
        queries: {
            limit: 10,
            fields: "id,title,summary,stack,role,category,thumbnail",
        }
    });

    return response.contents.map<WorkMeta>(content => ({
        id: content.id,
        publishedAt: new Date(content.publishedAt),
        title: content.title,
        summary: content.summary,
        stack: content.stack,
        role: content.role,
        category: content.category,
        createdAt: new Date(content.createdAt),
        updatedAt: new Date(content.updatedAt),
        revisedAt: new Date(content.revisedAt),
        thumbnail: content.thumbnail ?? null,
    }))
}

export type WorkMeta = {
    id: string;
    createdAt: Date; // ISO date string
    updatedAt: Date; // ISO date string
    publishedAt: Date; // ISO date string
    revisedAt: Date; // ISO date string
    title: string;
    thumbnail: Image | null;
    summary: string;
    stack: string;
    role: string[]; // Array of roles
    category: string[]; // Array of categories
};


export type Work = {
    id: string;
    createdAt: Date; // ISO date string
    updatedAt: Date; // ISO date string
    publishedAt: Date; // ISO date string
    revisedAt: Date; // ISO date string
    title?: string;
    thumbnail?: Image;
    summary?: string;
    body?: string; // HTML string
    images?: Image[]; // Assuming it's an array of image URLs or empty
    stack?: string;
    role?: string[]; // Array of roles
    category?: string[]; // Array of categories
    date?: string; // Duration or date range as a string
};

type Image = {
    url: string,
    height: number,
    width: number
}
