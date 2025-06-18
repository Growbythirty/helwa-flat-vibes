
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Will this make me gain weight?",
      answer: "Nope. Lean muscle only. HELWA FLAT is designed to support lean muscle development without unwanted bulk or weight gain."
    },
    {
      question: "Is it safe for sensitive stomachs?",
      answer: "Absolutely. Zero lactose, zero junk. Our hydrolyzed whey and digestive enzymes are specifically formulated for sensitive digestive systems."
    },
    {
      question: "How do I know it works?",
      answer: "Science, not hype. Our formula is clinically tested with 0% reported bloating and has been developed with input from 250+ women and top nutritionists."
    },
    {
      question: "When will HELWA FLAT be available?",
      answer: "We're launching soon! Join our waitlist to be the first to know when HELWA FLAT becomes available."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-pink-500">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about HELWA FLAT.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-xl border-0 shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 px-6 py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 px-6 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
