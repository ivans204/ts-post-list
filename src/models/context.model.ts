import { Dispatch } from 'react';

import { IPost } from './post.model';
import { IComment } from './comment.model';
import { IUser } from './user.model';

export enum Types {
    SET_POSTS = 'SET_POSTS',
    SET_COMMENTS = 'SET_COMMENTS',
    SET_USERS = 'SET_USERS',
    SET_SELECTED_POST = 'SET_SELECTED_POST',
    // SET_SELECTED_COMMENTS = 'SET_SELECTED_COMMENTS',
    // SET_SELECTED_USER = 'SET_SELECTED_USER',
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
    [Types.SET_SELECTED_POST]: number | string;
    // [Types.SET_SELECTED_COMMENTS]: number | string;
    // [Types.SET_SELECTED_USER]: number | string;
};

export type PostActions = ActionMap<PostPayload>[keyof ActionMap<PostPayload>];

export type State = {
    posts: IPost[];
    comments: IComment[];
    users: IUser[];
    selectedPost: {
        post: IPost | undefined;
        // comments: IComment[];
        // author: IUser;
    };
};

export type PostContextType = {
    state: State;
    dispatch: Dispatch<PostActions>;
};
