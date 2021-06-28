import { FC } from 'react';

import { IComment } from '../models/comment.model';

import withMessage from '../hocs/withMessage';
import Title from '../components/Title';

interface PostiItemProps {
    title: string;
    body: string;
    author: string;
    comments: IComment[];
    href: string;
}

const PostItem: FC<PostiItemProps> = ({
    title,
    body,
    author,
    comments,
    href,
}) => {
    return (
        <div>
            <Title href={href} title={title} />
            <p>{author}</p>
            <p>{body}</p>
            <ul>
                {comments.map(({ id, body }) => (
                    <li key={id}>{body}</li>
                ))}
            </ul>
        </div>
    );
};

export default withMessage(PostItem, 'PostItem');
