import React ,{useState} from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';

const CardProducts = ({ prod }) => {
  const { name, precio, category, imagen } = prod;

  return (
    <Carousel slide={false} className='custom-carousel'  interval={null} pause={false} >
      {imagen.map((image, index) => (
        <Carousel.Item key={index}>
          <Card className="product-card mb-4 ">
            <Card.Img variant="top" src={image} className="card-image" />
            <Card.Body className="card-body">
              <Card.Title>{name}</Card.Title>
              <div className="d-flex justify-content-between align-items-center">
                <p className="text-start">{category}</p>
                <p className="text-end ">{precio} €</p>
              </div>
            
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}

    </Carousel>
  );
};

export default CardProducts;
