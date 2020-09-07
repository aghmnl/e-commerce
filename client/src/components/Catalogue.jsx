import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { connect, useDispatch } from "react-redux";
import {
	getCategories,
	getCatalogue,
	getProducts,
	cleanCatalogue,
	searchProduct,
	getStrain,
	getStrainsBy,
} from "../store/actions/index";
import { Nav, Spinner, Pagination, Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/Catalogue.css";
function Catalogue({
	category,
	products,
	categories,
	getCatalogue,
	cleanCatalogue,
	getCategories,
	getProducts,
	getStrainsBy,
	searchProduct,
	strains,
	pag,
	pags,
}) {
	const [Strains, setStrains] = useState([]);
	const [despensa, setDespensa] = useState(<Spinner animation="border" />);
	const location = useLocation();
	useEffect(() => {
		if (!pag) return;
		getCatalogue(pag);
		return () => {
			cleanCatalogue();
		};
	}, [pag]);
	useEffect(() => {
		if (!category) return;
		getProducts(category);
		getStrainsBy(category);
		setStrains([]);
	}, [category]);
	useEffect(() => {
		document.body.id = "bg_cat";
		getCategories();
	}, []);
	useEffect(() => {
		if (!location.search) return;
		const searchParams = new URLSearchParams(location.search);
		searchProduct(searchParams.get("search"));
	}, [location]);
	useEffect(() => {
		if (!category) return;
		if (!Strains.length) getProducts(category);
		else getProducts(category, Strains);
	}, [Strains]);
	function handleChange(e) {
		if (Strains.includes(e.target.value)) setStrains(Strains.filter(s => s !== e.target.value));
		else setStrains([...Strains, e.target.value]);
	}
	return (
		<div style={{ marginTop: "8rem" }}>
			<Nav id="navegacion" activeKey="/catalogue/category/1">
				<Nav.Item>
					<Nav.Link>
						<NavLink style={{ color: "darkgreen" }} to="/catalogue/0">
							Todos
						</NavLink>
					</Nav.Link>
				</Nav.Item>
				{categories.map(category => (
					<Nav.Item>
						<Nav.Link>
							<NavLink to={`/catalogue/category/${category.id}`} activeClassName="categoriaElegida">
								{category.name}
							</NavLink>
						</Nav.Link>
					</Nav.Item>
				))}
			</Nav>
			<Container>
				<Row>
					<Col>
						<div className="catalogue">
							{products.length
								? products.map(product => (
										<ProductCard
											id={product.id}
											name={product.name}
											price={product.price}
											cellar={product.cellar}
											img={product.img}
											raiting={product.raiting}
										/>
								  ))
								: (() => {
										setInterval(() => {
											setDespensa(<h1>Sin resultados :C</h1>);
										}, 3000);
										return (<Card style={{margin:"8rem auto"}} ><Card.Body>{despensa}</Card.Body></Card>);
								  })()}
						</div>
						{!pag && !!strains && (
							<Card className="strains">
								<Card.Body>
									<Form onChange={handleChange}>
										{strains.map(strain => (
											<Form.Check
												custom
												type="checkbox"
												id={`strain_${strain.id}`}
												label={strain.name}
												value={strain.id}
											/>
										))}
									</Form>
								</Card.Body>
							</Card>
						)}
					</Col>
				</Row>
				<Row sm="1">
					{(() => {
						if (!products) return;
						let active = pag;
						let buttons = [];
						for (let i = 0; i < Math.ceil(pags / 10); i++) {
							buttons.push(
								<Pagination.Item key={i + 1} active={i === parseInt(active)}>
									<NavLink to={"/catalogue/" + i}>{i + 1}</NavLink>
								</Pagination.Item>
							);
						}

						const paginationBasic = (
							<div>
								<Pagination>{buttons}</Pagination>
								<br />
							</div>
						);
						return paginationBasic;
						// return buttons.map(button => button);
					})()}
				</Row>
			</Container>
		</div>
	);
}
export default connect(
	({ catalogue, products, categories, strains_by }) => {
		return {
			pags: catalogue.count,
			products: !Object.values(catalogue).length ? products : catalogue.rows,
			categories: categories,
			strains: strains_by,
		};
	},
	{
		getCategories,
		getCatalogue,
		cleanCatalogue,
		getProducts,
		searchProduct,
		getStrainsBy,
	}
)(Catalogue);
