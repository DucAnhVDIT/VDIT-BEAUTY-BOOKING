import React from "react";
import logo from '../assets/img/DefaultLogo.png';
import { Facebook, Twitter, Instagram } from 'lucide-react';

function BusinessInfo() {
  const openingHours = [
    { day: 'Monday', hours: '10:00 AM - 6:00 PM', isOpen: true },
    { day: 'Tuesday', hours: '10:00 AM - 6:00 PM', isOpen: true },
    { day: 'Wednesday', hours: '10:00 AM - 6:00 PM', isOpen: true },
    { day: 'Thursday', hours: '10:00 AM - 6:00 PM', isOpen: true },
    { day: 'Friday', hours: '10:00 AM - 6:00 PM', isOpen: true },
    { day: 'Saturday', hours: '10:00 AM - 6:00 PM', isOpen: true },
    { day: 'Sunday', hours: 'Closed', isOpen: false },
  ];

  return (
    <div className="container mx-auto px-4 py-6 font-bricolage">
      <div className="bg-white p-6 rounded-2xl shadow max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Business Information Column */}
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-4">
            <div className="flex items-center mb-4">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-20 mr-4"
                style={{ aspectRatio: "1", objectFit: "cover" }}
              />
              <h2 className="text-2xl font-semibold">Viet NAIL</h2>
            </div>
            <div className="mb-4">
              <p className="font-medium text-gray-700">Location:</p>
              <p className="text-gray-600">
                Unit A05, Parkhall B.C, 40 Martell Road
                <br />
                London, SE21 8EN
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium text-gray-700">Telephone:</p>
              <p className="text-gray-600">+44 20 1234 5678</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-2">Follow us:</p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-600" />
                <Twitter className="w-6 h-6 text-gray-600" />
                <Instagram className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Opening Hours and Additional Info Column */}
          <div className="md:w-1/2 md:pl-4 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-8">
            <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2 mb-6">
              {openingHours.map((day, index) => (
                <li key={index} className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-3 ${day.isOpen ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className={`font-medium w-28 ${day.isOpen ? 'text-gray-800' : 'text-gray-400'}`}>{day.day}</span>
                  <span className={day.isOpen ? 'text-gray-600' : 'text-gray-400'}>{day.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessInfo;