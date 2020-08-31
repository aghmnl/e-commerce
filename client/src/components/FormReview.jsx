import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import Rating from "react-rating";
import { FaStar, FaRegStar,} from 'react-icons/fa';
import { Form, Card, Col, Button } from "react-bootstrap";
import axios from "axios";
export default function FormReview({product}){
    const history = useHistory();
    const [edit, setEdit] = useState(false);
    const [inputs, setInputs] = useState({
        stars:0,
        description: ""
    })
    const formik = useFormik({
        initialValues:inputs,
        initialErrors:{
            stars: "Por Favor Asigne una valoración"
        },
        validateOnMount: true,
        validates: values =>{
            const errors={}
            !values.stars && (errors.stars = "Por Favor Asigne una valoración")
            return errors;
        },
        onSubmit: values => {
            if(!values.stars) return alert(formik.initialErrors.stars)
            if(edit){
                axios.put("http://localhost:3001/review/"+product,{
                    ...values,
                    productId:product,
                    date: Date.now()
                },{ withCredentials: true })
                    .then(() => history.replace("/product/"+product))
                    .catch(err => console.log(err))
                return;
            }
            axios.post("http://localhost:3001/review",{
                ...values,
                productId:product,
                date: Date.now()
            },{ withCredentials: true })
                .then(() => history.replace("/product/"+product))
                .catch(err => console.log(err));
        }
    })
    useEffect(()=>{
        axios.get("http://localhost:3001/review/"+product,{withCredentials:true})
            .then(({data}) => {
                if(data !== null){
                    setEdit(true);
                    setInputs({
                        stars: data.stars,
                        description: data.description
                    })
                }
            }).catch(err => console.log(err));
    },[])
    useEffect(()=>{
        formik.resetForm(inputs);
    },[inputs])
    return(
        <div>
            <Card style={{margin:"5rem auto", width:"55rem"}}>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group as={Col}>
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={formik.values.description}
                            onChange={e => formik.setFieldValue("description",e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Valoración</Form.Label>
                        <h2>
                            <Rating
                                initialRating={formik.values.stars}
                                emptySymbol={<FaRegStar/>}
                                fullSymbol={<FaStar/>}
                                onChange={(value) => formik.setFieldValue("stars",value)}
                            />
                        </h2>
                        <Form.Control.Feedback type="invalid">
                            {!!formik.errors.stars && formik.errors.stars}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="success" type="submit" >Enviar Review</Button>
                </Form>
            </Card>
        </div>
    );
}