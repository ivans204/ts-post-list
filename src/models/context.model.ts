import { Dispatch } from 'react';

import { IPost } from './post.model';
import { IComment } from './comment.model';
import { IUser } from './user.model';

export enum Types {
    Posts = 'SET_POSTS',
    Comments = 'SET_COMMENTS',
    Users = 'SET_USERS',
}

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

type PostPayload = {
    [Types.Posts]: IPost[];
    [Types.Comments]: IComment[];
    [Types.Users]: IUser[];
};

export type PostActions = ActionMap<PostPayload>[keyof ActionMap<PostPayload>];

export type PostContextType = {
    state: {
        posts: IPost[];
        comments: IComment[];
        users: IUser[];
    };
    dispatch: Dispatch<PostActions>;
};
