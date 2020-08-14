import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/NavBar.css";
export default function (props) {
	return (
		<div>
			<nav className="navbar navbar-dark bg-dark">
				<Link to="/catalogue">
					<span className="navbar-brand">Catalogo</span>
				</Link>
				<Link to="/admin/formProduct">
					<span className="navbar-brand">CRUD Productos</span>
				</Link>
				<Link to="/admin/formCategory">
					<span className="navbar-brand">Agregar Categoria</span>
				</Link>
				<SearchBar />
			</nav>
		</div>
	);
}
