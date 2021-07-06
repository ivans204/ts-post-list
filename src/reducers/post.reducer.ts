import { PostActions, Types, State } from '../models/context.model';

export const postReducer = (state: State, action: PostActions) => {
    switch (action.type) {
        case Types.SET_POSTS:
            return { ...state, posts: [...action.payload] };
        case Types.SET_COMMENTS:
            return { ...state, comments: action.payload };
        case Types.SET_USERS:
            return { ...state, users: action.payload };
        case Types.SET_SELECTED_POST:
            if (typeof action.payload === 'number') {
                return {
                    ...state,
                    selectedPost: {
                        post: state.posts.find(
                            (statePost) => statePost.id === action.payload
                        ),
                    },
                };
            }
            return { ...state, selectedPost: { post: action.payload } };
        default:
            return state;
    }
};
