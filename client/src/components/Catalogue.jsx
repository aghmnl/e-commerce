import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import Nav from "react-bootstrap/Nav";
import "../styles/Catalogue.css";
export default function Catalogue({ products, getproductos, category }) {
	// ATENCIÓN ESTO ES HARDCODEO
	var products = [
		{ id: 15, name: "Vino bueno", price: 15000, cellar: "Bodegas mendocinas", img: "https://i.ibb.co/jhJXXRv/Botella-vino-1.jpg" },
		{ id: 16, name: "El mejor vino", price: 15000, cellar: "Bodegas sanjuaninas", img: "https://i.ibb.co/jhJXXRv/Botella-vino-1.jpg" },
	];
	useEffect(() => {
		getproductos(category);
	}, []);
	// FIN HARDCODEO

	// ATENCIÓN, acá debería tomar todas las categorías y mostrarlas

	return (
		<div>
			<Nav id="navegacion" activeKey="/catalogue/category/1">
				<Nav.Item>
					<Nav.Link href="/catalogue/category/1">Tintos</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href="/catalogue/category/2">Blancos</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href="/catalogue/category/3">Rosé</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href="/catalogue/category/4">Espumantes</Nav.Link>
				</Nav.Item>
			</Nav>
			<div className="row">
				<div className="col-2">
					{/* Acá va a selececcionar las cepas
					<Form>
						{["checkbox"].map(type => (
							<div key={`default-${type}`} className="mb-3">
								<Form.Check type={type} id={`default-${type}`} label={`default ${type}`} />
							</div>
						))}
					</Form> */}
				</div>
				<div className="col-10 catalogue">
					{products.map(({ id, name, price, cellar, img }) => (
						<ProductCard id={id} name={name} price={price} cellar={cellar} img={img} />
					))}
				</div>
			</div>
		</div>
	);
}
