import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
export default function User() {
	return (
		<Nav id="navegacion">
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/user/purchases">Compras</NavLink>
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}
