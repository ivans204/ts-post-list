export interface State<T> {
    status: 'fetching' | 'error' | 'fetched' | undefined;
    data?: T;
    error?: string;
}

export type Action<T> =
    | { type: 'request' }
    | { type: 'success'; payload: T }
    | { type: 'failure'; payload: string };

export interface Cache<T> {
    [url: string]: T;
}
