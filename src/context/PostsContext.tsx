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
    activePost: {},
    activePostComments: [],
    activePostAuthor: {},
};

export const PostContext = createContext<PostContextType>({
    state: initialState,
    dispatch: () => {},
});

// const getPostById = (id) => {
//     return {
//         type: "GET_POST_BY_ID",
//         value:
//     }
// }

export const postReducer = (state: initialStateType, action: PostActions) => {
    switch (action.type) {
        case Types.Posts:
            return { ...state, posts: action.payload };
        case Types.Comments:
            return { ...state, comments: action.payload };
        case Types.Users:
            return { ...state, users: action.payload };
        // case Types.GetPostById:
        //     return;
        default:
            return state;
    }
};

const PostContextProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);

    // const getPostById = (id: number): IPost =>
    //     state.posts.find((post) => post.id === id) as IPost;

    // const getPostComments = (postId: number): IComment[] =>
    //     state.comments.filter((comment) => comment.postId === postId);

    // const getPostAuthor = (postUserId: number): IUser =>
    //     state.users.find((user) => user.id === postUserId) as IUser;

    // jel takvu neku manipulaciju pisem tu ili u reducer?

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
