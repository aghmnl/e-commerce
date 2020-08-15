import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import "../styles/NavBar.css";
export default function (props) {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="#catalogue">ToniWines</Navbar.Brand>
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
