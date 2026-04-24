import React from 'react';
import bgImage from '../assets/bg_pattern.jpg';

const FooterLine = () => {
    return (
        <div>
            <div
                className="flex items-center justify-center py-2 border-b-2 border-[#1E1E1E]"
                style={{
                    backgroundColor: '#372727',
                    backgroundImage: `url(${bgImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'repeat',
                }}
            >
                <div>
                    <p className="font-cormorant text-lg text-white opacity-90">
                        © Brew Haven! All Rights Reserved 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FooterLine;