import { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

// import { IComment } from '../models/comment.model';
// import { IPost } from '../models/post.model';
// import { IUser } from '../models/user.model';
import { Types } from '../models/context.model';

import withMessage from 'hocs/withMessage';

import { PostContext } from '../context/PostsContext';
import PostItem from 'components/PostItem';

const PostSingle: FC = () => {
    let { state, dispatch } = useContext(PostContext);

    const { id } = useParams<{ id: string }>();

    const selectedPost = useFetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    useEffect(() => {
        if (!state.posts.length && selectedPost.status === 'fetched') {
            // dispatch({
            //     type: Types.SET_SELECTED_POST,
            //     payload: id,
            // });
            console.log(123);
        }

        //eslint-disable-next-line
    }, []);

    if (selectedPost.status === 'fetching') return <h1>Loading...</h1>;

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
