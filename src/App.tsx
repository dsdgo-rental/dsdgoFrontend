import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { MdContactPhone } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { Contact } from "./component/Contact";
import { Aboutus } from "./component/Aboutus";
import type { Car, InquiryForm } from "./types/interface";
import RequestForm from "./component/RequestForm";
import { DateCard } from "./component/DateCard";
import { CarCard } from "./component/CarCard";

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
      <Contact
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
      />
      <Aboutus
        showAboutModal={showAboutModal}
        setShowAboutModal={setShowAboutModal}
      />

      <DateCard
        pickupDate={pickupDate}
        setPickupDate={setPickupDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        pickupTime={pickupTime}
        setPickupTime={setPickupTime}
        returnTime={returnTime}
        setReturnTime={setReturnTime}
        setSubmitStatus={setSubmitStatus}
        submitStatus={submitStatus}
      />

      <Container className="py-4">
        <h2 className="section-title">
          <i className="fas fa-car-side me-2"></i>Our Premium Fleet
        </h2>
        <CarCard carsData={carsData} handleRequestClick={handleRequestClick} />
        <RequestForm
          showForm={showForm}
          selectedCar={selectedCar}
          cancelInquiry={cancelInquiry}
          pickupDate={pickupDate}
          pickupTime={pickupTime}
          returnDate={returnDate}
          returnTime={returnTime}
          handleSubmitInquiry={handleSubmitInquiry}
          formData={formData}
          handleInputChange={handleInputChange}
          submitStatus={submitStatus}
          isSubmitting={isSubmitting}
        />
        <footer className="main-footer">
          <i className="fas fa-database me-1"></i>
        </footer>
      </Container>
    </div>
  );
};

export default App;
