import { useEffect, useReducer, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

import { fetchReducer } from 'reducers/useFetch.reducer';

import { State, Cache } from '../models/useFetch.model';

const useFetch = <T = unknown>(
    url?: string,
    options?: AxiosRequestConfig
): State<T> => {
    const cancelRequest = useRef<boolean>(false);
    const cache = useRef<Cache<T>>({});

    const initialState: State<T> = {
        status: 'init',
        error: undefined,
        data: undefined,
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        if (!url) {
            return;
        }

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

        fetchData();

        return () => {
            cancelRequest.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return state as State<T>;
};

export default useFetch;
