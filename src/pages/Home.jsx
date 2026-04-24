import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Coffee, ShieldCheck, Truck, Clock } from 'lucide-react';
import bgImage from '../assets/bg_main.png';
import bgImageCTA from '../assets/dashboard_bg.jpg';
import CoffeeHero from '../components/CoffeeHero';

const Home = () => {
  return (
    <div
      className="flex flex-col gap-20 pb-20 min-h-screen bg-white relative bg-fixed bg-cover"
      style={{
        backgroundImage: `url(${bgImage})`,
        fontFamily: 'Rancho, cursive'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col gap-20 pb-20">

        {/* Hero Section */}
        <section>
          <CoffeeHero></CoffeeHero>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Coffee />, title: "High Quality", desc: "Premium beans sourced from the best estates." },
            { icon: <ShieldCheck />, title: "Safe Order", desc: "Secure payments and contactless pickup." },
            { icon: <Truck />, title: "Fast Delivery", desc: "Fresh coffee delivered to your doorstep." },
            { icon: <Clock />, title: "24/7 Support", desc: "We are here to help you anytime." }
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-amber-950/90 backdrop-blur-md rounded-3xl text-white border border-"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/20 text-white/90 flex items-center justify-center mb-6">
                {React.cloneElement(f.icon, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-white/90">{f.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Specialty Section */}
        <section className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800"
              alt="Crafting Coffee"
              className="rounded-md shadow-md w-full"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 italic text-amber-950/90">
              Made with Love, Crafted with Precision
            </h2>

            <p className="text-lg text-gray-900 mb-6 leading-relaxed">
              Our baristas are artists. Each cup is a masterpiece of temperature, timing, and technique.
            </p>

            <ul className="space-y-4 text-amber-950 mb-8 font-medium">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-950" /> Ethically Sourced Coffee Beans
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-950" /> House-Made Syrups & Flavors
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-950" /> Expert Baristas
              </li>
            </ul>

            <Link to="/about" className="btn bg-amber-950   text-white rounded-4xl px-10 py-2 border-amber-950 hover:bg-white hover:text-amber-950 gap-2">
              Discover More
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Home;