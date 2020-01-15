export class ResponseHandler {
  public sendResponse(response, data: any) {
    response.send({
      'success': true,
      data
    });
  }
    
  public catchErrors(response, validationError: any) {
    response.status(422).send({
      success: false,
      errors: validationError.message,
    });
  }
}