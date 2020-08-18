import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import SearchBar from "./SearchBar";
import "../styles/NavBar.css";
// import { cellars, strains, products } from "../data.js";

export default function (props) {
	return (
		<Navbar bg="dark" variant="dark">
			<Link to="/"><Navbar.Brand href="/">ToniWines</Navbar.Brand></Link>
			<Nav className="mr-auto">
				<Link to="/catalogue">Catálogo</Link>
			</Nav>
			<SearchBar cb={props.cb}/>
		</Navbar>
	);
}
