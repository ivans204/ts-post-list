export interface State<T> {
    status: 'fetching' | 'error' | 'success' | undefined;
    data?: T;
    error?: string;
}

export type Action<T> =
    | { type: 'request' }
    | { type: 'success'; payload: T }
    | { type: 'failure'; payload: string };
