import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {responsive} from "../../data";

const CategoryCarousel = ({categories}) => {
    return (
        <div style={{paddingBottom:'30px'}}>
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
                {categories}
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;