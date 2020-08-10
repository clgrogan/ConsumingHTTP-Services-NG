import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    alert("An unexpected error occurred.\n" + error.message);
    console.log(error);
  }
}
