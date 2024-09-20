import {authKey} from '../constant/storageKey';
import {decodeToken} from '../utils/jwt';
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';

export const setUserInfo = ({accessToken}) => {
    return setLocalStorage(authKey, accessToken);
}

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        return decodeToken(authToken)
    } else {
        return null
    }
}
export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    return !!authToken;
}
export const loggedOut = () => {
    localStorage.removeItem(authKey)
    localStorage.removeItem('username')
}