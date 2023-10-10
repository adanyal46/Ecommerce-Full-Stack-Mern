import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Input, message, Row, Spin, Typography, Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getUser, updateUser, updateUserPhoto} from "../../redux/features/auth/authSlice";
import {shortenText} from "../../utils";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const cloud_name = process.env.REACT_APP_CLOUD_NAME || 'dp9cgsezv';
const cloud_upload = process.env.REACT_APP_UPLOAD_PRESET || 'umkci45j';
const URL_IMAGE_UPLOAD = 'https://api.cloudinary.com/v1_1/dp9cgsezv/image/upload'
const Profile = () => {
    let [form] = Form.useForm();
    const {user, isLoading, isSuccess} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    useEffect(() => {
        if (user === null) {
            dispatch(getUser());
        } else {
            form.setFieldValue('name', user?.name)
            form.setFieldValue('photo', user?.photo)
            form.setFieldValue('email', user?.email)
            form.setFieldValue('address', user?.address?.address)
            form.setFieldValue('phone', user?.phone)
            form.setFieldValue('state', user?.address?.state)
            form.setFieldValue('country', user?.address?.country)
            form.setFieldValue('role', user?.role)
            setImageUrl(user.photo)
        }
    }, [user, dispatch, form])

    const profileHandle = async (values) => {
        const userData = {
            name: values['name'],
            phone: values['phone'],
            address: {
                address: values['address'],
                country: values['country'],
                state: values['state'],
            },
        }

        await dispatch(updateUser(userData))

    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const handleChange = async (info) => {
        if (info.fileList.length > 0) {
            const latestFile = info.fileList[info.fileList.length - 1]
            getBase64(latestFile.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
            const formData = new FormData();
            formData.append('file', latestFile.originFileObj);
            formData.append('cloud_name', cloud_name);
            formData.append('upload_preset', cloud_upload);
            const response = await fetch(URL_IMAGE_UPLOAD, {method: 'POST', body: formData})
            if (response.status === 200) {
                message.success('Photo Upload Successfully');
                const imageData = await response.json();
                const userData = {
                    photo: imageData.url
                }
                await dispatch(updateUserPhoto(userData));
            } else {
                message.error('Some server issues...');
            }


        }
    };
    return (
        <Card>
            <Typography.Title level={2}>
                Profile
            </Typography.Title>
            {isLoading ? <Spin/> : isSuccess ?
                <Form onFinish={profileHandle} form={form} layout={'vertical'}>
                    <Row gutter={24}>
                        <Col xs={24}>
                            <Form.Item label={'Upload Photo'} name={'photo'}>
                                <Upload multiple={false} name="photo" listType="picture-circle" showUploadList={false}
                                        beforeUpload={() => false} onChange={handleChange}>
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="avatar"
                                            style={{
                                                width: '100%',
                                                height:'100px',
                                                borderRadius: '80px'
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label={'Name'} name={'name'}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label={'Email Address'} name={'email'}>
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label={'Phone Number'} name={'phone'}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label={'Address'} name={'address'}>
                                <Input.TextArea/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label={'State'} name={'state'}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label={'Country'} name={'country'}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label={'Role'} name={'role'}>
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} className={'text-right'}>
                            <Button loading={isLoading} htmlType={'submit'} type={'primary'}>
                                Update Profile
                            </Button>
                        </Col>
                    </Row>
                </Form> : <Spin/>}
        </Card>
    );
};

export const UserName = () => {
    const {user, isLoading, isSuccess} = useSelector((state) => state.auth)

    return (
        <>
            {isLoading ? <Spin/> : <Typography.Text style={{color:'orange'}} className={'fs-15'}>
                {shortenText(user !== null && `Hi, ${user.name}`,15)}
            </Typography.Text>}
        </>
    )
}
export default Profile;