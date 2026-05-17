import { apiClient } from "./api-client";

export const getCachedUser = () => {
    return apiClient.get('/user');
}