import React from "react";
import {Avatar, Button, Card, Space, Typography} from "antd";
import {shortenText} from "../utils";

const {Meta} = Card;
const CarouselItem = ({url, name, price, description,index}) => {
    return (
        <Card
            style={{marginRight:'12px'}}
            key={index}
            cover={
                <img
                    style={{height: '220px', objectFit: 'cover'}}
                    alt={name}
                    src={url}
                />
            }
            actions={[
                <Button type={'primary'} block={true}>Add to cart</Button>,
            ]}
        >
            <Meta
                title={[
                    <Space className={'justify-between w-100'} key={index}>
                        <Typography.Title className={'my-0'} level={5}>
                            {shortenText(name, 15)}
                        </Typography.Title>
                        <Typography.Title className={'my-0 text-lila'} level={3}>
                            {price}
                        </Typography.Title>
                    </Space>
                ]}
                description={[
                    <Typography.Text type={"secondary"}>
                        {shortenText(description,52)}
                    </Typography.Text>
                ]}
            />
        </Card>
    )
}

export default CarouselItem;