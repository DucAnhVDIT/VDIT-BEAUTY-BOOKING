import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';

const BookingForm = ({ isOpen, onClose, onSubmit }) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); 
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const onSubmitForm = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-w-[100vw] w-full h-[100vh] sm:h-auto p-6 sm:p-6">
        <DialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
        </DialogHeader>
        <div className="text-red-500 font-bold mb-4">
          Time left to complete booking: {formatTime(timeLeft)}
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register("firstName", { required: "First name is required" })} />
            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register("lastName", { required: "Last name is required" })} />
            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
          </div>
          <div>
            <Label htmlFor="mobile">Mobile</Label>
            <Input id="mobile" {...register("mobile", { required: "Mobile number is required" })} />
            {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email", { required: "Email is required" })} />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div>
            <Label htmlFor="comment">Comment</Label>
            <Textarea id="comment" {...register("comment")} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" {...register("terms", { required: "You must agree to the terms" })} />
            <Label htmlFor="terms">
              Agree Terms & Conditions
            </Label>
          </div>
          {errors.terms && <span className="text-red-500">{errors.terms.message}</span>}
          <p className="text-sm text-gray-500">No cancellations or changes allowed within 24 hours of the appointment</p>
          <Button type="submit" className="w-full">Complete Booking</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;