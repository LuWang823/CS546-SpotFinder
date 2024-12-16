import express from "express";
import globalUniqueHobbies from "../modules/hobbyModule.js";

const hobbyRouter = express.Router();

// Endpoint to fetch the global hobbies
hobbyRouter.get("/", async (req, res) => {
  try {
    // Retrieve the global unique hobbies
    const globalSettings = await globalUniqueHobbies.findOne();
    const hobbies = globalSettings ? globalSettings.hobbies : [];
    res.status(200).json({ success: true, hobbies });
  } catch (error) {
    console.error("Error fetching global hobbies:", error);
    res.status(500).json({ success: false, message: "Error fetching hobbies" });
  }
});

export default hobbyRouter;
