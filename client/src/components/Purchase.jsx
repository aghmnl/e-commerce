import React, { useEffect } from "react";
import axios from "axios";
import {Table,Button} from 'react-bootstrap';
import '../styles/Tabla.css';
import { useDispatch, useSelector } from "react-redux";
import { getPurchase } from "../store/actions";
function Purchase({id}){
    const dispatch = useDispatch();
    const {purchaseDetail} = useSelector(state => state);
    useEffect(()=>{
        dispatch(getPurchase(id));
    },[id])
    useEffect(()=>{
		document.body.id="bg_form";
    },[])
    function goBack() {
		window.history.back();
    }
    if(!purchaseDetail) return(<div>Espere</div>)
    return (
        <div className="tabla">
            <h2 className="mb-5">Detalle de la orden</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Nro</th>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Metodo de pago</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{purchaseDetail.id}</td>
                        <td>{purchaseDetail.date}</td>
                        <td>{purchaseDetail.user.email}</td>
                        <td>{purchaseDetail.pay_method.name}</td>
                        <td>{purchaseDetail.status.name}</td>
                    </tr>
                </tbody>
            </Table>
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
                    {purchaseDetail.products.map(e =>  (
                        <tr>
                            <td scope="row">{e.id}</td>
                            <td>{e.name}</td>
                            <td>{"$ "+e.purchased_product.priceProduct}</td>
                            <td>{e.purchased_product.quantity}</td>
                            <td>{"$ "+e.purchased_product.priceProduct}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                    <div><h2>Total: $ {purchaseDetail.total}</h2>
                    <Button onClick={() => goBack()}>Volver</Button>
                    </div>
        </div>
    )
}

export default Purchase;