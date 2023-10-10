import React from "react";
import {Button, Card, Typography} from "antd";

const CategoryItem = ({url, name, index}) => {
    return (
        <Card
            key={index}
            style={{marginRight: '12px',}}
            title={[
                <Typography.Title className={'text-lila'} level={4}>
                    {name}
                </Typography.Title>
            ]}
            bodyStyle={{padding: 0}}
            cover={
                <img
                    style={{height: '200px', objectFit: 'cover', borderRadius: 0}}
                    alt={name}
                    src={url}
                />
            }
        />

    )
}

export default CategoryItem;