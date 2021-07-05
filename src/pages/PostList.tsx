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
    const posts = useFetch('https://jsonplaceholder.typicode.com/posts');
    const comments = useFetch('https://jsonplaceholder.typicode.com/comments');
    const users = useFetch('https://jsonplaceholder.typicode.com/users');

    useEffect(() => {
        if (!state.posts.length && posts.status === 'fetched') {
            console.log('udem ipak tu');

            dispatch({
                type: Types.Posts,
                payload: posts.data as IPost[],
            });
        }

        if (!state.comments.length && comments.status === 'fetched') {
            console.log('udem ipak tu');

            dispatch({
                type: Types.Comments,
                payload: comments.data as IComment[],
            });
        }

        if (!state.users.length && users.status === 'fetched') {
            console.log('udem ipak tu');

            dispatch({
                type: Types.Users,
                payload: users.data as IUser[],
            });
        }

        // eslint-disable-next-line
    });

    const postComments = (id: number) =>
        state.comments.filter((comment) => comment.postId === id);

    const postAuthor = (userId: number): IUser => {
        return state.users.find((user) => user.id === userId) as IUser;
    };

    if (
        posts.status === 'init' ||
        posts.status === 'fetching' ||
        comments.status === 'init' ||
        comments.status === 'fetching' ||
        users.status === 'init' ||
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
                        author={postAuthor(userId).username}
                    />
                );
            })}
        </>
    );
};

export default withMessage(PostList, 'PostList');
