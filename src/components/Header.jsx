import React from "react";
import banner from "../assets/img/DefaultHeader.png"

function Header() {
  return (
    <div className="container mx-auto px-4 pt-6">
      <header className="rounded-2xl overflow-hidden">
        <img
          src={banner}
          alt="Treat Your Self - Book Online Here"
          className="w-full h-auto rounded-2xl"
          style={{ 
            aspectRatio: "5/1", 
            objectFit: "cover",
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        />
      </header>
    </div>
  );
}

export default Header;