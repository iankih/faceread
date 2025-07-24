import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

const faqData: FAQItem[] = [
  {
    id: "item-1",
    questionKey: "faq.q1",
    answerKey: "faq.a1",
  },
  {
    id: "item-2",
    questionKey: "faq.q2",
    answerKey: "faq.a2",
  },
  {
    id: "item-3",
    questionKey: "faq.q3",
    answerKey: "faq.a3",
  },
  {
    id: "item-4",
    questionKey: "faq.q4",
    answerKey: "faq.a4",
  },
  {
    id: "item-5",
    questionKey: "faq.q5",
    answerKey: "faq.a5",
  },
];

const FAQ: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-left mb-6 flex items-center gap-2 text-foreground">
          <HelpCircle className="w-6 h-6 text-primary dark:text-primary-foreground" />
          {t("faq.title")}
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left font-medium hover:no-underline text-foreground">
                {t(item.questionKey)}
              </AccordionTrigger>
              <AccordionContent className="text-foreground whitespace-pre-line text-left">
                {t(item.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
