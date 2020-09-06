import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import "../styles/NavBar.css";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser,FaSignInAlt  } from "react-icons/fa";
// https://react-icons.github.io/react-icons/

function NavBar() {
	const { logged, admin, user_info } = useSelector(state => state);

	return (
		<Navbar id="navMain" bg="dark" variant="dark">
			<Nav>
				<Navbar.Brand as={Link} to="/" >ToniWines</Navbar.Brand>
				<Nav>
					<Nav.Link as={Link} to="/catalogue/0">Catálogo</Nav.Link>
				</Nav>
				<Nav>
					{logged && (
						<Nav.Link as={Link} to="/user/purchases">Mis compras</Nav.Link>
					)}
				</Nav>
				<Nav>
					{admin && (
						<Nav.Link as={Link} to="/admin">Formularios</Nav.Link>
					)}
				</Nav>
			</Nav>
			<Nav id="navega">
				<Nav>
					<Navbar.Brand as={Link} to="/login">
						{
							(()=>{
								if(logged){
									if(!!user_info && !user_info.imgProfile)
										return(<span><FaUser/>{user_info.alias}</span>);
									return(!!user_info && 
										<span>
										<Image style={{width:"2rem"}} src={user_info.imgProfile} roundedCircle />
											{user_info.alias}
										</span>
									)
								}
								return(<FaSignInAlt/>)
							})()
						}
					</Navbar.Brand>
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
