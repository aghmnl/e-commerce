import React, { useEffect } from "react";
import axios from "axios";
import {Table,Button} from 'react-bootstrap';
import '../styles/Tabla.css';

function Purchase({id}){
    var total=0;
    var PurchaseInfo = {
        "date": "19/08/2020",
        "id": 1,
        "createdAt": "2020-08-30T21:35:22.836Z",
        "updatedAt": "2020-08-30T21:35:22.836Z",
        "userId": 1,
        "payMethodId": 1,
        "statusId": 1
    };
    var PurchaseProducts = [
        {
            "id": 5,
            "name": "Tanat Limited Edition",
            "stock": 8,
            "img": "https://cdn.shopify.com/s/files/1/0042/8477/6517/products/BodegonesdelSur-Tannat_e4d144c9-0bc8-453c-97aa-2db5c988919b_2000x.jpg?v=1562031541",
            "price": "39",
            "quantity": 5
        },
        {
            "id": 7,
            "name": "Los Vascos Le Dix",
            "stock": 19,
            "img": "https://cdn.shopify.com/s/files/1/0042/8477/6517/products/los-vascos-le-dix-blend-chile-colchagua-marcelo-gallardo-vino-tinto-vinos-del-mundo_867_2000x.jpg?v=1545702292",
            "price": "4855",
            "quantity": 3
        }
    ];

    function goBack() {
		window.history.back();
    }
    
    useEffect(() => {
        //Obtengo los datos de la compra
		axios
			.get(`http://localhost:3001/purchase_protected/${id}`, { withCredentials: true })
			.then((response) => {
                PurchaseInfo=response;
                //Ahora Obtenemos los productos de esa compra
                axios
                .get(`http://localhost:3001/purchased_products_protected/purchase/${id}`, { withCredentials: true })
                .then((response) => {
                    PurchaseProducts=response;
                })				
                .catch(err => console.log("error", err));
                return;
            })				
			.catch(err => console.log("error", err));
			return;
    }, []);
    return (
        <div className="tabla">
            <h2 className="mb-5">Detalle de la orden</h2>
            <div className="row PurchaseInfo mb-2">
                <div className="col">
                    <h4>Compra N°: {PurchaseInfo.id}</h4>
                </div>
                <div className="col">
                    <h4>Fecha: {PurchaseInfo.date}</h4>
                </div>
                <div className="col">
                    <h4>Usuario: {PurchaseInfo.userId}</h4>
                </div>
                <div className="col">
                    <h4>Metodo de Pago: {PurchaseInfo.payMethodId}</h4>
                </div>
                <div className="col">
                    <h4>Estado: {PurchaseInfo.statusId}</h4>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {PurchaseProducts.map(e =>  (
                        <tr>
                            <td scope="row">{e.id}</td>
                            <td>{e.name}</td>
                            <td>{"$ "+e.price}</td>
                            <td>{e.quantity}</td>
                            <td>{"$ "+e.price*e.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                    <div><h2>Total: $ {total}</h2>
                    <Button onClick={() => goBack()}>Volver</Button>
                    </div>
        </div>
    )
}

export default Purchase;