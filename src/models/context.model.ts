import { IPost } from './post.model';
import { IComment } from './comment.model';
import { IUser } from './user.model';

export type ContextType = {
    errorMsg: string;
    comments: IComment[];
    posts: IPost[];
    users: IUser[];
    postById: (postId: number) => IPost | undefined;
    postComments: (postId: number) => IComment[];
    postAuthor: (postUserId: number | undefined) => IUser | undefined;
};
