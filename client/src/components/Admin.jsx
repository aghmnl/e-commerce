import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
export default function Admin() {
	return (
		<Nav id="navegacion">
			<Nav.Item>
				<NavLink to="/admin/formProduct">Formulario Producto</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="/admin/formCategory">Formulario Categoría</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="/admin/formCellar">Formulario Bodegas</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="/admin/formStrain">Formulario Cepas</NavLink>
			</Nav.Item>
		</Nav>
	);
}
