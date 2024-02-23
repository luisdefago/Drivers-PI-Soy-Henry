import { useState } from "react";
import axios from "axios";
import "./createDriver.css";

const CreateDriverForm = () => {
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState("");
  const [dob, setDob] = useState("");
  const [description, setDescription] = useState("");
  const [teams, setTeams] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/drivers/addDriver",
          {
            forename,
            surname,
            nationality,
            image,
            dob,
            description,
            teams,
          }
        );
        alert("Nuevo driver creado con éxito.");
        // Reiniciar el estado del formulario después de enviar los datos con éxito
        setForename("");
        setSurname("");
        setNationality("");
        setImage("");
        setDob("");
        setDescription("");
        setTeams("");
      } catch (error) {
        console.error("Error:", error);
        setError(
          "Hubo un problema al crear el driver. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }
  };

  const validateForm = () => {
    if (
      !forename ||
      !surname ||
      !nationality ||
      !image ||
      !dob ||
      !description ||
      !teams
    ) {
      setError("Por favor, complete todos los campos.");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <main className="form">
      <form onSubmit={handleSubmit} className="formContainer">
        <h1 className="formTitle">Create new driver</h1>
        <div className="formContInutsTextarea">
          <div className="formContInputs">
            <label htmlFor="forename" className="formLabel">
              Forename:
            </label>
            <input
              type="text"
              id="forename"
              value={forename}
              onChange={(e) => setForename(e.target.value)}
              required
              className="formInput"
            />
            <label htmlFor="surname" className="formLabel">
              Surname:
            </label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="formInput"
            />
            <label htmlFor="teams" className="formLabel">
              Teams:
            </label>
            <input
              type="text"
              id="teams"
              value={teams}
              onChange={(e) => setTeams(e.target.value)}
              required
              className="formInput"
            />
            <label htmlFor="nationality" className="formLabel">
              Nationality:
            </label>
            <input
              type="text"
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
              className="formInput"
            />
            <label htmlFor="dob" className="formLabel">
              Dob:
            </label>
            <input
              type="text"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="formInput"
            />
            <label htmlFor="image" className="formLabel">
              URL from image:
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="formInput"
            />
          </div>
          <div className="formContTextarea">
            <label htmlFor="description" className="formLabel">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="formTextarea"
              maxLength={1400}
            />
          </div>
        </div>
        <button type="submit" className="formButtom">
          Create
        </button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
};

export default CreateDriverForm;
