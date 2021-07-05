import { FC, useContext, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

// import { IComment } from '../models/comment.model';
import { IPost } from '../models/post.model';
// import { IUser } from '../models/user.model';
import { Types } from '../models/context.model';

import withMessage from 'hocs/withMessage';

import { PostContext } from '../context/PostsContext';
import PostItem from 'components/PostItem';

const PostSingle: FC = () => {
    let { state, dispatch } = useContext(PostContext);

    const posts = useFetch('https://jsonplaceholder.typicode.com/posts');

    // const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!state.posts.length && posts.status === 'fetched') {
            dispatch({
                type: Types.Posts,
                payload: posts.data as IPost[],
            });
        }

        //eslint-disable-next-line
    });

    if (posts.status === 'init' || posts.status === 'fetching')
        return <h1>Loading...</h1>;

    return (
        <>
            <PostItem
                // title={post.data?.title}
                // body={post.data?.body}
                // comments={comments.data}
                // author={author?.username}
                title="title"
                body="body"
                comments={[]}
                author="autor"
            />
            <Link to="/posts"> Posts </Link>
        </>
    );
};

export default withMessage(PostSingle, 'PostSingle');
