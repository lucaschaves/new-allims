import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface IUseAxiosResponse<T> {
    loading: boolean;
    data: T | undefined;
    error: string;
    request: () => void;
}

interface IUseAxiosProps {
    config: AxiosRequestConfig<any>;
    loadOnStart: boolean;
}

export const useAxios = <T>({
    config,
    loadOnStart = false,
}: IUseAxiosProps): IUseAxiosResponse<T> => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>();
    const [error, setError] = useState("");

    useEffect(() => {
        if (loadOnStart) sendRequest();
        else setLoading(false);
    }, []);

    const request = () => {
        sendRequest();
    };

    const sendRequest = () => {
        setLoading(true);

        axios(config)
            .then((response) => {
                setError("");
                setData(response.data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    };

    return { loading, data, error, request };
};
