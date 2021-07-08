import { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import withMessage from 'hocs/withMessage';

import { PostContext } from '../context/PostsContext';
import PostItem from 'components/PostItem';

import { getCommentsById, getPostById, getUserByPostId } from 'api/api';
import { useQuery } from 'react-query';
import { Types } from 'models/context.model';
import { IPost } from 'models/post.model';

const PostSingle: FC = () => {
    const { state, dispatch } = useContext(PostContext);
    const { selectedPost, posts, comments, users } = state;

    const { id } = useParams<{ id: string }>();

    const {
        isLoading: isPostLoading,
        isError: isPostError,
        data: postData,
    } = useQuery<IPost, Error>('selectedPost', () => getPostById(+id), {
        enabled: !state.posts.length,
        onSuccess: (data) =>
            dispatch({ type: Types.SET_SELECTED_POST, payload: data }),
    });

    const { isLoading: isCommentsLoading, isError: isCommentsError } = useQuery(
        'selectedComments',
        () => getCommentsById(+id),
        {
            enabled: !state.comments.length,
            onSuccess: (data) =>
                dispatch({ type: Types.SET_SELECTED_COMMENTS, payload: data }),
        }
    );

    const { isLoading: isUserLoading, isError: isUserError } = useQuery(
        'selectedUser',
        () => getUserByPostId(postData?.userId as number),
        {
            enabled: !!postData?.userId && !state.users.length,
            onSuccess: (data) =>
                dispatch({ type: Types.SET_SELECTED_USER, payload: data }),
        }
    );

    useEffect(() => {
        if (posts.length && comments.length && users.length) {
            dispatch({ type: Types.SET_SELECTED_POST, payload: +id });
            dispatch({ type: Types.SET_SELECTED_COMMENTS, payload: +id });
            dispatch({
                type: Types.SET_SELECTED_USER,
                payload: selectedPost.post?.userId,
            });
        }
        // eslint-disable-next-line
    }, [selectedPost.post?.userId]);

    if (isPostLoading || isUserLoading || isCommentsLoading)
        return <h1>Loading...</h1>;

    if (isPostError || isUserError || isCommentsError) return <h1>Error...</h1>;

    return (
        <>
            <PostItem
                title={selectedPost.post?.title}
                body={selectedPost.post?.body}
                comments={selectedPost.comments}
                author={selectedPost.author?.username}
            />
            <Link to="/posts"> Posts </Link>
        </>
    );
};

export default withMessage(PostSingle, 'PostSingle');
