import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { IComment } from '../models/comment.model';
import { IPost } from '../models/post.model';
import { IUser } from '../models/user.model';

import withMessage from 'hocs/withMessage';

import { PostContext } from '../context/PostsContext';
import PostItem from 'components/PostItem';

const PostSingle: FC = () => {
    const { posts, users, postAuthor, postById, postComments } =
        useContext(PostContext);

    const { id } = useParams<{ id: string }>();

    // const post: IPost = postById(+id); // +id converts string id '1' to number id 1
    // let comments: IComment[] = postComments(+id);
    // let author: IUser = {} as IUser;

    let post: IPost = {} as IPost; // +id converts string id '1' to number id 1
    let comments: IComment[] = [];
    let author: IUser = {} as IUser;

    if (posts.length) {
        post = postById(+id);
        comments = postComments(+id);
        console.log(post, 'post###############');

        if (post.userId && users.length) {
            console.log('e sad sam tu uso');

            author = postAuthor(post.userId);
            console.log(author);
        }
    }

    return (
        <>
            {!posts.length && !comments.length && !author ? (
                <h1>loading</h1>
            ) : (
                <PostItem
                    title={post.title}
                    body={post.body}
                    comments={comments}
                    author={author.username}
                    // title=""
                    // body=""
                    // comments={[]}
                    // author=""
                />
            )}
            <Link to="/posts"> Posts </Link>
        </>
    );
};

export default withMessage(PostSingle, 'PostSingle');
