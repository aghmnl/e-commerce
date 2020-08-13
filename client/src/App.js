import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Catalogue from './components/Catalogue';
import FormProduct from "./components/FormProduct";
import NavBar from './components/navbar.jsx';
function App() {
	return (
		
		<div className="App">
			<Route path="/" render={() => <NavBar/>}/>
			<Route exact path="/catalogo" render={() => <Catalogue products={[]}/>}/>
			<FormProduct></FormProduct>
		</div>
	);	
}

export default App;
