import React from "react";
import {Button, Card, Col, Row, Space, Typography} from "antd";
import facebook from '../../assets/facebook.png';
import twitter from '../../assets/twitter.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';
import {Link} from "react-router-dom";
import {footerLinks} from "../../data";

const HomeLinks = () => {
    return (
        <div>
            <Card className={'custom__card'}>
                <div className="container">
                    <Space className={'w-100 justify-between'}>
                        <Space size={'large'}>
                            <Link to={'/'}>
                                <img src={facebook} width={40} alt=""/>
                            </Link>
                            <Link to={'/'}>
                                <img src={twitter} width={40} alt=""/>
                            </Link>
                            <Link to={'/'}>
                                <img src={instagram} width={40} alt=""/>
                            </Link>
                            <Link to={'/'}>
                                <img src={youtube} width={40} alt=""/>
                            </Link>
                        </Space>
                        <Typography.Title level={1} className={'text-lila my-0 text-white'}>
                            Let's Talk?
                        </Typography.Title>
                        <Space>
                            <Button type={'dashed'} className={'fs-16'}>
                                Make an enquiry!
                            </Button>
                        </Space>
                    </Space>
                </div>
            </Card>
            <Card className={'custom__card'}>
                <Row gutter={[24, 20]} align={'middle'}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Typography.Title level={3} className={'text-lila text-white l-5 my-0'}>
                            SHOP-DANI
                        </Typography.Title>
                        <Typography.Text className={'text-white'}>
                            Shop our curated collection of fashion, electronics, home essentials, and more. Find
                            unbeatable deals, top brands, and personalized recommendations. Elevate your shopping
                            experience with us today and discover the latest trends in style and technology.
                        </Typography.Text>
                    </Col>
                    {footerLinks.map((item, index) => {
                        const {heading, links} = item;
                        return (
                            <Col xs={24} sm={12} md={8} lg={6} key={index}>
                                <Typography.Title underline className={'text-white fs-16 '}>
                                    {heading}
                                </Typography.Title>
                                <Space direction={'vertical'} key={index} style={{marginTop: '10px'}}>
                                    {links.map((item, index) => (
                                        <Link key={index} to={'/'} className={'fs-15 text-white'}>
                                            {item}
                                        </Link>
                                    ))}
                                </Space>
                            </Col>
                        )
                    })}
                </Row>

            </Card>
        </div>
    )
}

export default HomeLinks;