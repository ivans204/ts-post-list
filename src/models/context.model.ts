import { IPost } from './post.model';
import { IComment } from './comment.model';
import { IUser } from './user.model';

export type PostContextType = {
    error: boolean;
    comments: IComment[];
    posts: IPost[];
    users: IUser[];
    postById: (postId: number) => IPost;
    postComments: (postId: number) => IComment[];
    postAuthor: (postUserId: number) => IUser;
};
