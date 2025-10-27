export interface IPost {
    id: number;
    title: string;
    body?: string;
    image?: string | File | null;
    video?: string | File | null;
    video_url?: string | null;
    created_at: string;
    user: number;
    user_name?: string;
    topic: number;
    topic_name?: string;
    has_media?: boolean;
}