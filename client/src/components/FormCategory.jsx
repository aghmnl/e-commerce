import React, { useState } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import "../styles/FormCategory.css";
import axios from "axios";
export default function FormCategory() {
	const [inputs, setInputs] = useState({
		name: "",
		description: "",
	});
	function handleSubmit(e) {
		e.preventDefault();
		//fetch a la api :
		const url = "http://localhost:3000/category";
		axios
			.post(url, inputs)
			// .then(() => (window.location.href = "/catalogue"))
			.then(res => alert("Categoría cargada"))
			.catch(err => alert(err));
		// fetch(url, { method: "POST", body: inputs, headers: { "content-type": "application/json" } })
		// 	.then(r => r.json())
		// 	.then(() => (window.location.href = "/"))
		// 	.catch(e => console.log(e));
		setInputs({
			name: "",
			description: "",
		});
	}
	return (
		<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e)}>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Categoría
				</Form.Label>
				<Col sm="10">
					<Form.Control value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} />
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Descripción
				</Form.Label>
				<Col sm="10">
					<Form.Control as="textarea" rows="3" value={inputs.description} onChange={e => setInputs({ ...inputs, description: e.target.value })} />
				</Col>
			</Form.Group>
			<Button variant="primary" type="submit">
				Agregar
			</Button>
		</Form>
	);
}
