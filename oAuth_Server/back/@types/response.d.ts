declare type Result <R> = {
    isError: false;
    value: R;
}

declare type Failure <E> = {
    isError: true;
    error: E;
}

export interface Point {
    id?: number,
    email?: string,
    restAPI?: string,
    point?: number
}

export declare type Failable <R,E> = Result<R> | Failure<E>