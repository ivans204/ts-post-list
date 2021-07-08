import { FC } from 'react';

import { useQuery } from 'react-query';

import { IComment } from '../models/comment.model';
import { IUser } from '../models/user.model';
import { IPost } from '../models/post.model';

import withMessage from '../hocs/withMessage';

import PostItem from 'components/PostItem';

import { getPosts, getComments, getUsers } from '../api/api';

const PostList: FC = () => {
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

    const postComments = (id: number) =>
        commentsData?.filter((comment) => comment.postId === id);

    const postAuthor = (userId: number) => {
        return usersData?.find((user) => user.id === userId);
    };

    if (isPostsLoading || isCommentsLoading || isUsersLoading)
        return <h1>Loading...</h1>;

    if (isPostError || isCommentsError || isUsersError) return <h1>error</h1>;
    return (
        <>
            {postsData?.map(({ id, title, body, userId }) => {
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
