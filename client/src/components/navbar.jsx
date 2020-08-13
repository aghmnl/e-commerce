import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
import "../styles/navbar.css";
export default function(props){
    return(
        <div>
           
            <nav className="navbar navbar-dark bg-dark" >
             <Link to="/catalogo"><span className="navbar-brand">Catalogo</span></Link>
             <SearchBar/>
            </nav>
        </div>
    );
}

