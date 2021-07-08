import { useContext, FC } from 'react';

import { useQuery } from 'react-query';

// import { IComment } from '../models/comment.model';
// import { IUser } from '../models/user.model';
// import { IPost } from '../models/post.model';

import { Types } from '../models/context.model';

import withMessage from '../hocs/withMessage';

import { PostContext } from '../context/PostsContext';
import PostItem from 'components/PostItem';

import { getPosts, getComments, getUsers } from '../api/api';

const PostList: FC = () => {
    const { state, dispatch } = useContext(PostContext);

    const { isLoading: isPostsLoading, isError: isPostError } = useQuery(
        'posts',
        getPosts,
        {
            onSuccess: (data) =>
                dispatch({ type: Types.SET_POSTS, payload: data }),
        }
    );

    const { isLoading: isCommentsLoading, isError: isCommentsError } = useQuery(
        'comments',
        getComments,
        {
            onSuccess: (data) =>
                dispatch({ type: Types.SET_COMMENTS, payload: data }),
        }
    );

    const { isLoading: isUsersLoading, isError: isUsersError } = useQuery(
        'users',
        getUsers,
        {
            onSuccess: (data) =>
                dispatch({ type: Types.SET_USERS, payload: data }),
        }
    );

    const postComments = (id: number) =>
        state.comments.filter((comment) => comment.postId === id);

    const postAuthor = (userId: number) => {
        return state.posts && state.users.find((user) => user.id === userId);
    };

    if (isPostsLoading || isCommentsLoading || isUsersLoading)
        return <h1>Loading...</h1>;

    if (isPostError || isCommentsError || isUsersError) return <h1>error</h1>;
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
