import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import apiClient from "./client";

interface IGetData {
    path: string;
    reqParams?: object;
    onComplete?: (props: AxiosResponse) => void;
    onError?: (props: AxiosResponse) => void;
}

interface IUseGetResponse {
    getData: <T>({
        path,
        onComplete,
        onError,
        reqParams,
    }: IGetData) => Promise<T>;
    isLoading: boolean;
    cancelRequest: () => void;
}

export const useGet = (): IUseGetResponse => {
    const cancelToken = axios.CancelToken.source();
    const [isLoading, setLoading] = useState(false);

    const getData = <T>({
        path,
        onComplete,
        onError,
        reqParams,
    }: IGetData): Promise<T> => {
        setLoading(true);

        return new Promise((resolve, reject) => {
            apiClient
                .get(path, {
                    cancelToken: cancelToken.token,
                    ...reqParams,
                })
                .then((res) => {
                    if (onComplete) onComplete(res.data);
                    resolve(res as T);
                })
                .catch((err) => {
                    if (onError) onError(err);
                    reject(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        });
    };

    const cancelRequest = () => {
        if (cancelToken) {
            cancelToken.cancel();
        }
    };

    return { getData, isLoading, cancelRequest };
};
