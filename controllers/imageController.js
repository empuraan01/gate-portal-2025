import axios from "axios";
import sharp from "sharp";

export const processImage = async (req, res) => {
  const photoUrl = req.query.url;

  if (!photoUrl) {
    return res.status(400).send("Image URL is required");
  }

  try {
    const response = await axios.get(photoUrl, { responseType: "arraybuffer" });
    const imageBuffer = response.data;

    const resizedImage = await sharp(imageBuffer).resize(150).png().toBuffer();

    res.type("png");
    res.send(resizedImage);
  } catch (err) {
    console.error("Error fetching or processing the image:", err);
    res.status(500).send("Error processing image");
  }
};

