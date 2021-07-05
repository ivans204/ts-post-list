import { useEffect, useReducer, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

import { fetchReducer } from 'reducers/useFetch.reducer';

import { State } from '../models/useFetch.model';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    shouldFetch: boolean;
}

const useFetch = <T = unknown>(
    url: string,
    options: CustomAxiosRequestConfig = { shouldFetch: true }
): State<T> => {
    const cancelRequest = useRef<boolean>(false);

    const initialState: State<T> = {
        status: undefined,
        error: undefined,
        data: undefined,
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'request' });

            try {
                const response = await axios(url, options);

                if (cancelRequest.current) return;

                dispatch({ type: 'success', payload: response.data });
            } catch (error) {
                if (cancelRequest.current) return;

                dispatch({ type: 'failure', payload: error.message });
            }
        };

        if (options.shouldFetch) fetchData();

        return () => {
            cancelRequest.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return state as State<T>;
};

export default useFetch;
