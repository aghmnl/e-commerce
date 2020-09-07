import React, { useState, useEffect } from "react";
import "../styles/Admin.css";
import { Nav, Button } from "react-bootstrap";
import { FaPowerOff } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { isAuth, isAdmin } from "../store/actions/index";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
export default function Admin() {
	const dispatch = useDispatch();
	const history = useHistory();
	return (
		<Nav id="navegacion">
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formProduct" activeClassName="formSel">Productos</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formCategory" activeClassName="formSel">Categorías</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formCellar" activeClassName="formSel">Bodegas</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formStrain" activeClassName="formSel">Cepas</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formUser" activeClassName="formSel">Usuarios</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formPurchase" activeClassName="formSel">Compras</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item style={{ marginLeft: "auto", marginRight: "1rem", marginTop: "0.1rem", marginBottom: "0.1rem" }}>
				<Button
					variant="primary"
					onClick={() => {
						axios
							.get(`http://localhost:3001/auth/logout`, { withCredentials: true })
							.then(() => {
								history.replace("/");
								dispatch(isAuth());
								dispatch(isAdmin());
							})
							.catch(err => console.log("error", err));
						return;
					}}
				>
					<FaPowerOff style={{ transform: "scale(1.3)" }}></FaPowerOff>
				</Button>
			</Nav.Item>
		</Nav>
	);
}
