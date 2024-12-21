import Faq from "../../Models/Faq";



export  const createFaq = async (req, res) => {
    try {
        const value = { title, description } = req.body
        const faq = new Faq(value);
        await faq.save();
        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create FAQ', error: error.message });
    }
};


export const getAllFaqs = async (req, res) => {
    try {
        const faqs = await Faq.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch FAQs', error: error.message });
    }
};


export const getFaqById = async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch FAQ', error: error.message });
    }
};


export const updateFaq = async (req, res) => {
    try {
        const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update FAQ', error: error.message });
    }
};


export const deleteFaq = async (req, res) => {
    try {
        const faq = await Faq.findByIdAndDelete(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete FAQ', error: error.message });
    }
};


