export interface State<T> {
    status: 'init' | 'fetching' | 'error' | 'fetched';
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
