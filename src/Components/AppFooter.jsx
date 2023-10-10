import React from "react";
import {Layout, Typography} from "antd";

const AppFooter = () => {
    const year = new Date().getFullYear();
    return (
        <Layout.Footer
            style={{backgroundColor: '#001529', textAlign: 'center', position: 'sticky', width: '100%'}}>
            <Typography.Text className={'text-white'}>
                &copy; {year} All Rights Reserved
            </Typography.Text>
        </Layout.Footer>
    )
}

export default AppFooter;