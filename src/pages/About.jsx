import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Users, Heart, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero */}
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 italic text-primary">A Tradition of Taste</h1>
            <p className="text-xl text-base-content/70 leading-relaxed">
              Brew Haven wasn't just built; it was dreamed. Since our beginning in 2012, we've remained dedicated to the craft of perfect coffee and the community it creates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-4xl font-serif font-bold mb-8 italic">Our Small-Batch Philosophy</h2>
          <div className="space-y-6 text-base-content/70 text-lg leading-relaxed">
            <p>
              We believe coffee is much more than a morning kick-start—it's an experience. That's why we source only the top 1% of Arabica beans from sustainable, ethical farms in Ethiopia, Colombia, and Brazil.
            </p>
            <p>
              Every batch is roasted in small quantities right here in our city, ensuring that the beans you grind for your espresso or pour-over are at the absolute peak of their freshness and flavor complexity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold text-primary font-serif">12+</div>
              <div className="text-base-content/60 font-medium">Years of Brewing</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary font-serif">50k+</div>
              <div className="text-base-content/60 font-medium">Cups Served Monthly</div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1497933321188-941f9ad36b12?auto=format&fit=crop&q=80&w=400" className="rounded-3xl w-full h-full object-cover shadow-lg" referrerPolicy="no-referrer" />
          <img src="https://images.unsplash.com/photo-1511228539447-93a0091c6621?auto=format&fit=crop&q=80&w=400" className="rounded-3xl w-full h-full object-cover shadow-lg mt-8" referrerPolicy="no-referrer" />
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 bg-base-200 rounded-[50px] p-12 md:p-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold italic">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Users />, title: "Community First", text: "We're not just a shop, we're a hub where neighbors become friends." },
            { icon: <Heart />, title: "Ethical Sourcing", text: "We work directly with farmers to ensure fair pay and sustainable practices." },
            { icon: <Award />, title: "Quality Above All", text: "If it's not the best we've ever tasted, it won't make it to your table." }
          ].map((v, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary text-primary-content flex items-center justify-center mx-auto mb-6">
                {React.cloneElement(v.icon, { size: 32 })}
              </div>
              <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
              <p className="text-base-content/60">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
