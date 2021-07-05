import { createContext, useReducer, FC } from 'react';

import { IComment } from '../models/comment.model';
import { IPost } from '../models/post.model';
import { IUser } from '../models/user.model';

import { PostActions } from '../models/context.model';

import { PostContextType } from '../models/context.model';

import { Types } from '../models/context.model';

type initialStateType = {
    posts: IPost[];
    comments: IComment[];
    users: IUser[];
};

const initialState = {
    posts: [],
    comments: [],
    users: [],
    selectedPost: { comments: [], author: {} },
};

export const PostContext = createContext<PostContextType>({
    state: initialState,
    dispatch: () => {},
});

export const postReducer = (state: initialStateType, action: PostActions) => {
    switch (action.type) {
        case Types.Posts:
            return { ...state, posts: action.payload };
        case Types.Comments:
            return { ...state, comments: action.payload };
        case Types.Users:
            return { ...state, users: action.payload };
        default:
            return state;
    }
};

const PostContextProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);

    return (
        <PostContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
