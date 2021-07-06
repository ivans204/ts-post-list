import { useContext, FC, useEffect } from 'react';

import useFetch from 'hooks/useFetch';

import { IComment } from '../models/comment.model';
import { IUser } from '../models/user.model';
import { IPost } from '../models/post.model';

import { Types } from '../models/context.model';

import withMessage from '../hocs/withMessage';

import { PostContext } from '../context/PostsContext';
import PostItem from 'components/PostItem';

const PostList: FC = () => {
    const { state, dispatch } = useContext(PostContext);

    const posts = useFetch('https://jsonplaceholder.typicode.com/posts', {
        shouldFetch: !state.posts.length,
    });
    const comments = useFetch('https://jsonplaceholder.typicode.com/comments', {
        shouldFetch: !state.comments.length,
    });
    const users = useFetch('https://jsonplaceholder.typicode.com/users', {
        shouldFetch: !state.users.length,
    });

    useEffect(() => {
        if (!state.posts.length && posts.status === 'success') {
            dispatch({
                type: Types.SET_POSTS,
                payload: posts.data as IPost[],
            });
        }

        if (!state.comments.length && comments.status === 'success') {
            dispatch({
                type: Types.SET_COMMENTS,
                payload: comments.data as IComment[],
            });
        }

        if (!state.users.length && users.status === 'success') {
            dispatch({
                type: Types.SET_USERS,
                payload: users.data as IUser[],
            });
        }

        // eslint-disable-next-line
    });

    const postComments = (id: number) =>
        state.comments.filter((comment) => comment.postId === id);

    const postAuthor = (userId: number): IUser => {
        return (
            state.posts &&
            (state.users.find((user) => user.id === userId) as IUser)
        );
    };

    if (
        posts.status === 'fetching' ||
        comments.status === 'fetching' ||
        users.status === 'fetching'
    )
        return <h1>Loading...</h1>;

    if (posts.error) return <h1>{posts.error}</h1>;

    return (
        <>
            {state.posts.map(({ id, title, body, userId }) => {
                return (
                    <PostItem
                        key={id}
                        title={title}
                        body={body}
                        href={`/post/${id}`}
                        comments={postComments(id)}
                        author={postAuthor(userId)?.username}
                    />
                );
            })}
        </>
    );
};

export default withMessage(PostList, 'PostList');
