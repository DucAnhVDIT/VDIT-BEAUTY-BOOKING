import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus } from 'lucide-react';
import { format } from 'date-fns';

const OrderSummary = ({ isOpen, onClose, selectedServices, onRemoveService, onAddMoreServices, onConfirm }) => {
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-w-[100vw] w-full h-[100vh] sm:h-auto p-0 sm:p-6">
        <div className="flex flex-col h-full">
          <DialogHeader className="p-4 sm:p-0 border-b sm:border-b-0">
            <div className="relative">
              <DialogTitle className="text-xl font-bold text-center">Order Summary</DialogTitle>
              <DialogClose className="absolute right-0 top-1/2 -translate-y-1/2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                {/* <X className="h-4 w-4" />
                <span className="sr-only">Close</span> */}
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="flex-grow overflow-auto p-4 sm:p-0">
            <div className="space-y-4">
              {selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(service.date), 'PPP')} at {service.time}
                    </p>
                    <p className="text-sm text-gray-500">with {service.staffName}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">£{service.price}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onRemoveService(service.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={onAddMoreServices}
              >
                <Plus className="h-4 w-4 mr-2" /> Add More Services
              </Button>
            </div>
          </div>
          <div className="p-4 sm:p-0 border-t sm:border-t-0 mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">£{totalPrice}</span>
            </div>
            <Button onClick={onConfirm} className="w-full">
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSummary;