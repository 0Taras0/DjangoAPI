import {useLazyGetUserByIdQuery} from "../../services/userService.ts";
import {useLazyGetTopicByIdQuery} from "../../services/topicService.ts";
import {useEffect} from "react";
import { faChevronUp, faChevronDown, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PostCard: React.FC<{ post: any }> = ({post}) => {
    const [loadUser, {data: user}] = useLazyGetUserByIdQuery();
    const [loadTopic, {data: topic}] = useLazyGetTopicByIdQuery();

    useEffect(() => {
        if (post.user_id) loadUser(post.user_id);
        if (post.topic_id) loadTopic(post.topic_id);
    }, [post.user_id, post.topic_id, loadUser, loadTopic]);

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-2 px-4 pt-3 text-gray-500 text-sm">
                <img
                    src={user?.image_small}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                />
                <span className="font-medium text-gray-700 dark:text-white">{user?.username || "Анонім"}</span>
                <span>•</span>
                <span className="text-gray-500">тема: <span className="text-blue-600">{topic?.name || "—"}</span></span>
                <span>•</span>
                <span>{new Date(post.created_at).toLocaleString("uk-UA")}</span>
            </div>

            <div className="px-4 pb-4 pt-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">{post.title}</h2>
                <p className="text-gray-700 mb-3 dark:text-white">{post.body}</p>

                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="rounded-lg w-full object-cover mb-3"
                    />
                )}

                {post.video && (
                    <video
                        src={post.video}
                        controls
                        className="rounded-lg w-full max-h-[500px] mb-3"
                    />
                )}

                <div className="flex items-center gap-6 text-gray-500 text-sm mt-2">
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 space-x-3">
                        <button className="transition-transform duration-200 hover:scale-125 hover:text-purple-500">
                            <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4" />
                        </button>

                        <p>123</p>

                        <button className="transition-transform duration-200 hover:scale-125 hover:text-purple-500">
                            <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
                        </button>
                    </div>

                    <button className="flex items-center gap-1 hover:text-purple-500 transition">
                        <FontAwesomeIcon icon={faCommentDots} className="w-4 h-4" />
                        <span>24</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;