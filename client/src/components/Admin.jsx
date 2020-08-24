import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
export default function Admin() {
	return (
		<Nav id="navegacion">
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formProduct">Productos</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formCategory">Categorías</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formCellar">Bodegas</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formStrain">Cepas</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/formUser">Usuarios</NavLink>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/admin/purchases">Compras</NavLink>
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}
