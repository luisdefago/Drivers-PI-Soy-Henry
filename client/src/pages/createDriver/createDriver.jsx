import { useState } from "react";
import "./createDriver.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createDriverRequest } from "../../redux/actions/actionsCreators";

const CreateDriverForm = () => {
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState("");
  const [dob, setDob] = useState("");
  const [description, setDescription] = useState("");
  const [teams, setTeams] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(
        createDriverRequest({
          forename,
          surname,
          nationality,
          image,
          dob,
          description,
          teams,
        })
      );
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
      alert("Por favor, complete todos los campos.");
      return false;
    }
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
