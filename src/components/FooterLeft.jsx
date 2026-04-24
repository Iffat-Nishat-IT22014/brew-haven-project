import React from 'react';
import coffeeLogo from '../assets/logo.png';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterLeft = () => {
    return (
        <div className='space-y-8'>

            {/* Logo and Brand Name */}
            <Link to={'/'}>
                <div className="flex items-center gap-4">
                    <img
                        src={coffeeLogo}
                        alt="Espresso Emporium Logo"
                        className="w-14 h-auto"
                    />
                    <h1
                        className="text-[#2B1A17] text-4xl font-bold tracking-tight"
                        style={{ fontFamily: 'Rancho, cursive' }}
                    >
                        Brew Haven
                    </h1>
                </div>
            </Link>

            {/* Description Text */}
            <p className='text-[#4B2E2B] md:text-lg leading-relaxed max-w-lg text-center md:text-left' style={{ fontFamily: 'Rancho, cursive' }}>
                Always ready to be your friend. Come & Contact with us to share your
                memorable moments, to share with your best companion.
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-start gap-6 text-3xl">
                <FaFacebook className="text-[#1877F2] hover:opacity-80 transition"></FaFacebook>
                <FaTwitter className="text-[#1DA1F2] hover:opacity-80 transition"></FaTwitter>
                <FaInstagram className="text-[#E4405F] hover:opacity-80 transition"></FaInstagram>
                <FaLinkedin className="text-[#0A66C2] hover:opacity-80 transition"></FaLinkedin>
            </div>

            {/* "Get in Touch" Section */}
            <div className="pt-6">

                {/* Title */}
                <h3
                    className="text-[#2B1A17] mb-2 text-4xl text-center md:text-left"
                    style={{ fontFamily: 'Rancho, cursive' }}
                >
                    Get in Touch
                </h3>

                {/* Contact Info */}
                <ul className="text-[#4B2E2B] text-base md:text-lg" style={{ fontFamily: 'Rancho, cursive' }}>
                    <li className="flex items-center justify-center md:justify-start">
                        <i className="fas fa-phone text-lg text-[#2B1A17]"></i>
                        <span>+88 01533 333 333</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start">
                        <i className="fas fa-envelope text-lg text-[#2B1A17]"></i>
                        <span>info@gmail.com</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start">
                        <i className="fas fa-map-marker-alt text-lg text-[#2B1A17]"></i>
                        <span>72, Wall Street, King Road, Dhaka</span>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default FooterLeft;