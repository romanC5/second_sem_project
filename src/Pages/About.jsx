import React from "react";
import Logo from '../assets/Logo1.png';
const About = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-brand-red mb-4 text-center">About Us</h1>
        <p className="text-gray-700 text-lg mb-6 text-center">
          Welcome to <span className="font-semibold text-brand-red">Kinmel</span>!<br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laboriosam culpa eligendi, maiores aut omnis nulla labore odio harum amet nisi excepturi quibusdam quisquam, vero adipisci dignissimos, fugit ipsam error.
        </p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-brand-red">Our Mission</h2>
          <p className="text-gray-600">
           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt delectus expedita consequatur aperiam odio. Beatae, perspiciatis veniam. Animi ratione amet qui nemo veritatis! Consequuntur unde repellendus deleniti nam saepe consectetur?
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-brand-red">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
           
          </ul>
        </div>
        <div className="text-center mt-8">
          <img src={Logo} alt=" Logo" className="mx-auto w-24 h-24 mb-2" />
          <p className="text-gray-500 text-sm">Thank you for choosing Kinmel. Happy shopping!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
