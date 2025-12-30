import { motion } from 'framer-motion';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Who can participate in BRPL?',
    answer: 'BRPL is open to aspiring and semi-professional cricketers aged 18-40 from 28 states and 8 Union Territories across India. If you have the skill and hunger to compete, BRPL is for you.',
  },
  {
    question: 'Do I need to travel for trials or auditions?',
    answer: 'No. Players can audition from their own state or local ground by submitting a short performance video. Talent matters more than location.',
  },
  {
    question: 'How does the selection process work?',
    answer: 'Players progress through a direct pathway — video auditions → zonal tournaments → nationwide league tournament. Performance at every stage decides selection.',
  },
  {
    question: 'What makes BRPL different from other cricket leagues?',
    answer: 'BRPL focuses on fair opportunity, real exposure and competitive intensity. It’s not just about participation — it’s about getting noticed and moving forward.',
  },
  {
    question: 'What do players gain beyond match experience?',
    answer: 'Players gain visibility, confidence, high-pressure match exposure and recognition within a structured cricket ecosystem designed to support long-term growth.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-[#263574] leading-tight uppercase tracking-tight">
            Frequently Asked <span className="text-[#FACC15] drop-shadow-sm">Questions</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#FACC15] mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="max-w-7l mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((item, idx) => (
              <AccordionItem
                key={item.question}
                value={`faq-${idx}`}
                className="bg-gray-50 rounded-2xl border border-gray-100 px-6 py-2 shadow-sm hover:shadow-md transition-all group overflow-hidden"
              >
                <AccordionTrigger className="text-left text-[#263574] hover:no-underline font-black uppercase tracking-wider text-lg md:text-xl py-4 data-[state=open]:text-[#FACC15] transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed font-bold py-4 border-t border-gray-200 mt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-50 rounded-full -translate-x-1/2 translate-y-1/2 -z-0" />
    </section>
  );
};

export default FAQSection;
