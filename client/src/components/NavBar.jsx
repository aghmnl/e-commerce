import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
// https://react-icons.github.io/react-icons/

function NavBar() {
	const { logged } = useSelector(state => state);

	return (
		<Navbar id="navMain" bg="dark" variant="dark">
			<Nav>
				<Link to="/">
					<Navbar.Brand>ToniWines</Navbar.Brand>
				</Link>
				<Nav>
					<Link to="/catalogue/0">
						<Navbar.Brand>Catálogo</Navbar.Brand>
					</Link>
				</Nav>
				<Nav>
					{logged && (
						<Link to="/user/purchases">
							<Navbar.Brand>Mis compras</Navbar.Brand>
						</Link>
					)}
				</Nav>
			</Nav>
			<Nav id="navega">
				<Nav>
					<Link to="/login">
						<Navbar.Brand>
							<FaUser></FaUser>
						</Navbar.Brand>
					</Link>
				</Nav>
				<SearchBar />

				<Link to="/cart">
					<Navbar.Brand>
						<FiShoppingCart id="carrito" />
					</Navbar.Brand>
				</Link>
			</Nav>
		</Navbar>
	);
}

export default connect(({ logged }) => {
	return {
		logged,
	};
})(NavBar);
