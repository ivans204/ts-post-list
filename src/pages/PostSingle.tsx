import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import withMessage from 'hocs/withMessage';

import { PostContext } from '../context/PostsContext';
import PostItem from 'components/PostItem';

const PostSingle: FC = () => {
    let { state, dispatch } = useContext(PostContext);

    const { id } = useParams<{ id: string }>();

    // const postAuthor = (userId: number): IUser | undefined => {
    //     if (state.selectedPost.post?.userId)
    //         return state.users.find((user) => user.id === userId) as IUser;
    // };

    return (
        <>
            {/* <PostItem
                title={state.selectedPost.post?.title}
                body={state.selectedPost.post?.body}
                comments={state.selectedPost.comments}
                author={
                    postAuthor(state.selectedPost.post?.userId as number)
                        ?.username
                }
            /> */}
            <Link to="/posts"> Posts </Link>
        </>
    );
};

export default withMessage(PostSingle, 'PostSingle');
