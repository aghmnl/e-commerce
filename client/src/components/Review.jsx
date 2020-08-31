import React, { useState } from 'react';
import Rating from 'react-rating';
import { Card, Spinner } from 'react-bootstrap';
import { FaStar, FaRegStar, FaStarAndCrescent } from 'react-icons/fa';
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
                        emptySymbol={<FaRegStar/>}
                        fullSymbol={<FaStar/>}
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
export function ProductRating({users}){
    return(
        <div>
            <Card className="content-review">
                <Card.Body className="body-review">
                    <Card.Title className="title-review"> 
                        <h1>
                            {!users?
                                <Spinner animation="border" />:
                                (()=>{
                                    let sumStars = 0;
                                    for(let user of users)
                                    sumStars += user.review.stars;
                                    let rating = (sumStars/users.length)
                                    if(!users.length) rating = 0;
                                    return Number.isInteger(rating)?rating.toFixed(1):rating;
                                })()
                            }
                        </h1>
                        <div className="rating">
                        <Rating
                            initialRating={!users?0:
                                (()=>{
                                    let sumStars = 0;
                                    for(let user of users)
                                    sumStars += user.review.stars;
                                    let rating = (sumStars/users.length)
                                    return rating;
                                })()
                            }
                            emptySymbol={<FaRegStar/>}
                            fullSymbol={<FaStar/>}
                            readonly
                        />
                        </div>
                    </Card.Title>
                    <div className="stadist">
                        {(()=>{
                            let st = [];
                            let c = [];
                            for(let i=1;i<=5;i++)
                                st.push(
                                    <div>
                                        {<span style={{marginRight:"0.5rem"}} >{!users?0:
                                            (users.filter((user) => 
                                                user.review.stars === i)).length}
                                        </span>}
                                        <Rating initialRating={i} 
                                            emptySymbol={<FaRegStar/>} 
                                            fullSymbol={<FaStar/>} 
                                            readonly />
                                    </div>
                                );
                            return st.map((e)=>e);
                        })()}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}