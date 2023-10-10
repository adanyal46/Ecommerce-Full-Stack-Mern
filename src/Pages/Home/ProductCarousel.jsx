import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {responsive} from "../../data";
import CarouselItem from "../../Components/CaurouselItem";

const ProductCarousel = ({products}) => {
    return (
        <div >
            <Carousel
                showDots={false}
                items={1}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                customTransition={'all 500ms ease'}
                transitionDuration={1000}
            >
                {products}
            </Carousel>
        </div>
    )
}

export default ProductCarousel;