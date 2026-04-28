import { Row, Col, Form, Button, Alert } from "react-bootstrap";

const RequestForm = ({
  showForm,
  selectedCar,
  cancelInquiry,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  handleSubmitInquiry,
  formData,
  handleInputChange,
  submitStatus,
  isSubmitting,
}) => {
  return (
    <>
      {showForm && selectedCar && (
        <div id="inquiry-section" className="mt-5">
          <div className="inquiry-card">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
              <h3 className="inquiry-title">
                <i className="fas fa-envelope-open-text me-2"></i>
                Request for {selectedCar.name}
              </h3>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={cancelInquiry}
              >
                <i className="fas fa-times"></i> Close
              </Button>
            </div>

            <Alert variant="info" className="mb-3">
              <i className="fas fa-calendar-alt me-2"></i>
              <strong>Selected period:</strong> {pickupDate} {pickupTime} until{" "}
              {returnDate} {returnTime}
            </Alert>

            <Form onSubmit={handleSubmitInquiry}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 890"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="formMessage">
                    <Form.Label>
                      Your Message / Special Requests (optional)
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="e.g. child seat, insurance questions, special wishes..."
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  {submitStatus &&
                    (submitStatus.message.includes("Thank you") ||
                      submitStatus.message.includes("request")) && (
                      <Alert
                        variant={submitStatus.success ? "success" : "danger"}
                      >
                        {submitStatus.message}
                      </Alert>
                    )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-send-request"
                  >
                    {isSubmitting ? (
                      <>
                        Sending <i className="fas fa-spinner fa-spin ms-2"></i>
                      </>
                    ) : (
                      <>
                        Send Request <i className="fas fa-arrow-right ms-2"></i>
                      </>
                    )}
                  </Button>
                  <span className="ms-3 text-muted small">
                    <i className="fas fa-lock"></i> Your data is secure
                  </span>
                </Col>
              </Row>
            </Form>
            <div className="inquiry-footer">
              <hr />
              <i className="fas fa-info-circle"></i> DSD GO will contact you
              within a few hours to confirm availability and complete the
              booking.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestForm;
