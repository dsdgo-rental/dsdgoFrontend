import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import type { DateCardProps } from "../types/interface";

export const DateCard = ({
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  pickupTime,
  setPickupTime,
  returnTime,
  setReturnTime,
  setSubmitStatus,
  submitStatus,
}: DateCardProps) => {
  return (
    <div className="date-card">
      <Row className="d-flex justify-content-center align-items-end m-b">
        <Col md={2}>
          <Form.Label className="fw-bold">Pickup Date</Form.Label>
          <Form.Control
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="date-input"
          />
        </Col>
        <Col md={2}>
          <Form.Label className="fw-bold">Pickup Time</Form.Label>
          <Form.Control
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="border-danger"
          />
        </Col>
        <Col md={2}>
          <Form.Label className="fw-bold">Return Date</Form.Label>
          <Form.Control
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={pickupDate || new Date().toISOString().split("T")[0]}
            className="date-input"
          />
        </Col>
        <Col md={2}>
          <Form.Label className="fw-bold">Return Time</Form.Label>
          <Form.Control
            type="time"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            className="border-danger"
          />
        </Col>
        <Col md={2}>
          <Button
            className="btn-apply w-100"
            onClick={() => {
              if (pickupDate && returnDate) {
                setSubmitStatus({
                  success: true,
                  message: "Dates confirmed! Now select a car.",
                });
                setTimeout(() => setSubmitStatus(null), 2000);
              } else {
                setSubmitStatus({
                  success: false,
                  message: "Please select both dates.",
                });
                setTimeout(() => setSubmitStatus(null), 2000);
              }
            }}
          >
            <i className="fas fa-calendar-check me-2"></i>Apply Dates
          </Button>
        </Col>
      </Row>
      {submitStatus &&
        !submitStatus.message.includes("Thank you") &&
        !submitStatus.message.includes("request") && (
          <Alert
            variant={submitStatus.success ? "success" : "danger"}
            className="mt-3 mb-0"
          >
            {submitStatus.message}
          </Alert>
        )}
    </div>
  );
};
