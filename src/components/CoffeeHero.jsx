import React from 'react';
import coffeeBg from '../assets/banner_bg.png';
import textureBg from '../assets/7.png';

const CoffeeHero = () => {
    return (
        <section className="relative w-full py-20 bg-[#0a0a0a] overflow-hidden flex items-center">
            <div
                className="absolute inset-0 z-0 bg-no-repeat bg-cover md:bg-contain"
                style={{
                    backgroundImage: `url(${coffeeBg})`,
                    backgroundPosition: 'left center'
                }}
            >
                <div
                    className="absolute inset-0 opacity-20 mix-blend-overlay bg-repeat"
                    style={{ backgroundImage: `url(${textureBg})` }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/70"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-12 flex justify-end">
                <div className="max-w-xl p-3 text-center md:text-left md:ml-auto">

                    <h1
                        className="text-4xl md:text-5xl text-white leading-tight mb-4 drop-shadow-lg font-bold tracking-tight"
                        style={{ fontFamily: 'Rancho, cursive' }}
                    >
                        Would you like a <br />Cup of Delicious Coffee?
                    </h1>

                    <p className="text-gray-300 text-sm md:text-lg mb-8 max-w-md ml-auto md:ml-0 leading-relaxed drop-shadow-md">
                        It's coffee time - Sip & Savor - Relaxation in every sip! Get the nostalgia back!!
                        Your companion of every moment!!! Enjoy the beautiful moments and make them memorable.
                    </p>

                    <div className="flex justify-center md:justify-start">
                        <button className="bg-[#d9b07c] hover:bg-[#c49b68] text-black font-bold py-3 px-12 rounded-sm transition-all duration-300 shadow-lg uppercase tracking-widest text-sm">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoffeeHero;