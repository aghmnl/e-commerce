import React from 'react';
import React, { useState } from 'react';
export default function FormCategory(props){
    const [inputs, setInputs] = useState({
        name:"",
        description:""
    });
    function handleSubmit(e){
        e.preventDefalut();
        //fetch a la api :
    }
    return(
        <form onSubmit={handleSubmit(e)}>
            <input type="text" key="name" placeholder="Nombre" onChange={(e) => setInputs({...inputs, name:e.target.value})}/>
            <textarea key="description" onChange={(e) => setInputs({...inputs, description:e.target.value})}></textarea>
            <button>Agregar</button>  
        </form>
    );
}