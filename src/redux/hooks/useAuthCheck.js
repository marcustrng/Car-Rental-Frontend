import {useEffect, useState} from "react";
import {getUserInfo} from '../../service/auth.service';

export default function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const localAuth = getUserInfo();
        if (localAuth) {
            setAuthChecked(true);
        }

    }, [setAuthChecked]);

    return {
        authChecked
    };
}