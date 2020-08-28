import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
// https://react-icons.github.io/react-icons/

export default function (props) {
	return (
		<Navbar bg="dark" variant="dark">
			<Link to="/">
				<Navbar.Brand>ToniWines</Navbar.Brand>
			</Link>
			<Nav className="mr-auto">
				<Link to="/catalogue/0">
					<Navbar.Brand>Catálogo</Navbar.Brand>
				</Link>
			</Nav>
			<NavLink id="login" to="/login">
				<Navbar.Brand>
					<FaUser></FaUser>
				</Navbar.Brand>
			</NavLink>
			<SearchBar cb={props.cb} />

			<Link to="/cart">
				<Navbar.Brand>
					<FiShoppingCart id="carrito" />
				</Navbar.Brand>
			</Link>
		</Navbar>
	);
}
