import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import SearchBar from "./SearchBar";
import "../styles/NavBar.css";
// import { cellars, strains, products } from "../data.js";

export default function (props) {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="/">ToniWines</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/catalogue">Catálogo</Nav.Link>
			</Nav>
			<SearchBar cb={props.cb}/>
		</Navbar>
	);
}
