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

interface IAppInfo {
    owner?: string;
    appName?: string;
    code?: string;
    restAPI?: string;
}

export interface IResponse_App {
    status: boolean;
    msg?: string;
    REST_API?: string;
    myapp?: IAppInfo[];
    appName?: string;
    result?: any;
    infos?: any;
    point?: any;
}


export declare type Failable <R,E> = Result<R> | Failure<E>