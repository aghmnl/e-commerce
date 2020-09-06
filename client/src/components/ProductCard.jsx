import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { NavLink } from "react-router-dom";
import '../styles/ProductCard.css'
import Rating from "react-rating";
import { RiStarLine, RiStarFill } from "react-icons/ri";

export default function ProductCard({ id, name, cellar, price, img, raiting }) {
	return (
		<NavLink to={`/product/${id}`}>
			<Card style={{ width: "15rem", height: "25rem", margin: "5px" }} className="efecto">
				<Card.Img variant="top" src={img} style={{ padding: "5px" }} />
				<Card.Body style={{display:"flex", flexDirection:"column", justifyContent:"space-around"}} >
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle>{cellar.name}</Card.Subtitle>
					<Card.Text style={{textAlign: "center !important"}} ><b>${price}</b></Card.Text>
					<Rating
                        initialRating={raiting || 0}
                        emptySymbol={<RiStarLine/>}
                        fullSymbol={<RiStarFill/>}
                        readonly
                    />
				</Card.Body>
			</Card>
		</NavLink>
	);
}
