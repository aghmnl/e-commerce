import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

// https://react-icons.github.io/react-icons/

function NavBar() {
	const { logged, admin, user_info } = useSelector(state => state);

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
				<Nav>
					{admin && (
						<Link to="/admin">
							<Navbar.Brand>Formularios</Navbar.Brand>
						</Link>
					)}
				</Nav>
			</Nav>
			<Nav id="navega">
				<Nav>
					<Link to="/login">
						<Navbar.Brand>
							{(() => {
								if (logged) {
									if (!!user_info && !user_info.imgProfile)
										return (
											<span>
												<AiOutlineUser
													style={{ transform: "scale(1.4)", marginBottom: "0.2rem", marginRight: "0.2rem" }}
												/>{" "}
												{user_info.alias}
											</span>
										);
									return (
										!!user_info && (
											<span>
												<Image style={{ width: "2rem" }} src={user_info.imgProfile} roundedCircle /> &nbsp;
												{user_info.alias}
											</span>
										)
									);
								}
								return <AiOutlineUser style={{ transform: "scale(1.8)", marginBottom: "0.2rem" }} />;
							})()}
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

export default connect(({ logged, admin }) => {
	return {
		logged,
		admin,
	};
})(NavBar);
