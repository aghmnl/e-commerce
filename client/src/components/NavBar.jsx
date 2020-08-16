import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import "../styles/NavBar.css";
// import { cellars, strains, products } from "../data.js";

export default function (props) {
	// const [inputs, setInputs] = use<Nav.Link href="/">ToniWines</Nav.Link>
	// 	name: "",
	// 	description: "",
	// 	price: "",
	// 	stock: "",
	// 	img: "",
	// 	categoryId: "",
	// 	cellarId: "",
	// 	strainId: "",
	// 	active: true,
	// });

	// cellars.forEach(cellar => {
	// 	setInputs({ ...inputs, name: cellar.name });
	// 	setInputs({ ...inputs, description: cellar.description });
	// 	setInputs({ ...inputs, price: cellar.price });
	// 	setInputs({ ...inputs, stock: cellar.stock });
	// 	setInputs({ ...inputs, name: cellar.name });
	// 	setInputs({ ...inputs, name: cellar.name });
	// });

	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="catalogue">ToniWines</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/catalogue">Catálogo</Nav.Link>
				<Nav.Link href="/admin/formProduct">Formulario Producto</Nav.Link>
				<Nav.Link href="/admin/formCategory">Formulario Categoría</Nav.Link>
				<Nav.Link href="/admin/formCellar">Formulario Bodegas</Nav.Link>
				<Nav.Link href="/admin/formStrain">Formulario Cepas</Nav.Link>
			</Nav>
			<Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<Button variant="outline-info">Search</Button>
			</Form>
		</Navbar>
	);
}
