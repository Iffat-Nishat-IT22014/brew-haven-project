import React from 'react';
import footerBg from '../assets/dashboard_bg.jpg';
import FooterLeft from '../components/FooterLeft';
import FooterRight from '../components/FooterRight';
import FooterLine from '../components/FooterLine';

const Footer = () => {
    return (
        <footer className="w-full font-poppins relative">
            <div
                className="w-full relative"
                style={{
                    backgroundImage: `url(${footerBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* প্যাডিং কমিয়ে py-10 থেকে py-16 এর মধ্যে রাখা হয়েছে */}
                <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-center">

                    {/* Left Column */}
                    <div className="w-full h-full flex flex-col justify-center">
                        <FooterLeft />
                    </div>

                    {/* Right Column */}
                    <div className="w-full h-full flex flex-col justify-center">
                        <FooterRight />
                    </div>
                </div>
            </div>

            {/* Bottom Credit Line */}
            <FooterLine />
        </footer>
    );
};

export default Footer;