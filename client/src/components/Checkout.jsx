import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {Form, Button, Card, Col} from "react-bootstrap";
import {Redirect, useHistory} from "react-router-dom";
export default function Checkout(){
    const dispatch = useDispatch();
    const [pay_methods, setPayMethods] = useState([]);
    const [errs, setErrs] = useState({
        "dir": "",
        "pm": ""
    });
    const [values, setValues] = useState({
        "dir": "",
        "pm" : ""
    }) 
    useEffect(()=>{
        (async()=>{
            const response = await axios.get("http://localhost:3001/purchase_protected/pay_methods",{
                withCredentials: true
            }).catch(err => console.log(err.response))
            !!response && setPayMethods(response.data);
        })()
    },[])
    function validate({target}){
        setValues({
            ...values,
            [target.id]: target.value
        });
        if(!target.value) return setErrs({
            ...errs,
            [target.id]: target.getAttribute("data-err")
        })
        setErrs({
            dir:"",
            pm:""
        })
    }
    const history = useHistory();
    const { logged, purchased_products } = useSelector(state => state);
    if(!logged) return (<Redirect to="/login" />);
    return(
        <div>
            <Card style={{width:"55rem", margin:"5rem auto", textAlign:"left"}} >
                <Card.Body>
                    <Form onChange={validate} onBlur={validate}>
                        <Form.Group as={Col}>
                            <Form.Label>Dirrección</Form.Label>
                            <Form.Control id="dir" 
                                value={values.dir} 
                                isInvalid={!!errs.dir} 
                                data-err="Debe ingresar su dirección" />
                            <Form.Control.Feedback type="invalid" tooltip>{errs.dir}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Metodo de Pago</Form.Label>
                            <Form.Control as="select" id="pm" isInvalid={!!errs.pm} data-err="Debe ingresar un metodo de pago" >
                                <option value="">Seleccione ...</option>
                                {pay_methods.map(pm => (<option value={pm.id} selected={pm.id===values.pm?"selected":""}>{pm.name}</option>))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" tooltip>{errs.pm}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Button type="submit" variant="success">Finalizar Compra</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}