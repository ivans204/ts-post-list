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
    const { postAuthor, postById, postComments } = useContext(PostContext);

    const { id } = useParams<{ id: string }>();

    const post: IPost | undefined = postById(+id); // +id converts string id '1' to number id 1
    const comments: IComment[] = postComments(+id);
    const author: IUser | undefined = postAuthor(post?.userId);

    return (
        <div>
            <PostItem
                title={post?.title}
                body={post?.body}
                comments={comments}
                author={author?.username}
            />
            <Link to="/posts"> Posts </Link>
        </div>
    );
};

export default withMessage(PostSingle, 'PostSingle');
