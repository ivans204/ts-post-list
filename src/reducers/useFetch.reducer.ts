import { Action, State } from '../models/useFetch.model';

export const fetchReducer = <T>(
    state: State<T>,
    action: Action<T>
): State<T> => {
    switch (action.type) {
        case 'request':
            return { ...state, status: 'fetching' };
        case 'success':
            return {
                ...state,
                status: 'fetched',
                data: action.payload,
            };
        case 'failure':
            return {
                ...state,
                status: 'error',
                error: action.payload,
            };
        default:
            return state;
    }
};
