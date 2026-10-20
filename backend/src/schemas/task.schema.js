const VALID_STATUSES = ["pendiente", "en progreso", "finalizada"];
const MIN_TITLE_LENGTH = 3;

function createValidationError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateTitle(title) {
  if (typeof title !== "string" || title.trim().length < MIN_TITLE_LENGTH) {
    throw createValidationError(`El título debe tener al menos ${MIN_TITLE_LENGTH} caracteres.`);
  }
  return title.trim();
}

function validateStatus(status) {
  if (!VALID_STATUSES.includes(status)) {
    throw createValidationError(`Estado inválido. Use: ${VALID_STATUSES.join(", ")}.`);
  }
  return status;
}

function validateCreateTaskInput({ title, description = "" }) {
  return {
    title: validateTitle(title),
    description: String(description).trim()
  };
}

module.exports = {
  VALID_STATUSES,
  validateTitle,
  validateStatus,
  validateCreateTaskInput,
  createValidationError
};
