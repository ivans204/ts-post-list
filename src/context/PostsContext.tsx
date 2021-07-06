import { createContext, useReducer, FC } from 'react';

import { postReducer } from 'reducers/post.reducer';

import { PostContextType, State } from '../models/context.model';

import { IPost } from '../models/post.model';
import { IUser } from '../models/user.model';

const initialState: State = {
    posts: [],
    comments: [],
    users: [],
    selectedPost: {
        post: {} as IPost,
        comments: [],
        author: {} as IUser,
    },
};

export const PostContext = createContext<PostContextType>({
    state: initialState,
    dispatch: () => {},
});

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
