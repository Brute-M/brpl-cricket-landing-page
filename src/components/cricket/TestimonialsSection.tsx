import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "I played district cricket 20 years ago. No one gave me a chance beyond that. BRPL is building the system I wish I had.",
    name: "Vijay Singh",
    zone: "Former Coach, Punjab",
    // image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "I drive an auto all day. My bat is in the backseat—I hit the nets every evening. BRPL made me believe I wasn't too old or too poor.",
    name: "Suresh Kumar",
    zone: ",25, Tamil Nadu",
    // image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "I'm a night security guard. I practice with a tennis ball during my breaks. BRPL told me talent doesn't have a schedule.",
    name: "Mohammad Irfan",
    zone: ",28, Uttar Pradesh",
    // image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-y border-gray-100">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-[#263574] leading-tight uppercase tracking-tight">
            Lives Changed by <span className="text-[#FACC15] drop-shadow-sm">BRPL</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#FACC15] mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-gray-50 rounded-3xl p-8 relative shadow-xl hover:shadow-2xl transition-all group border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-5 left-8">
                <div className="bg-[#263574] p-4 rounded-2xl shadow-lg">
                  <Quote className="w-6 h-6 text-[#FACC15] fill-current" />
                </div>
              </div>

              <div className="flex gap-1 mb-6 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                ))}
              </div>

              <p className="text-[#263574] text-lg md:text-xl mb-8 leading-relaxed font-bold">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                <div className="relative">
                  {/* <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#FACC15]"
                  /> */}
                  {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" /> */}
                </div>
                <div>
                  <h4 className="text-xl font-black italic text-[#263574] uppercase tracking-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm font-bold text-[#FACC15] uppercase tracking-widest">{testimonial.zone}</p>
                </div>
              </div>

              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#FACC15]/30 to-transparent rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background purely decorative dots or subtle shape */}
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="#263574" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>
    </section>
  );
};

export default TestimonialsSection;
