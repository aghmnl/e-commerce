import React, {useState} from 'react';
import { Form, Button, Nav, FormControl } from "react-bootstrap";
import {NavLink} from "react-router-dom";
export default function SearchBar(props) {
  // acá va tu código
  const [inputText, setinputText] = useState("");

  return (
    <div>
      <Form inline onSubmit={(e)=>{
        e.preventDefault();
        props.cb(inputText)
        }} >
				<Nav.Link>
          <NavLink to="/admin">
            Admin
          </NavLink>
        </Nav.Link>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" value={inputText} onChange={(e) => setinputText(e.target.value)} />
				<Button variant="outline-info" type="submit">Search</Button>
			</Form>
    </div>
  )
};