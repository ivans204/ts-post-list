import { PostActions, Types } from '../models/context.model';

export const postReducer = (state: [], action: PostActions) => {
    switch (action.type) {
        case Types.Posts:
            return { ...state, posts: [...action.payload] };
        case Types.Comments:
            return { ...state, comments: action.payload };
        case Types.Users:
            return { ...state, users: action.payload };
        default:
            return state;
    }
};
