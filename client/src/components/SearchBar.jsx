import React, { useState } from "react";
import { Form, Button, Nav, Navbar, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
export default function SearchBar() {
	const history = useHistory();
	const [inputText, setinputText] = useState("");
	return (
		<div>
			<Form
				inline
				onSubmit={e => {
					e.preventDefault();
					setinputText(" ");
					history.replace("/catalogue?search=" + inputText);
				}}
			>
				<FormControl
					type="text"
					placeholder="ej: Malbec"
					className="mr-sm-2"
					value={inputText}
					id="inputSearch"
					onChange={e => setinputText(e.target.value)}
				/>
				<Button variant="outline-info" type="submit">
					Buscar
				</Button>
			</Form>
		</div>
	);
}
