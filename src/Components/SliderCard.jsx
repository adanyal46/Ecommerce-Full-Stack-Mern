import React from 'react';
import {Button, Card, Carousel, Divider, Typography} from 'antd';
import {sliderData} from "../data";

const contentStyle = {
    margin: 0,
    height: '683px',
    width: '100%',
    objectFit: 'cover',
    color: '#fff',

};
const slideContainer = {
    position: 'relative',
}
const cardStyle = {
    position: 'absolute',
    top: 'calc(50% - 450px)',
    left: 'calc(50% - 210px)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    zIndex: 1,
    background:'rgba(0,0,0,0.3)',
}
// const slideData = {
//     image: "https://i.ibb.co/D1TvpVL/white-shoe.jpg",
//     heading: "Shoes Villa",
//     desc: "Up to 30% off on all onsale proucts.",
// }
const SliderCard = () => {
    const onChange = (currentSlide) => {
        // console.log(currentSlide);
    };
    return (
        <Carousel afterChange={onChange} affect={'fade'} autoplay  autoplaySpeed={2000}>
            {sliderData.map((slideData, index) => (
                <div key={index}>
                    <div style={contentStyle}>
                        <img style={{ width: '100%',height:'100%', objectFit: 'cover' }} src={slideData.image} alt={slideData.heading} />
                    </div>
                    <div style={slideContainer}>
                        <Card style={cardStyle}>
                            <Typography.Title level={1} className={'text-lila l-2 text-white'}>
                                {slideData.heading}
                            </Typography.Title>
                            <Typography.Text className={'fs-16 text-white'}>
                                {slideData.desc}
                            </Typography.Text>
                            <Divider style={{ borderBlockStart: '1px solid #d4d4d4' }} />
                            <Button type={'primary'}>
                                Shop Now
                            </Button>
                        </Card>
                    </div>
                </div>
            ))}
        </Carousel>
    )
        ;
};
export default SliderCard;