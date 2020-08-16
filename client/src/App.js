import React, { useState, useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Catalogue from "./components/Catalogue";
import FormProduct from "./components/FormProduct";
import Product from "./components/Product";
import FormCategory from "./components/FormCategory";
import FormCellar from "./components/FormCellar";
import FormStrain from "./components/FormStrain";
import NavBar from "./components/NavBar";
import { CardGroup, Card, Nav } from "react-bootstrap";
function App() {
	const [products, setProducts] = useState([]);
	function filtrarProduct(id) {
		let producto = products.filter(product => product.id === parseInt(id));
		return producto[0];
	}
	function getProductos(category) {
		const url = "http://localhost:3000/products";
		fetch(url)
			.then(r => r.json())
			.then(products => {
				if (!category) return setProducts(products);
				const productsCategory = products.filter(product => product.categoryId === parseInt(category));
				setProducts(productsCategory);
			});
	}
	return (
		<div className="App">
			<Route path="/" render={() => <NavBar />} />
			<Route exact path="/catalogue/category/:categoryId" render={({ match }) => <Catalogue products={products} getProductos={getProductos} category={match.params.categoryId} />} />
			<Route exact path="/catalogue" render={() => <Catalogue products={products} getProductos={getProductos} category={null} />} />
			<Route exact path="/admin/formProduct" render={() => <FormProduct products={products} getProductos={getProductos} filtrarProduct={null} id={null} edit={false} />} />
			<Route
				exact
				path="/admin/formProduct/edit/:id"
				render={({ match }) => <FormProduct products={products} getProductos={getProductos} filtrarProduct={filtrarProduct} id={match.params.id} edit={true} />}
			/>
			<Route exact path="/admin/formCategory" component={FormCategory} />
			<Route exact path="/admin/formCellar" component={FormCellar} />
			<Route exact path="/admin/formStrain" component={FormStrain} />
			<Route exact path="/product/:id" render={({ match }) => <Product id={match.params.id} filtrarProduct={filtrarProduct} />} />
			<Card id="logo">
				<Card.Img variant="top" src="https://i.ibb.co/sJKD7q1/Sin-t-tulo-2.png " />
			</Card>
			<CardGroup id="categorias">
				<Card>
					<Nav.Link href="/catalogue/category/1">
						<Card.Img variant="top" src="https://i.ibb.co/p3S1zX2/red-wine-benefits-1592243220.jpg" />

						<Card.Body>
							<Card.Title>Tintos</Card.Title>
						</Card.Body>
					</Nav.Link>
				</Card>
				<Card>
					<Nav.Link href="/catalogue/category/2">
						<Card.Img variant="top" href="/catalogue/category/2" src="https://i.ibb.co/87HwZx7/istock-1147260427.jpg" />
						<Card.Body>
							<Card.Title href="/catalogue/category/2">Blancos</Card.Title>
						</Card.Body>
					</Nav.Link>
				</Card>
				<Card>
					<Nav.Link href="/catalogue/category/3">
						<Card.Img variant="top" href="/catalogue/category/3" src="https://i.ibb.co/dbRbL0Z/rose-wine-splashing-on-white-background.jpg" />
						<Card.Body>
							<Card.Title href="/catalogue/category/3">Rosé</Card.Title>
						</Card.Body>
					</Nav.Link>
				</Card>
				<Card>
					<Nav.Link href="/catalogue/category/4">
						<Card.Img variant="top" href="/catalogue/category/4" src="https://i.ibb.co/CBjkSDD/champagne-verre-1-1024x682.jpg" />
						<Card.Body>
							<Card.Title href="/catalogue/category/4">Espumantes</Card.Title>
						</Card.Body>
					</Nav.Link>
				</Card>
			</CardGroup>
		</div>
	);
}

export default App;
