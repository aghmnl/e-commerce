import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/FormCategory.css";
export default function FormCategory() {
	const [inputs, setInputs] = useState({
		name: "",
		description: "",
	});
	function handleSubmit(e) {
		e.preventDefault();
		//fetch a la api :
		const url = "http://localhost:3000/category";
		fetch(url, { method: "POST", body: inputs, headers: { "content-type": "application/json" } })
			.then(r => r.json())
			.then(() => (window.location.href = "/"))
			.catch(e => console.log(e));
	}
	return (
		<Form style={{ width: "50rem", margin: "auto" }} onSubmit={e => handleSubmit(e)}>
			<Form.Group>
				<Form.Label>Categoría</Form.Label>
				<Form.Control value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Descripción</Form.Label>
				<Form.Control as="textarea" rows="3" value={inputs.description} onChange={e => setInputs({ ...inputs, description: e.target.value })} />
			</Form.Group>
			<Button variant="primary" type="submit">
				Agregar
			</Button>
		</Form>
	);
}
