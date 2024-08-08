import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

const staffMembers = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Carol Williams" },
  { id: 4, name: "David Brown" },
];

const StaffSelectionModal = ({ isOpen, onClose, onSelectStaff, serviceName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-w-[100vw] w-full h-[100vh] sm:h-auto p-0 sm:p-6">
        <div className="flex flex-col h-full">
          <DialogHeader className="p-4 sm:p-0 border-b sm:border-b-0">
            <div className="relative">
              <DialogTitle className="text-xl font-bold text-center">Select a Staff Member</DialogTitle>
              {/* <DialogClose className="absolute right-0 top-1/2 -translate-y-1/2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose> */}
            </div>
          </DialogHeader>
          <div className="flex-grow overflow-auto p-4 sm:p-0">
            <p className="text-center text-sm text-gray-500 mb-4">
              Choose a staff member for your {serviceName} service.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {staffMembers.map((staff) => (
                <Button
                  key={staff.id}
                  onClick={() => onSelectStaff(staff.id)}
                  variant="outline"
                  className="justify-center py-6 text-base font-normal"
                >
                  {staff.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="p-4 sm:p-0 border-t sm:border-t-0 mt-auto md:mt-3">
            <Button onClick={onClose} variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StaffSelectionModal;