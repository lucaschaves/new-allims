import { BASE_URL } from "@/constants";
import axios from "axios";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        accept: "application/json",
        authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWZkZjA2NDctYzRlNy00NTZiLWI2YmMtOWVkZTljZmRhNWNjIiwiaWF0IjoxNjgzMjE4MjE5LCJleHAiOjE2ODMzMDQ2MTl9.7jsS8uhnqcwPUXHq6ITgeboZizd5wBjq3Pyjw5IQFLU",
    },
});

export default apiClient;
