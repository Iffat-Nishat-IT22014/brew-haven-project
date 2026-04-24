import React from 'react';

const FooterRight = () => {
    return (

        <div className="bg-transparent pt-12 md:pt-0" style={{ fontFamily: 'Rancho, cursive' }}>
            <h3 className="text-4xl text-[#331A15] mt-2 mb-10 font-cormorant font-bold text-center md:text-left" style={{ fontFamily: 'cursive' }}>
                Connect with Us
            </h3>

            <form className="space-y-6">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-5 py-4 rounded-md shadow-inner bg-white/70 text-[#1B1A1A] placeholder:text-[#1B1A1A]/70 text-base md:text-lg focus:ring-2 focus:ring-[#331A15] outline-none"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-5 py-4 rounded-md shadow-inner bg-white/70 text-[#1B1A1A] placeholder:text-[#1B1A1A]/70 text-base md:text-lg focus:ring-2 focus:ring-[#331A15] outline-none"
                />
                <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full px-5 py-4 rounded-md shadow-inner bg-white/70 text-[#1B1A1A] placeholder:text-[#1B1A1A]/70 text-base md:text-lg focus:ring-2 focus:ring-[#331A15] outline-none resize-none"
                />
                <button
                    type="submit"
                    className={`font-cormorant text-xl font-bold border-2 text-[#331A15] border-[#331A15] rounded-full px-6 py-2 transition duration-300 hover:bg-[#331A15] hover:text-white`}
                >
                    Send Message
                </button>
            </form>

        </div>
    );
};

export default FooterRight;