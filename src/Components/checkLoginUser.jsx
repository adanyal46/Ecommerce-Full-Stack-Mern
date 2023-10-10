import {useSelector} from "react-redux";

const CheckLoginUser = ({children}) => {
    const {isLoggedIn} = useSelector((state) => state.auth)
    if (isLoggedIn) {
        return children;
    }
    return null
}
const CheckLoginUserFalse = ({children}) => {
    const {isLoggedIn} = useSelector((state) => state.auth)
    if (isLoggedIn) {
        return null
    }
    return children;
}

export {CheckLoginUser, CheckLoginUserFalse}