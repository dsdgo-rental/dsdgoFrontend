export interface Car {
  name: string;
  seats: number;
  fuel: string;
}

export interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface AboutusProps {
  showAboutModal: boolean;
  setShowAboutModal: (show: boolean) => void;
}

export interface ContactProps {
  showContactModal: boolean;
  setShowContactModal: (show: boolean) => void;
}

export interface CarCardProps {
  carsData: Car[];
  handleRequestClick: (car: Car) => void;
}

export interface DateCardProps {
  pickupDate: string;
  setPickupDate: (date: string) => void;
  returnDate: string;
  setReturnDate: (date: string) => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  returnTime: string;
  setReturnTime: (time: string) => void;
  setSubmitStatus: (status: { success: boolean; message: string } | null) => void;
  submitStatus: { success: boolean; message: string } | null;
}

export interface RequestFormProps {
  showForm: boolean;
  selectedCar: Car | null;
  cancelInquiry: () => void;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  handleSubmitInquiry: (e: React.FormEvent) => Promise<void>;
  formData: InquiryForm;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  submitStatus: { success: boolean; message: string } | null;
  isSubmitting: boolean;
}