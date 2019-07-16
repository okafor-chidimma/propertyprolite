class Response {
  static successResponse(msg, responseData) {
    return {
      status: msg,
      data: responseData,
    };
  }

  static messageResponse(messageData) {
    return {
      message: messageData,
    };
  }

  static errorResponse(responseError) {
    return {
      status: 'Error',
      error: responseError,
    };
  }
}

export default Response;
