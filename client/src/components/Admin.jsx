import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";

export default function Admin() {
	return (
		<Nav id="navegacion">
			<Nav.Item>
				<Nav.Link href="/admin/formProduct">Formulario Producto</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="/admin/formCategory">Formulario Categoría</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="/admin/formCellar">Formulario Bodegas</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="/admin/formStrain">Formulario Cepas</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}
