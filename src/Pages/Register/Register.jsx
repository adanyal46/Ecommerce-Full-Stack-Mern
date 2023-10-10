import {Button, Card, Col, Form, Input, message, Row, Space, Typography} from "antd";
import registerImage from '../../assets/Data_security_01.jpg'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register, RESET_AUTH} from "../../redux/features/auth/authSlice";
import {useEffect} from "react";

function Register() {
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
    const handleRegister = async (values) => {
        if (values['password'] !== values['cPassword']) {
            message.error('Password is not match')

        } else {
            await dispatch(register(values));
            form.resetFields();
        }
    }

    return (
        <div style={{paddingBlock: '30px'}}>
            <Card bodyStyle={{padding: 0}} style={{maxWidth: '1000px', marginInline: 'auto'}}>
                <Row gutter={[24, 20]}>
                    <Col xs={0} md={12}>
                        <img src={registerImage} className={'w-100'} style={{height: '100%'}} alt=""/>
                    </Col>
                    <Col xs={24} md={12} style={{paddingBlock: '20px', paddingRight: '40px'}}>
                        <Typography.Title level={2} className={'text-lila my-0'}>
                            Register an account
                        </Typography.Title>
                        <Typography.Text type={"secondary"}>
                            To buy product to register an account
                        </Typography.Text>
                        <Form form={form} onFinish={handleRegister} layout={'vertical'} style={{marginTop: '20px'}}>
                            <Form.Item label={'Name'} name={'name'} rules={[{required: true}]}>
                                <Input size={'large'}/>
                            </Form.Item>
                            <Form.Item label={'Email address'} name={'email'} rules={[{required: true, type: 'email'}]}>
                                <Input size={'large'}/>
                            </Form.Item>
                            <Form.Item label={'Password'} name={'password'} rules={[{required: true}]}>
                                <Input.Password size={'large'}/>
                            </Form.Item>
                            <Form.Item label={'Confirm Password'} name={'cPassword'} rules={[{required: true}]}>
                                <Input.Password size={'large'}/>
                            </Form.Item>
                            <Button loading={isLoading} block={true} size={'large'} htmlType={'submit'}
                                    type={'primary'}>
                                Register Now
                            </Button>
                            <div className="text-center block mt-2">
                                <Typography.Text>
                                    Already have an account ?
                                    <Link to={'/login'}>
                                        {' '} Login
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

export default Register;
