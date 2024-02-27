const validateEmptyFields = (
  forename,
  surname,
  nationality,
  image,
  dob,
  description,
  teams
) => {
  return (
    !forename ||
    !surname ||
    !nationality ||
    !image ||
    !dob ||
    !description ||
    !teams
  );
};

const validateDateFormat = (dob) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  return dateRegex.test(dob);
};

const validateNameFormat = (forename, surname) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(forename) && nameRegex.test(surname);
};

const validateImageFormat = (image) => {
  const imageExtension = image.split(".").pop().toLowerCase();
  return imageExtension === "jpg" || imageExtension === "jpeg";
};

const validateTeams = (teams, allTeams) => {
  if (!teams) {
    return false;
  }
  if (!allTeams || allTeams.length === 0) {
    return true;
  }
  const teamsArray = teams.split(",").map((team) => team.trim().toLowerCase());

  const lowerCaseAllTeams = allTeams.map((team) => team.toLowerCase());

  return teamsArray.every((team) => lowerCaseAllTeams.includes(team));
};

export {
  validateEmptyFields,
  validateDateFormat,
  validateNameFormat,
  validateImageFormat,
  validateTeams,
};
