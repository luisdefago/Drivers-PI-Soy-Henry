const postDriver = require("../controllers/PostDriver");

const handlePostDriver = async (req, res) => {
  try {
    const { forename, surname, description, image, nationality, dob, teams } =
      req.body;
    const result = await postDriver(
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
      teams
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error en el manejador de crear conductor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { handlePostDriver };
