import React, {useEffect} from "react";
import {useLazyGetPostsQuery} from "../../../services/postService.ts";
import PostCard from "../../../components/cards/PostCard.tsx";
import LoadingScreen from "../../../components/loadings/LoadingScreen.tsx";

const PostListPage: React.FC = () => {
    const [loadPosts, {data: posts, isLoading, error}] = useLazyGetPostsQuery();

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    if (isLoading) return <LoadingScreen/>;
    if (error) return <div className="p-8 text-red-500 text-center">Помилка при завантаженні постів</div>;
    if (!posts?.length) return <div className="p-8 text-gray-400 text-center">Поки що немає постів</div>;

    return (
        <div className="bg-gray-100 min-h-screen py-6 dark:bg-gray-900">
            <div className="max-w-3xl mx-auto space-y-5">
                {posts.map(post => (
                    <PostCard key={post.id} post={post}/>
                ))}
            </div>
        </div>
    );
};

export default PostListPage;