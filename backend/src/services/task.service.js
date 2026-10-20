const { validateCreateTaskInput, validateStatus, createValidationError } = require("../schemas/task.schema");

class TaskService {
  constructor(repository) {
    this.repository = repository;
  }

  listTasks() {
    return this.repository.findAll();
  }

  createTask(input) {
    const data = validateCreateTaskInput(input);
    return this.repository.create({ ...data, status: "pendiente" });
  }

  changeStatus(id, status) {
    validateStatus(status);
    const updated = this.repository.updateStatus(id, status);
    if (!updated) {
      throw createValidationError("No existe una tarea con ese identificador.", 404);
    }
    return updated;
  }
}

module.exports = { TaskService };
