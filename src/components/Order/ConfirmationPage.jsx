import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from 'date-fns';

const ConfirmationDialog = ({ isOpen, onClose, bookingDetails }) => {
  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString);
    return `${format(date, 'MMMM do, yyyy')} at ${timeString}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-[425px] h-[100vh] sm:h-auto p-0 sm:p-6 sm:rounded-lg">
        <div className="flex flex-col h-full">
          <DialogHeader className="relative p-4 sm:p-0 mb-4 sm:mb-6">
            <DialogTitle className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <span className="text-2xl font-bold">Booking Confirmed!</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-grow overflow-auto px-4 sm:px-0">
            <div className="text-center mb-6">
              <p className="text-gray-600">Thank you for your booking. We've sent a confirmation email to {bookingDetails?.email}.</p>
            </div>
            
            <div className="text-left">
              <h2 className="font-bold text-lg mb-3">Booking Details:</h2>
              <p className="mb-2"><span className="font-semibold">Name:</span> {bookingDetails?.firstName} {bookingDetails?.lastName}</p>
              <p className="mb-2"><span className="font-semibold">Mobile:</span> {bookingDetails?.mobile}</p>
              <p className="font-semibold mt-4 mb-2">Services:</p>
              <ul className="list-disc list-inside">
                {bookingDetails?.services.map((service, index) => (
                  <li key={index} className="ml-4 mb-2">
                    {service.name} - {formatDateTime(service.date, service.time)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-auto p-4 sm:p-0">
            <Button onClick={onClose} className="w-full bg-gray-900 text-white hover:bg-gray-800">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;