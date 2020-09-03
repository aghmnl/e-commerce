import React, { useState } from 'react';
import Rating from 'react-rating';
import { Card, Spinner } from 'react-bootstrap';
import { RiStarLine, RiStarFill } from 'react-icons/ri';
import "../styles/Review.css";
export default function Review({stars, user, description, date}){
    return(
    <div>
        <Card className="content-review">
            <Card.Body>
                <Card.Title className="title-review"> 
                    <h1>{stars.toFixed(1)}</h1>
                    <div className="rating">
                    <Rating
                        initialRating={stars}
                        emptySymbol={<RiStarLine/>}
                        fullSymbol={<RiStarFill/>}
                        readonly
                    />
                    </div>
                </Card.Title>
                <Card.Subtitle>
                   ({date}) ~ {user} :
                </Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>);
}
export function ProductRating({raiting, stadistics}){
    return(
        <div>
            <Card className="content-review">
                <Card.Body className="body-review">
                    <Card.Title className="title-review"> 
                    <h1>{!raiting?0.0:parseInt(raiting).toFixed(1)}</h1>
                        <div className="rating">
                        <Rating
                            initialRating={raiting || 0}
                            emptySymbol={<RiStarLine/>}
                            fullSymbol={<RiStarFill/>}
                            readonly
                        />
                        </div>
                    </Card.Title>
                    <div className="stadist">
                        {(()=>{
                            let results= [];
                            for(let st of stadistics)
                                results.push(
                                    <div>
                                        {<span style={{marginRight:"0.5rem"}} >
                                            {st || 0}
                                        </span>}
                                        <Rating initialRating={st || 0} 
                                            emptySymbol={<RiStarLine/>} 
                                            fullSymbol={<RiStarFill/>} 
                                            readonly />
                                    </div>
                                );
                            return results.map((e)=>e);
                        })()}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}