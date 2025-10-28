export interface IPost {
    id: number;
    title: string;
    body: string;
    image: string | null;
    video: string | null;
    video_url: string;
    created_at: string;
    user_id: number;
    user_name: string;
    topic_id: number;
    topic_name: string;
}