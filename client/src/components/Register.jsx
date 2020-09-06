import React, { useEffect } from 'react';
import { Form, Card, Button, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAuth, isAdmin } from "../store/actions";
import axios from "axios";
export default function Register(){
    useEffect(()=>{

		document.body.id="bg_user";
    },[])
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues:{
            first_name: "",
            last_name: "",
            phone: 0,
            email:"",
            password:"",
            re_pass:""
        },
        validate: values =>{
            const errors = {}
            for(let value in values){
                let msg = "";
                switch(value){
                    case "first_name":
                        msg= "Se requiere un Nombre";
                        break;
                    case "last_name":
                        msg="Se requiere un Apellido";
                        break;
                    case "phone":
                        msg="Se requiere un teléfono";
                        break;
                    case "email":
                        msg="Se requiere un Email";
                        break;
                    case "password":
                        msg="Se requiere una contraseña";
                        break;
                    case "re_pass":
                        msg="Debe reinsgresar la contraseña";
                        break;
                }
                !values[value] && (errors[value] = msg);
            }
            !!values.re_pass && !!values.password && (values.re_pass !== values.password) && (errors.re_pass = "Las contraseñas deben coincidir"); 
            return errors;
        },
        onSubmit: (values) =>{
            axios
                .post("http://localhost:3001/auth/register", values, {withCredentials: true})
                .then( async ()=>{
                    await dispatch(isAuth());
                    await dispatch(isAdmin());
                    history.replace("/user");
                })
                .catch(err => formik.setFieldError(err.response.data.input, err.response.data.message))
        } 
    });
    return(
        <div>
            <Card style={{width:"30rem", margin:"5rem auto", textAlign:"left"}}>
                <Card.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group as={Col}>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                value={formik.values.first_name}
                                onChange={e => formik.setFieldValue("first_name",e.target.value)}
                                onBlur={()=> formik.setFieldTouched("first_name",true)}
                                isInvalid={formik.touched.first_name && !!formik.errors.first_name}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors.first_name && formik.touched.first_name && formik.errors.first_name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                value={formik.values.last_name}
                                onChange={e => formik.setFieldValue("last_name",e.target.value)}
                                onBlur={()=> formik.setFieldTouched("last_name",true)}
                                isInvalid={formik.touched.last_name && !!formik.errors.last_name}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors.last_name && formik.touched.last_name && formik.errors.last_name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                value={formik.values.phone}
                                type="number"
                                onChange={e => formik.setFieldValue("phone",e.target.value)}
                                onBlur={()=> formik.setFieldTouched("phone",true)}
                                isInvalid={formik.touched.phone && !!formik.errors.phone}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors.phone && formik.touched.phone && formik.errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={formik.values.email}
                                onChange={e => formik.setFieldValue("email",e.target.value)}
                                onBlur={()=> formik.setFieldTouched("email",true)}
                                isInvalid={formik.touched.email && !!formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors.email && formik.touched.email && formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                value={formik.values.password}
                                type="password"
                                onChange={e => formik.setFieldValue("password",e.target.value)}
                                onBlur={()=> formik.setFieldTouched("password",true)}
                                isInvalid={formik.touched.password && !!formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors.password && formik.touched.password && formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Repita Contraseña</Form.Label>
                            <Form.Control
                                value={formik.values.re_pass}
                                type="password"
                                onChange={e => formik.setFieldValue("re_pass",e.target.value)}
                                onBlur={()=> formik.setFieldTouched("re_pass",true)}
                                isInvalid={(formik.touched.re_pass && !!formik.errors.re_pass)}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors.re_pass && formik.touched.re_pass && formik.errors.re_pass}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} style={{display:"flex",flexDirection:"column"}} >
                            <Button type="submit" variant="primary">Registrarse</Button>
                            <Link to="/login" >Ya tengo cuenta</Link>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

