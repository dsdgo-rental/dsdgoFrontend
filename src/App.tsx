import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Image,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { MdEmail } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";

interface Car {
  name: string;
  seats: number;
  fuel: string;
}

interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const App: React.FC = () => {
  const [carsData, setCarsData] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pickupDate, setPickupDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>("12:30");
  const [returnTime, setReturnTime] = useState<string>("08:30");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<InquiryForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetch("/data/cars.json")
      .then((response) => response.json())
      .then((data) => {
        const carsArray: Car[] = Object.keys(data).map((key) => ({
          name: data[key].name,
          seats: data[key].seats,
          fuel: data[key].fuel,
        }));
        setCarsData(carsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading cars:", error);
        setLoading(false);
      });
  }, []);

  const handlePickupDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickupDate(e.target.value);
  };

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnDate(e.target.value);
  };

  const handleRequestClick = (car: Car) => {
    if (!pickupDate || !returnDate) {
      setSubmitStatus({
        success: false,
        message: "Please select both pickup and return dates first.",
      });
      return;
    }

    setSelectedCar(car);
    setShowForm(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSubmitStatus(null);
    setTimeout(() => {
      document
        .getElementById("inquiry-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setSubmitStatus({
        success: false,
        message: "Please fill in name, email and phone number.",
      });
      return;
    }

    if (!formData.email.includes("@")) {
      setSubmitStatus({
        success: false,
        message: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const inquiryRecord = {
      id: Date.now(),
      car: selectedCar,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      customer: formData,
      timestamp: new Date().toISOString(),
    };

    const existingInquiries = localStorage.getItem("dsdgo_inquiries");
    const inquiries = existingInquiries ? JSON.parse(existingInquiries) : [];
    inquiries.push(inquiryRecord);
    localStorage.setItem("dsdgo_inquiries", JSON.stringify(inquiries));

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setSubmitStatus({
      success: true,
      message: `Thank you ${formData.name}! Your request for ${selectedCar?.name} has been sent. Our team will contact you shortly.`,
    });

    setIsSubmitting(false);

    setTimeout(() => {
      setShowForm(false);
      setSelectedCar(null);
      setSubmitStatus(null);
    }, 4000);
  };

  const cancelInquiry = () => {
    setShowForm(false);
    setSelectedCar(null);
    setSubmitStatus(null);
  };

  if (loading) {
    return (
      <div className="app-wrapper d-flex justify-content-center align-items-center">
        <h3>Loading cars...</h3>
      </div>
    );
  }

  return (
    <div>
      <header className="main-header">
        <div className="top-bar">
          <div className="logo-wrapper">
            <Image src="/logo2.png" alt="DSD GO Logo" className="logo-image" />
          </div>
          <div className="header-contact">
            <p
              onClick={() => setShowContactModal(true)}
              style={{ cursor: "pointer" }}
            >
              <MdContactPhone className="my-1" /> Contact
            </p>
            <p
              onClick={() => setShowAboutModal(true)}
              style={{ cursor: "pointer" }}
            >
              <RiContactsFill className="my-1" /> About Us
            </p>
          </div>
        </div>
        <br />
        <br />
        <Container>
          <Row className="align-items-center">
            <Col>
              <h1 className="brand-title ">Rent premium cars.</h1>
              <h1 className="brand-title">Fair Prices.</h1>
              <h1 className="brand-title red">Unmatched Experience.</h1>
            </Col>
          </Row>
        </Container>
      </header>
      <Modal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <MdEmail className="me-2" /> <strong>Email:</strong>{" "}
            Dsdgorenrals@gmail.com
          </p>
          <p>
            <RiCustomerService2Fill className="me-2" /> <strong>Phone:</strong>{" "}
            +1(240)899-0347
          </p>
          <p>
            <MdLocationPin className="me-2" /> <strong>Address:</strong>{" "}
            Virginia, USA
          </p>
          <hr />
          <p>
            <strong>Business Hours:</strong> Mon-Sun, 8:00 AM - 8:00 PM
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowContactModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showAboutModal}
        onHide={() => setShowAboutModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>About DSD GO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>DSDGO – Premium Car Rentals, Simplified</h5>
          <p>
            At DSDGO, we provide a seamless and reliable car rental experience
            designed around convenience, quality, and trust. With over 2,500
            successful trips and a consistent 5-star guest experience, we
            specialize in delivering clean, well-maintained vehicles exactly
            where and when you need them.
          </p>
          <p>
            Whether you’re traveling through Washington Dulles (IAD), Reagan
            National (DCA), or need a vehicle delivered to your home, DSDGO
            offers flexible solutions tailored to your schedule. Every vehicle
            is professionally detailed, fully fueled, and ready to go.
          </p>
          <p>
            <strong>Our commitment is simple:</strong> no stress, no
            surprises—just a smooth, premium rental experience from start to
            finish.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAboutModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="date-card">
        <Row className="d-flex justify-content-center align-items-end m-b">
          <Col md={2}>
            <Form.Label className="fw-bold">Pickup Date</Form.Label>
            <Form.Control
              type="date"
              value={pickupDate}
              onChange={handlePickupDateChange}
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
              onChange={handleReturnDateChange}
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

      <Container className="py-4">
        <h2 className="section-title">
          <i className="fas fa-car-side me-2"></i>Our Premium Fleet
        </h2>
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
                  <Card.Title className="car-title text-center">{car.name}</Card.Title>
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
                    <i className="fas fa-paper-plane me-2"></i>Check
                    Availability
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

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
                <strong>Selected period:</strong> {pickupDate} {pickupTime}{" "}
                until {returnDate} {returnTime}
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
                          Sending{" "}
                          <i className="fas fa-spinner fa-spin ms-2"></i>
                        </>
                      ) : (
                        <>
                          Send Request{" "}
                          <i className="fas fa-arrow-right ms-2"></i>
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
        <footer className="main-footer">
          <i className="fas fa-database me-1"></i>
        </footer>
      </Container>
    </div>
  );
};

export default App;
