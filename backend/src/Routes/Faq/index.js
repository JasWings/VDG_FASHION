import express from 'express'
import { createFaq, deleteFaq, getAllFaqs, getFaqById, updateFaq } from '../../Controllers/Faq/index.js';

const Faqrouter = express.Router();


Faqrouter.post('/faq', createFaq);
Faqrouter.get('/faqs', getAllFaqs);
Faqrouter.get('/faq/:id', getFaqById);
Faqrouter.put('/faq/:id', updateFaq);
Faqrouter.delete('/faq/:id', deleteFaq);

export default Faqrouter;
