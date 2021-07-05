import { useEffect, useReducer, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

import { fetchReducer } from 'reducers/useFetch.reducer';

import { State, Cache } from '../models/useFetch.model';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    shouldFetch: boolean;
}

const useFetch = <T = unknown>(
    url: string,
    options: CustomAxiosRequestConfig = { shouldFetch: true }
): State<T> => {
    const cancelRequest = useRef<boolean>(false);
    const cache = useRef<Cache<T>>({});

    const initialState: State<T> = {
        status: undefined,
        error: undefined,
        data: undefined,
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'request' });

            if (cache.current[url]) {
                dispatch({ type: 'success', payload: cache.current[url] });
            } else {
                try {
                    const response = await axios(url, options);
                    cache.current[url] = response.data;

                    if (cancelRequest.current) return;

                    dispatch({ type: 'success', payload: response.data });
                } catch (error) {
                    if (cancelRequest.current) return;

                    dispatch({ type: 'failure', payload: error.message });
                }
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
