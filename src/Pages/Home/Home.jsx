import React from "react";
import SliderCard from "../../Components/SliderCard";
import HomeInfoBox from "./HomeInfoBox";
import PageHeading from "../../Components/PageHeading";
import ProductCarousel from "./ProductCarousel";
import {categoryData, productData} from "../../data";
import CarouselItem from "../../Components/CaurouselItem";
import CategoryCarousel from "./CategoryCarousel";
import CategoryItem from "../../Components/CategoryItem";
import {Typography} from "antd";
import HomeLinks from "./HomeLink";

const Home = () => {
    const products = productData.map((item, index) => {
        return (
            <div key={index}>
                <CarouselItem index={index} url={item.imageurl} name={item.name} description={item.description}
                              price={item.price}
                />
            </div>
        )
    })
    const categories = categoryData.map((item, index) => {
        return (
            <div key={item.key}>
                <CategoryItem url={item.imageUrl} name={item.title} index={index}/>
            </div>
        )
    })
    return (
        <div>
            <SliderCard/>
            <div className="container pb-40">
                <div style={{paddingTop: '40px'}}>
                    <PageHeading heading={'Latest Categorys'}/>
                </div>
                <CategoryCarousel categories={categories}/>
                <PageHeading heading={'Latest Products'} btnText={'Shop Now'}/>
                <ProductCarousel products={products}/>
            </div>
            <div className="container pb-20">
                <Typography.Title level={2} className={'text-lila my-0 l-2'}>
                    Services
                </Typography.Title>
            </div>
            <HomeInfoBox/>
            <div className="container" style={{paddingTop: '40px'}}>
                <PageHeading heading={'Mobile Phones'} btnText={'Shop Now'}/>
                <ProductCarousel products={products}/>
            </div>
            <div style={{paddingTop: '40px'}}>
                <HomeLinks/>
            </div>
        </div>
    )
}

export default Home;