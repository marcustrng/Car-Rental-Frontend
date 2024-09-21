import {useEffect, useState} from "react";
import {getUserInfo} from '../../service/auth.service';
import {useGetUserByUsernameMutation} from "../api/userApi";

export default function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);
    const [username, setUsername] = useState('');
    const [hasCallGetUserByUsername, setHasCallGetUserByUsername] = useState(false);
    const [data, setData] = useState({});
    const [role, setRole] = useState("");
    const [getUserByUsername, {
        data: userData,
        isLoading,
        isError,
        error,
        isSuccess
    }] = useGetUserByUsernameMutation(username);
    console.log("getUserByUsername userData", userData)

    useEffect(() => {
        const localAuth = getUserInfo();
        if (localAuth) {
            setUsername(localAuth.sub)
            if (!hasCallGetUserByUsername) {
                getUserByUsername(localAuth.sub);
                setHasCallGetUserByUsername(true)
            }
            setData(userData);
            setRole(localAuth.role);
            setAuthChecked(isSuccess && !isError)
        }
    }, [getUserByUsername, userData, hasCallGetUserByUsername, isError, isSuccess]);
    return {
        authChecked,
        data,
        role
    };
}