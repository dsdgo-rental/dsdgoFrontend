import { MdEmail } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import type { ContactProps } from "../types/interface";
import { Button, Modal } from "react-bootstrap";

export const Contact = ({ showContactModal, setShowContactModal }: ContactProps) => {
  return (
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
          rentyourcar@dsdgorentals.com
        </p>
        <p>
          <RiCustomerService2Fill className="me-2" /> <strong>Phone:</strong>{" "}
          +1(240)899-0347
        </p>
        <p>
          <MdLocationPin className="me-2" /> <strong>Address:</strong> Virginia,
          USA
        </p>
        <hr />
        <p>
          <strong>Business Hours:</strong> Mon-Sun, 8:00 AM - 8:00 PM
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowContactModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
