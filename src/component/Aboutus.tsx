import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Aboutus = ({ showAboutModal, setShowAboutModal }) => {
  return (
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
          specialize in delivering clean, well-maintained vehicles exactly where
          and when you need them.
        </p>
        <p>
          Whether you’re traveling through Washington Dulles (IAD), Reagan
          National (DCA), or need a vehicle delivered to your home, DSDGO offers
          flexible solutions tailored to your schedule. Every vehicle is
          professionally detailed, fully fueled, and ready to go.
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
  );
};
