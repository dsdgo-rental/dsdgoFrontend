import { Row, Col, Button, Card } from "react-bootstrap";

export const CarCard = ({ carsData, handleRequestClick }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {carsData.map((car, index) => (
        <Col key={index}>
          <Card className="car-card h-100 shadow-sm">
            <Card.Img
              variant="top"
              src={`/images/car${index + 1}.jpeg`}
              className="car-image"
            />
            <Card.Body>
              <Card.Title className="car-title text-center">
                {car.name}
              </Card.Title>
              <br />
              <Card.Text>
                <i className="fas fa-tachometer-alt me-2"></i>Fuel type:{" "}
                {car.fuel}
                <br />
                <i className="fas fa-user-friends me-2"></i>Number of seats:{" "}
                {car.seats} seats
                <br />
              </Card.Text>
              <Button
                className="btn-check-availability w-100"
                onClick={() => handleRequestClick(car)}
              >
                <i className="fas fa-paper-plane me-2"></i>Check Availability
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
