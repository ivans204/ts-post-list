import { createContext, useEffect, useState, FC } from 'react';

import { IComment } from '../models/comment.model';
import { IPost } from '../models/post.model';
import { IUser } from '../models/user.model';
import { ContextType } from '../models/context.model';

import { getPosts, getComments, getUsers } from '../api/api';

export const PostContext = createContext<ContextType>({} as ContextType);

const PostContextProvider: FC = ({ children }) => {
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [comments, setComments] = useState<IComment[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    const postById = (id: number): IPost | undefined =>
        posts.find((post) => post.id === id);

    const postComments = (postId: number): IComment[] =>
        comments.filter((comment) => comment.postId === postId);

    const postAuthor = (postUserId: number | undefined): IUser | undefined =>
        users.find((user) => user.id === postUserId);

    useEffect(() => {
        getPosts()
            .then((posts) => setPosts(posts))
            .catch(() => setErrorMsg('Wrong Url'));

        getComments()
            .then((comments) => setComments(comments))
            .catch(() => setErrorMsg('Wrong Url'));

        getUsers()
            .then((users) => setUsers(users))
            .catch(() => setErrorMsg('Something went wrong :('));

        // eslint-disable-next-line
    }, []);

    return (
        <>
            {!!errorMsg && <h1>{errorMsg}</h1>}
            {!!posts.length && (
                <PostContext.Provider
                    value={{
                        errorMsg,
                        comments,
                        posts,
                        users,
                        postById,
                        postComments,
                        postAuthor,
                    }}
                >
                    {children}
                </PostContext.Provider>
            )}
        </>
    );
};

export default PostContextProvider;
