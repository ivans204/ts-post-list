import { createContext, useEffect, useState, FC } from 'react';

import { IComment } from '../models/comment.model';
import { IPost } from '../models/post.model';
import { IUser } from '../models/user.model';
import { PostContextType } from '../models/context.model';

import { getPosts, getComments, getUsers } from '../api/api';

export const PostContext = createContext<PostContextType>(
    {} as PostContextType
);

const PostContextProvider: FC = ({ children }) => {
    const [error, setError] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    const isDone = !isLoadingPosts && !isLoadingComments && !isLoadingUsers;

    const getPostById = (id: number): IPost =>
        posts.find((post) => post.id === id) as IPost;

    const getPostComments = (postId: number): IComment[] =>
        comments.filter((comment) => comment.postId === postId);

    const getPostAuthor = (postUserId: number): IUser =>
        users.find((user) => user.id === postUserId) as IUser;

    useEffect(() => {
        getPosts()
            .then((posts) => setPosts(posts))
            .catch(() => setError(true))
            .finally(() => setIsLoadingPosts(false));

        getComments()
            .then((comments) => setComments(comments))
            .catch(() => setError(true))
            .finally(() => setIsLoadingComments(false));

        getUsers()
            .then((users) => setUsers(users))
            .catch(() => setError(true))
            .finally(() => setIsLoadingUsers(false));

        // console.log(isDone);

        // eslint-disable-next-line
    }, []);

    if (error) {
        return <h1>Erorr</h1>;
    } else if (!isDone) {
        return <h1>loading</h1>;
    } else {
        return (
            <PostContext.Provider
                value={{
                    error,
                    comments,
                    posts,
                    users,
                    postById: getPostById,
                    postComments: getPostComments,
                    postAuthor: getPostAuthor,
                }}
            >
                {children}
            </PostContext.Provider>
        );
    }
    // {
    /* return (
            <>
                {error ? (
                    <h1>Somethong went wrong</h1>
                ) : isDone ? (
                    <PostContext.Provider
                        value={{
                            error,
                            comments,
                            posts,
                            users,
                            postById: getPostById,
                            postComments: getPostComments,
                            postAuthor: getPostAuthor,
                        }}
                    >
                        {children}
                    </PostContext.Provider>
                ) : (
                    <h1>is loading</h1>
                )}
            </>
        ); */
    // }
};

export default PostContextProvider;
