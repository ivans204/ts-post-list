import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { IComment } from '../models/comment.model';
import { IUser } from '../models/user.model';
import { IPost } from '../models/post.model';

import withMessage from 'hocs/withMessage';

import PostItem from 'components/PostItem';

import { getPosts, getComments, getUsers } from '../api/api';

import { useQuery } from 'react-query';

const PostSingle: FC = () => {
    const { id } = useParams<{ id: string }>();

    const {
        isLoading: isPostsLoading,
        isError: isPostError,
        data: postsData,
    } = useQuery<IPost[], Error>('posts', getPosts);

    const {
        isLoading: isCommentsLoading,
        isError: isCommentsError,
        data: commentsData,
    } = useQuery<IComment[], Error>('comments', getComments);

    const {
        isLoading: isUsersLoading,
        isError: isUsersError,
        data: usersData,
    } = useQuery<IUser[], Error>('users', getUsers);

    const post = () => postsData?.find((post) => post.id === +id);

    const postComments = () =>
        commentsData?.filter((comment) => comment.postId === +id);

    const postAuthor = () =>
        usersData?.find((user) => user.id === post()?.userId);

    if (isPostsLoading || isUsersLoading || isCommentsLoading)
        return <h1>Loading...</h1>;

    if (isPostError || isUsersError || isCommentsError)
        return <h1>Error...</h1>;

    return (
        <>
            <PostItem
                title={post()?.title}
                body={post()?.body}
                comments={postComments()}
                author={postAuthor()?.username}
            />
            <Link to="/posts"> Posts </Link>
        </>
    );
};

export default withMessage(PostSingle, 'PostSingle');
