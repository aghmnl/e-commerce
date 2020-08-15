import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function FormStrain() {
	const [inputs, setInputs] = useState({
		name: "",
	});
	const [category, setCategory] = useState([]);
	function handleSubmit(e) {
		e.preventDefault();
		//fetch a la api :
		const url = "http://localhost:3000/cellar";
		fetch(url,{method: "POST", body:inputs, headers: {"content-type" : "application/json"}})
		.then(() => console.log("succes"))
		.catch(e => console.log(e));
	}
	return (
		<Form style={{width:'50rem', margin:'auto' }} onSubmit={e => handleSubmit(e)}>
			<Form.Group >
				<Form.Label>Cepa</Form.Label>
				<Form.Control value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Categorías</Form.Label>
				<Form.Control as="select" onChange={e => setInputs({ ...inputs, category: e.target.value })}>
						{category.map(category => (
							<option value={category.id}>{category.name}</option>
						))}
				</Form.Control>
			</Form.Group>
			<Button variant="primary" type="submit">Agregar</Button>
		</Form>
	);
}