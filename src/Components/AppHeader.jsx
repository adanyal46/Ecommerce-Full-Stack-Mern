import React, {useState} from "react";
import {Badge, Divider, Drawer, Layout, Space, Typography, Grid, Button} from "antd";
import {
    AlignLeftOutlined,
    AlignRightOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, RESET_AUTH} from "../redux/features/auth/authSlice";
import {CheckLoginUser, CheckLoginUserFalse} from "./checkLoginUser";
import {UserName} from "../Pages/profile/Profile";

const {useBreakpoint} = Grid;
const AppHeader = () => {
    const {md} = useBreakpoint();
    const [openMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, isLoggedIn} = useSelector((state) => state.auth)
    const showMenu = () => {
        setOpenMenu(true);
    };
    const onClose = () => {
        setOpenMenu(false);
    };
    const logoutUser = async () => {
        await dispatch(logout());
        await dispatch(RESET_AUTH());
        setOpenMenu(false)
        navigate('/login')
    }
    return (<Layout.Header>
        <Space className={'justify-between w-100'}>
            <Link to={'/'}>
                <Typography.Title level={3} className={'text-lila text-white l-5 my-0'}>
                    SHOP-DANI
                </Typography.Title>
            </Link>
            <Space size={'large'}>
                {md ? <>
                    <Space>
                        <CheckLoginUserFalse>
                            <Link to={'/login'} className={'text-white fs-15'}>
                                Login
                            </Link>
                            <Divider className={'custom__divider'} type={'vertical'}/>
                            <Link to={'/register'} className={'text-white fs-15'}>
                                Register
                            </Link>
                        </CheckLoginUserFalse>
                        <CheckLoginUser>
                         <Space>
                             <UserOutlined style={{color:'orange'}}/>
                             <UserName/>
                         </Space>
                        </CheckLoginUser>
                        <Divider className={'custom__divider'} type={'vertical'}/>
                        <CheckLoginUser>
                            <Link to={'/orders'} className={'text-white fs-15'}>
                                My Orders
                            </Link>
                        </CheckLoginUser>
                        <CheckLoginUser>
                            <Button loading={isLoading} type={'primary'} onClick={logoutUser}>
                                Logout
                            </Button>
                        </CheckLoginUser>
                    </Space>
                    <Space size={0}>
                        <Typography.Text className={'text-white fs-15'}>
                            Cart
                        </Typography.Text>
                        <Badge count={0} showZero overflowCount={99}>
                            <ShoppingCartOutlined className={'icon'}/>
                        </Badge>
                    </Space>
                </> : <div>
                    {openMenu ? <AlignRightOutlined className={'icon'}/> :
                        <AlignLeftOutlined onClick={showMenu} className={'icon'}/>}
                </div>}
            </Space>
        </Space>
        <Drawer
            className={'custom__drawer'}
            width={250}
            title="SHOP-DANI"
            placement={'left'}
            onClose={onClose}
            open={openMenu}
        >
            <Space direction={'vertical'} size={'large'} className={'w-100'}>
                <CheckLoginUserFalse>
                    <Link to={'/login'} className={'text-white fs-15'}>
                        Login
                    </Link>
                    <Divider className={'custom__divider'} type={'vertical'}/>
                    <Link to={'/register'} className={'text-white fs-15'}>
                        Register
                    </Link>
                </CheckLoginUserFalse>
                <CheckLoginUser>
                    <Link to={'/orders'} className={'text-white fs-15'}>
                        My Orders
                    </Link>
                </CheckLoginUser>
                <CheckLoginUser>
                    <Button loading={isLoading} type={'primary'} onClick={logoutUser}>
                        Logout
                    </Button>
                </CheckLoginUser>
                <Divider style={{borderBlockStart: '1px solid #fff', marginBlock: '0px'}} type={'horizontal'}/>
                <Space size={0} className={'w-100'}>
                    <Typography.Text className={'text-white fs-15'}>
                        Cart
                    </Typography.Text>
                    <Badge count={0} showZero overflowCount={99}>
                        <ShoppingCartOutlined className={'icon'}/>
                    </Badge>
                </Space>
            </Space>
        </Drawer>
    </Layout.Header>)
}

export default AppHeader;