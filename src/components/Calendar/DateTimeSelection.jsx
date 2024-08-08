import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { X } from 'lucide-react';
import { format } from 'date-fns';

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 10; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      slots.push(format(new Date(2022, 0, 1, hour, minute), 'HH:mm'));
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const DateTimeSelectionModal = ({ isOpen, onClose, onSelectDateTime, serviceName, staffName }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onSelectDateTime(selectedDate, selectedTime);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-w-[100vw] w-full h-[100vh] sm:h-auto p-0 sm:p-6">
        <div className="flex flex-col h-full">
          <DialogHeader className="p-4 sm:p-0 border-b sm:border-b-0">
            <div className="relative">
              <DialogTitle className="text-xl font-bold text-center">Select Date & Time</DialogTitle>
              <DialogClose className="absolute right-0 top-1/2 -translate-y-1/2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                {/* <X className="h-4 w-4" />
                <span className="sr-only">Close</span> */}
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="flex-grow overflow-auto p-4 sm:p-0">
            <p className="text-center text-sm text-gray-500 mb-4">
              Choose a date and time for your {serviceName} with {staffName}.
            </p>
            <div className="flex justify-center mb-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => handleTimeSelect(time)}
                  className="text-sm"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          <div className="p-4 sm:p-0 border-t sm:border-t-0 mt-auto md:mt-3">
            <Button onClick={handleConfirm} className="w-full" disabled={!selectedDate || !selectedTime}>
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DateTimeSelectionModal;