const messageService = require("../services/message");

const sendMessage = async (req, res) => {
  try {
    const { to, content } = req.body;
    const from = req.userId;

    // Validate input
    if (!content || !to || !from) {
      return res.status(400).json({ errors: ["Missing required fields"] });
    }

    // Send message
    const message = await messageService.sendMessage(from, to, content);

    res.status(201).json({ message });
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ errors: [error.message] });
  }
};

module.exports = { sendMessage };
