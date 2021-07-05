import { PostActions, Types } from '../models/context.model';

export const postReducer = (state: [], action: PostActions) => {
    switch (action.type) {
        case Types.SET_POSTS:
            return { ...state, posts: [...action.payload] };
        case Types.SET_COMMENTS:
            return { ...state, comments: action.payload };
        case Types.SET_USERS:
            return { ...state, users: action.payload };
        default:
            return state;
    }
};
