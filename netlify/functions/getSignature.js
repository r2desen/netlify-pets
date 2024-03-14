const cloudinary = require("cloudinary").v2;
const isAdmin = require("../../our-library/isAdmin");

const cloudinaryConfig = cloudinary.config({
  cloud_name: "dx3mt7gp5",
  api_ley: "922933958168436",
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

const handler = async (event) => {
  if (isAdmin(event)) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      cloudinaryConfig.api_secret
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp, signature }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
