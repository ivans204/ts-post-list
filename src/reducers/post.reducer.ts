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
                        ...state.selectedPost,
                        post: state.posts.find(
                            (statePost) => statePost.id === action.payload
                        ),
                    },
                };
            }
            return {
                ...state,
                selectedPost: { ...state.selectedPost, post: action.payload },
            };

        case Types.SET_SELECTED_COMMENTS:
            if (typeof action.payload === 'number') {
                return {
                    ...state,
                    selectedPost: {
                        ...state.selectedPost,
                        comments: state.comments.filter(
                            (stateComment) =>
                                stateComment.postId === action.payload
                        ),
                    },
                };
            }
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                    comments: action.payload,
                },
            };

        case Types.SET_SELECTED_USER:
            if (typeof action.payload === 'number') {
                return {
                    ...state,
                    selectedPost: {
                        ...state.selectedPost,
                        author: state.users.find(
                            (stateUser) => stateUser.id === action.payload
                        ),
                    },
                };
            }
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                    author: action.payload,
                },
            };
        default:
            return state;
    }
};
