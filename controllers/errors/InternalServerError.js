class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = 500;
    this.message = 'Ошибка сервера или пространственно-временного континуума';
  }
}

module.exports = InternalServerError;
