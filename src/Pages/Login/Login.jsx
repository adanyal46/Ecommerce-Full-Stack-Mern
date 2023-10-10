import {Button, Card, Col, Form, Input, message, Row, Space, Typography} from "antd";
import loginImage from '../../assets/Wavy_Tech-28_Single-10.jpg'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {login, RESET_AUTH} from "../../redux/features/auth/authSlice";

function Login() {
    const [form] = Form.useForm();
    const {isLoading, isSuccess, isLoggedIn} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && isLoggedIn) {
            navigate('/')
        }

        dispatch(RESET_AUTH())
    }, [isSuccess, isLoggedIn, dispatch, navigate]);
    const handleLogin = async (values) => {
        await dispatch(login(values));
        form.resetFields();

    }
    return (
        <div style={{paddingBlock: '30px'}}>
            <Card bodyStyle={{padding: 0}} style={{maxWidth: '1000px', marginInline: 'auto'}}>
                <Row gutter={[24, 20]} align={'middle'}>
                    <Col xs={0} md={12}>
                        <img src={loginImage} className={'w-100'} style={{height: '100%'}} alt=""/>
                    </Col>
                    <Col xs={24} md={12} style={{paddingBlock: '20px', paddingRight: '40px'}}>
                        <Typography.Title level={2} className={'text-lila my-0'}>
                            Login into your account
                        </Typography.Title>
                        <Form onFinish={handleLogin} layout={'vertical'} style={{marginTop: '20px'}}>
                            <Form.Item label={'Email address'} name={'email'} rules={[{required: true, type: 'email'}]}>
                                <Input size={'large'}/>
                            </Form.Item>
                            <Form.Item label={'Password'} name={'password'} rules={[{required: true, min: 6}]}>
                                <Input.Password size={'large'}/>
                            </Form.Item>
                            <Button loading={isLoading} block={true} size={'large'} htmlType={'submit'}
                                    type={'primary'}>
                                Login
                            </Button>
                            <div className="text-center block mt-2">
                                <Typography.Text>
                                    Not an account ?
                                    <Link to={'/register'}>
                                        {' '} Register
                                    </Link>
                                </Typography.Text>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Login;
