import express from 'express'
import { createFaq, deleteFaq, getAllFaqs, getFaqById, updateFaq } from '../../Controllers/Faq/index.js';

const Faqrouter = express.Router();


Faqrouter.post('/faq', createFaq);
Faqrouter.get('/', getAllFaqs);
Faqrouter.get('/:id', getFaqById);
Faqrouter.put('/:id', updateFaq);
Faqrouter.delete('/:id', deleteFaq);

export default Faqrouter;
