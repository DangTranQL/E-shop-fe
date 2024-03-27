import { jwtDecode } from 'jwt-decode';

export const isValid = (accessToken) => {
    if (!accessToken) return false;

    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
}

export const decodeToken = (accessToken) => {
    if (!accessToken) return null;

    return jwtDecode(accessToken);
}