import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import SearchBar from "./SearchBar";
import "../styles/NavBar.css";
import { FiShoppingCart } from 'react-icons/fi';
// import { cellars, strains, products } from "../data.js";

export default function (props) {
	return (
		<Navbar bg="dark" variant="dark">
			<Link to="/"><Navbar.Brand>ToniWines</Navbar.Brand></Link>
			<Nav className="mr-auto">
				<Link to="/catalogue"><Navbar.Brand>Catálogo</Navbar.Brand></Link>
			</Nav>
			<SearchBar cb={props.cb}/>
			
				<Link to="/cart"><Navbar.Brand><FiShoppingCart/></Navbar.Brand></Link>
			
		</Navbar>
	);
}
