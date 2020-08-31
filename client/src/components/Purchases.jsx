import React from "react";
import {useDispatch, useSelector} from "react-redux";
import  {Redirect} from "react-router-dom";
import {Card, Row, Col, Dropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {BiMenu} from "react-icons/bi";
export default function Mypurchases(){
    const { my_purchases, logged } = useSelector(state => state);
    const dispatch = useDispatch();
    if(!logged) return <Redirect to="/login" />
    return(
        <div style={{marginTop:"5rem"}}>
            {!!my_purchases?my_purchases.map(({purchase, total}) =>(
                purchase.products.map(product =>(
                    <Card style={{width:"50rem",margin:"auto"}}>
                        <Row>
                            <Col sm="2" style={{ alignSelf: "center" }}>
                                <Card.Img style={{ transform: "scale(0.5)" }} src={product.img}></Card.Img>
                            </Col>
                            <Col sm="3" style={{ alignSelf: "center" }}>
								<NavLink to={`/product/${product.id}`}>
									<Card.Title>{product.name}</Card.Title>
								</NavLink>
							</Col>
							<Col sm="2" style={{ alignSelf: "center" }}>
								<Card.Subtitle>$ {product.purchased_product.priceProduct}</Card.Subtitle>
							</Col>
                            <Col sm="2" style={{ alignSelf: "center" }}>
								<Card.Subtitle>Cantidad: {product.purchased_product.quantity}</Card.Subtitle>
							</Col>
                            <Col sm="2" style={{ alignSelf: "center" }}>
								<Card.Subtitle>{purchase.date}</Card.Subtitle>
							</Col>
                            <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <Dropdown.Item><NavLink to={`/formReview/${product.id}`}>Review</NavLink></Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Subtitle>$ {total}</Card.Subtitle>
                            </Col>
                        </Row>
                    </Card>
                ))
                
            )):(<div>No hay nada</div>)}
        </div>
    );
}