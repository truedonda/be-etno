import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video 
          src="videos/hero.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide"
        >
          Справжня <span className="text-[#D4AF37] italic">краса</span> в деталях
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 font-light tracking-wider max-w-2xl mx-auto"
        >
          Ексклюзивні авторські намиста ручної роботи, що підкреслюють вашу індивідуальність та неповторний стиль.
        </motion.p>
      </div>
    </section>
  );
}
