import React from "react";
import { Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function User() {
	const history = useHistory();
	return (
		<Nav id="navegacion">
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/user/purchases">Compras</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item style={{ marginLeft: "auto", paddingRight: "1rem", paddingTop: "0.2rem" }}>
				<Button
					variant="primary"
					onClick={() => {
						axios
							.get(`http://localhost:3001/auth/logout`)
							.then(() => {
								history.replace("/");
							})
							.catch(err => console.log("error", err));
						return;
					}}
				>
					<RiLogoutBoxRLine style={{ transform: "scale(1.4)", marginBottom: "0.3rem" }}></RiLogoutBoxRLine>
				</Button>
			</Nav.Item>
		</Nav>
	);
}
