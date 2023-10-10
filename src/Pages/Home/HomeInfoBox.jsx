import React from "react";
import {Card, Col, Row, Space, Typography} from "antd";
import {HomeInfo} from "../../data";

const HomeInfoBox = () => {
    return (
        <div className={'container'}>
            <Row gutter={[24,20]}>
                {HomeInfo.map((item, index) => {
                    const {icon, heading, desc} = item;
                    return (
                        <Col key={index} xs={24} md={12} lg={8} >
                            <Card style={{minHeight:'158px'}}>
                               <Space align={'start'}>
                                <img width={60} src={icon} alt={heading}/>
                                  <Space.Compact direction={'vertical'}>
                                      <Typography.Title level={4} className={'text-lila'}>
                                          {heading}
                                      </Typography.Title>
                                      <Typography.Text className={'fs-15'}>
                                          {desc}
                                      </Typography.Text>
                                  </Space.Compact>
                               </Space>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default HomeInfoBox;