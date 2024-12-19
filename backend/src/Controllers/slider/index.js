import SliderImage from "../../Models/slider";

export const getSliderImages = async (req, res) => {
    try {
        const images = await SliderImage.find({});
        const imageUrls = images.map((image) => {
            return `https://${process.env.bucket_name}.s3.amazonaws.com/${image.file}`;
        });

        res.status(200).json({ status: "success", data: imageUrls });
    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message });
    }
};