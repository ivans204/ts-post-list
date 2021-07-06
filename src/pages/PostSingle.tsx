import { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

import { IComment } from '../models/comment.model';
import { IPost } from '../models/post.model';
// import { IUser } from '../models/user.model';
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
            !state.selectedPost.comments?.length &&
            fetchedComments.status === 'success'
        ) {
            dispatch({
                type: Types.SET_SELECTED_COMMENTS,
                payload: fetchedComments.data as IComment[],
            });
        }

        //eslint-disable-next-line
    });

    useEffect(() => {
        if (state.posts.length)
            dispatch({ type: Types.SET_SELECTED_POST, payload: +id });

        if (state.comments.length)
            dispatch({ type: Types.SET_SELECTED_COMMENTS, payload: +id });
        //eslint-disable-next-line
    }, []);

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
                // author={author?.username}
                author="author"
            />
            <Link to="/posts"> Posts </Link>
        </>
    );
};

export default withMessage(PostSingle, 'PostSingle');
