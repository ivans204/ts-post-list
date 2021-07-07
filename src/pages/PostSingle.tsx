import { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

import { IComment } from '../models/comment.model';
import { IPost } from '../models/post.model';
import { IUser } from '../models/user.model';
import { Types } from '../models/context.model';

import withMessage from 'hocs/withMessage';

import { PostContext } from '../context/PostsContext';
import PostItem from 'components/PostItem';

const PostSingle: FC = () => {
    let { state, dispatch } = useContext(PostContext);

    const { id } = useParams<{ id: string }>();

    const fetchedPost = useFetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { shouldFetch: !state.posts.length }
    );

    const fetchedComments = useFetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        { shouldFetch: !state.comments.length }
    );

    const fetchedUsers = useFetch(
        `https://jsonplaceholder.typicode.com/users`,
        {
            shouldFetch: !state.users.length,
        }
    );

    useEffect(() => {
        if (
            !state.selectedPost.post?.body &&
            fetchedPost.status === 'success'
        ) {
            dispatch({
                type: Types.SET_SELECTED_POST,
                payload: fetchedPost.data as IPost,
            });
        }

        if (
            !state.selectedPost.comments.length &&
            fetchedComments.status === 'success'
        ) {
            dispatch({
                type: Types.SET_SELECTED_COMMENTS,
                payload: fetchedComments.data as IComment[],
            });
        }

        if (!state.users.length && fetchedUsers.status === 'success') {
            dispatch({
                type: Types.SET_USERS,
                payload: fetchedUsers.data as IUser[],
            });
        }

        //eslint-disable-next-line
    });

    useEffect(() => {
        if (state.posts.length)
            dispatch({ type: Types.SET_SELECTED_POST, payload: +id });

        if (state.comments.length)
            dispatch({ type: Types.SET_SELECTED_COMMENTS, payload: +id });

        if (state.users.length && state.selectedPost.post?.userId)
            dispatch({
                type: Types.SET_SELECTED_USER,
                payload: state.selectedPost.post?.userId,
            });
        //eslint-disable-next-line
    }, []);

    const postAuthor = (userId: number): IUser | undefined => {
        if (state.selectedPost.post?.userId)
            return state.users.find((user) => user.id === userId) as IUser;
    };

    if (
        fetchedPost.status === 'fetching' ||
        fetchedComments.status === 'fetching'
    )
        return <h1>Loading...</h1>;

    return (
        <>
            <PostItem
                title={state.selectedPost.post?.title}
                body={state.selectedPost.post?.body}
                comments={state.selectedPost.comments}
                author={
                    postAuthor(state.selectedPost.post?.userId as number)
                        ?.username
                }
            />
            <Link to="/posts"> Posts </Link>
        </>
    );
};

export default withMessage(PostSingle, 'PostSingle');
