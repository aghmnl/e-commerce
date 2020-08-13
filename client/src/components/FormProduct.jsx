import React from "react";
import React, { useState } from "react";
export default function FormProduct(props) {
	const [inputs, setInputs] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		img: "",
		category: "",
		cellar: "",
	});
	function handleSubmit(e) {
		e.preventDefault();
		//fetch a la api :
	}
	return (
		<form onSubmit={handleSubmit(e)}>
			<input type="text" key="name" placeholder="Nombre" onChange={e => setInputs({ ...inputs, name: e.target.value })} />
			<input type="number" step="0.1" key="price" placeholder="Precio" onChange={e => setInputs({ ...inputs, price: e.target.value })} />
			<textarea key="description" placeholder="Descripción" onChange={e => setInputs({ ...inputs, description: e.target.value })}></textarea>
			<input id="archivo" accept="image/x-png,image/gif,image/jpeg" type="file" key="img" onChange={e => setInputs({ ...inputs, img: e.target.value })} />
			<label for="archivo">Imagen</label>
			<input type="number" key="stock" placeholder="Cantidad" onChange={e => setInputs({ ...inputs, stock: e.target.value })} />
			<select id="category" onChange={e => setInputs({ ...inputs, category: e.target.value })}>
				<option value="Cat1">Categoría 1</option>
				<option value="Cat2">Categoría 2</option>
				<option value="Cat3">Categoría 3</option>
			</select>
			<select id="cellar">
				<option value="cell1">Bodega 1</option>
				<option value="cell2">Bodega 2</option>
				<option value="cell3">Bodega 3</option>
			</select>

			<button>Agregar</button>
		</form>
	);
}
