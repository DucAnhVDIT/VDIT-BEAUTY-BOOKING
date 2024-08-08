import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ServiceCard from "./ServiceCard";
import StaffSelectionModal from "../Staff/StaffSelectionModal";
import DateTimeSelection from "../Calendar/DateTimeSelection";
import OrderSummary from "../Order/OrderSumamry";
import BookingForm from "../Order/BookingForm";
import ConfirmationDialog from "../Order/ConfirmationPage";

const serviceCategories = [
  { id: "manicures-pedicures", name: "Manicures & Pedicures", count: 30 },
  { id: "nail-extensions", name: "Nail Extensions & Enhancements", count: 8 },
  { id: "nail-extras", name: "Nail Extras", count: 3 },
  { id: "nail-art", name: "Nail Art", count: 15 },
  { id: "waxing", name: "Waxing", count: 10 },
  { id: "facial-treatments", name: "Facial Treatments", count: 5 },
];

const servicesData = [
  {
    id: 1,
    name: "Signature Manicure with Normal Polish",
    duration: "45 mins",
    price: 30,
    category: "manicures-pedicures",
  },
  {
    id: 2,
    name: "BIAB New Set on Natural Nails",
    duration: "1 hr",
    price: 70,
    category: "nail-extensions",
  },
  {
    id: 3,
    name: "BIAB Full Set on Natural Nails",
    duration: "45 mins",
    price: 60,
    category: "nail-extensions",
  },
  {
    id: 4,
    name: "BIAB New Set Extensions",
    duration: "1 hr",
    price: 80,
    category: "nail-extensions",
  },
  {
    id: 5,
    name: "BIAB Full Set Extensions",
    duration: "1 hr",
    price: 70,
    category: "nail-extensions",
  },
  {
    id: 6,
    name: "BIAB Infill",
    duration: "45 mins",
    price: 60,
    category: "nail-extensions",
  },
  {
    id: 7,
    name: "File & Polish - Hands",
    duration: "20 mins",
    price: 20,
    category: "manicures-pedicures",
  },
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    serviceCategories[0].id
  );
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
  const [isOrderSummaryModalOpen, setIsOrderSummaryModalOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleSelect = (service) => {
    setSelectedService(service);
    setIsStaffModalOpen(true);
  };

  const handleShowDetails = (serviceId) => {
    console.log(`Show details for service: ${serviceId}`);
  };

  const handleSelectStaff = (staffId) => {
    setSelectedStaff(staffId);
    setIsStaffModalOpen(false);
    setIsDateTimeModalOpen(true);
  };

  const handleSelectDateTime = (date, time) => {
    const newService = {
      ...selectedService,
      staffId: selectedStaff,
      staffName: `Staff ${selectedStaff}`,
      date: date.toISOString(),
      time,
    };
    setSelectedServices([...selectedServices, newService]);
    setIsDateTimeModalOpen(false);
    setIsOrderSummaryModalOpen(true);
  };

  const handleAddMoreServices = () => {
    setIsOrderSummaryModalOpen(false);
    setSelectedService(null);
    setSelectedStaff(null);
  };

  const handleRemoveService = (serviceId) => {
    setSelectedServices(
      selectedServices.filter((service) => service.id !== serviceId)
    );
  };

  const handleAddService = (serviceId) => {
    const serviceToAdd = servicesData.find(
      (service) => service.id === serviceId
    );
    if (serviceToAdd) {
      setSelectedService(serviceToAdd);
      setIsStaffModalOpen(true);
    }
  };

  const handleConfirmBooking = () => {
    setIsOrderSummaryModalOpen(false);
    setIsBookingFormOpen(true);
  };

  const handleBookingFormSubmit = (formData) => {
    const bookingInfo = { ...formData, services: selectedServices };
    console.log("Booking confirmed:", bookingInfo);
    setBookingDetails(bookingInfo);
    setIsBookingFormOpen(false);
    setIsConfirmationDialogOpen(true);
  };

  const handleBackToOrder = () => {
    setIsBookingFormOpen(false);
    setIsOrderSummaryModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationDialogOpen(false);
    setSelectedCategory(serviceCategories[0].id);
    setSelectedService(null);
    setSelectedStaff(null);
    setSelectedServices([]);
    setBookingDetails(null);
  };

  const filteredServices = servicesData.filter(
    (service) => service.category === selectedCategory
  );


  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <h2 className="text-2xl font-bold mb-4">Browse services</h2>

      {/* Mobile Dropdown */}
      <div className="md:hidden mb-4">
        <Select
          onValueChange={setSelectedCategory}
          defaultValue={selectedCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {serviceCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Vertical Tabs and Services */}
      <div className="hidden md:flex space-x-6">
        {/* Vertical Tabs */}
        <div className="w-1/4">
          <ul className="space-y-2">
            {serviceCategories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services List */}
        <div className="w-3/4">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              duration={service.duration}
              price={service.price}
              onSelect={() => handleSelect(service)}
              onShowDetails={() => handleShowDetails(service.id)}
            />
          ))}
        </div>
      </div>

      {/* Mobile Services List */}
      <div className="md:hidden mt-4">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            name={service.name}
            duration={service.duration}
            price={service.price}
            onSelect={() => handleSelect(service)}
            onShowDetails={() => handleShowDetails(service.id)}
          />
        ))}
      </div>

      {/* Staff Selection Modal */}
      <StaffSelectionModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        onSelectStaff={handleSelectStaff}
        serviceName={selectedService?.name}
      />

      <DateTimeSelection
        isOpen={isDateTimeModalOpen}
        onClose={() => setIsDateTimeModalOpen(false)}
        onSelectDateTime={handleSelectDateTime}
        serviceName={selectedService?.name}
        staffName={selectedStaff ? `Staff ${selectedStaff}` : ""}
      />

      <OrderSummary
        isOpen={isOrderSummaryModalOpen}
        onClose={() => setIsOrderSummaryModalOpen(false)}
        selectedServices={selectedServices}
        onRemoveService={handleRemoveService}
        onAddMoreServices={handleAddMoreServices}
        onConfirm={handleConfirmBooking}
      />

      <BookingForm
        isOpen={isBookingFormOpen}
        onClose={() => setIsBookingFormOpen(false)}
        onSubmit={handleBookingFormSubmit}
        onBack={handleBackToOrder}
      />

      <ConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        onClose={handleCloseConfirmation}
        bookingDetails={bookingDetails}
      />
    </div>
  );
};

export default Services;
