import React from "react";
import {Button, Space, Typography} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";

const PageHeading = ({heading, btnText}) => {
    console.log(btnText)
    return (<Space className={'w-100 justify-between pb-20'}>
            <Typography.Title level={2} className={'text-lila my-0 l-2'}>
                {heading}
            </Typography.Title>
            {btnText ===  undefined ? null : <Button type={"dashed"}>
                {btnText} <DoubleRightOutlined/>
            </Button>}
        </Space>)
}

export default PageHeading;