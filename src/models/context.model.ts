import { Dispatch } from 'react';

import { IPost } from './post.model';
import { IComment } from './comment.model';
import { IUser } from './user.model';

export enum Types {
    SET_POSTS = 'SET_POSTS',
    SET_COMMENTS = 'SET_COMMENTS',
    SET_USERS = 'SET_USERS',
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
    [Types.SET_POSTS]: IPost[];
    [Types.SET_COMMENTS]: IComment[];
    [Types.SET_USERS]: IUser[];
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
