import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-gray-600 body-font mt-auto fixed bottom-0 left-0 w-full bg-gray-900 py-2 ml-26">
      <div className="container mx-auto flex items-center sm:flex-row flex-col justify-center">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="font-bold text-white text-xl">Justi-Chat</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          &copy; {currentYear} Justi-Chat. All rights reserved. —
          <a
            href="https://www.linkedin.com/in/logcos2x/"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            Soumik Paul
          </a>{" "}
          &amp;
          <a
            href="https://www.linkedin.com/in/priyanka-mukherjee-connect/"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            Priyanka Mukherjee
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
