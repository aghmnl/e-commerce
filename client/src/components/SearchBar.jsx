import React, {useState} from 'react';

export default function SearchBar(props) {
  // acá va tu código
  const [inputText, setinputText] = useState(0);

  return (
    <div>
      <input type="text" placeholder="Ingrese texto..." value={inputText} onChange={(e) => setinputText(e)}></input>
      <button onClick={() => props.cb(inputText)}>Enviar</button>
    </div>
  )
};