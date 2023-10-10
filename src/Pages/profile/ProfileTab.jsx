import React, {useState} from 'react';
import {Steps} from 'antd';
import Profile from "./Profile";
import Wallet from "./Wallet";
import Wishlist from "./Wishlist";

const ProfileTab = () => {
    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    return (
        <div className={'container py-40'}>
            <Steps
                current={current}
                onChange={onChange}
                items={[
                    {
                        title: 'Profile',
                        description: 'Update profile information'
                    },
                    {
                        title: 'Wallet',
                        description: 'Update wallet information'
                    },
                    {
                        title: 'Wishlist',
                        description: 'See wishlist things'
                    },
                ]}
            />
            <div style={{marginTop:'20px'}}>
                {current === 0 && <Profile/>}
                {current === 1 && <Wallet/>}
                {current === 2 && <Wishlist/>}
            </div>
        </div>
    );
};
export default ProfileTab;