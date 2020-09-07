import React, { useEffect } from "react";
//import Carousel from 'react-bootstrap/Carousel'
import ProductCardCarousel from "./ProductCardCarousel";
import Carousel from "react-multi-carousel";
import { connect } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import "../styles/CarouselSlider.css";
import { getProducts } from "../store/actions/index";
function ControlledCarousel({ products, getProducts }) {
	useEffect(() => {
		async function fetchData() {
			await getProducts();
		}
		fetchData();
	}, []);

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 5,
			slidesToSlide: 3, // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
		},
	};

	return (
		<div className="ajust">
			{/* <div className={"p-5 text-center"}>
				<h2 style={{ color: "white" }}>Más vendidos</h2>
			</div> */}
			<br />
			<Carousel
				swipeable={true}
				draggable={false}
				showDots={true}
				responsive={responsive}
				ssr={true} // means to render carousel on server-side.
				infinite={true}
				autoPlay={true}
				autoPlaySpeed={1900}
				keyBoardControl={true}
				customTransition="all .5"
				transitionDuration={500}
				containerClass="carousel-container"
				removeArrowOnDeviceType={["tablet", "mobile"]}
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px"
			>
				{products.map(e => {
					return (
						<div>
							<ProductCardCarousel id={e.id} name={e.name} img={e.img}></ProductCardCarousel>
						</div>
					);
				})}
			</Carousel>
		</div>
	);
}
export default connect(
	function ({ products }) {
		return {
			products,
		};
	},
	{ getProducts }
)(ControlledCarousel);
