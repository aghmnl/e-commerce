import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function FormCellar() {
	const [inputs, setInputs] = useState({
		name: "",
	});
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
				<Form.Label>Bodega</Form.Label>
				<Form.Control value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} />
			</Form.Group>
            <Form.Group>
				<Form.Label>Categoría</Form.Label>
				<Form.Control as="select" onChange={e => setInputs({ ...inputs, strain: e.target.value })}>
					{dates.strain.map(strain => (
						<option value={strain}></option>
					))}
				</Form.Control>
			</Form.Group>
			<Button variant="primary" type="submit">Agregar</Button>
		</Form>
	);
}