export class SignUpController {
  handle(httpRequest: any): any {
    return {
      statusCode: 400,
      any: httpRequest,
      body: new Error('Missing param: name'),
    };
  }
}
