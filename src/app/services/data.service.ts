import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { map, retry } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { NotFoundError } from "../common/not-found-error";
import { BadInputError } from "../common/bad-input-error";
import { InternalServerError } from "../common/internal-server-error";

export class DataService {
  constructor(
    private jsonUrl: string,
    private badUrl: string,
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get(this.jsonUrl).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  create(resource: any) {
    return this.http
      .post(this.jsonUrl, resource)
      .pipe(catchError(this.handleError));
  }

  updatePatch(resource: any) {
    return this.http
      .patch(this.jsonUrl + "/" + resource.id, { isRead: true })
      .pipe(catchError(this.handleError));
  }

  updatePut(resource: any) {
    return this.http
      .put(this.jsonUrl + "/" + resource.id, resource)
      .pipe(catchError(this.handleError));
  }

  updatePutStringified(resource: any) {
    return this.http
      .put(this.jsonUrl + "/" + resource.id, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }

  delete(id: string) {
    console.log("'delete()' method was called.");
    const returnObject: Observable<Object> = this.http
      .delete(this.jsonUrl + "/" + id)
      .pipe(retry(3));
    // Code to demo the return of a Promise instead of an Observable object.
    // const returnObject: Promise<Object> = this.http
    //   .delete(this.jsonUrl + "/" + id)
    //   .toPromise();
    return returnObject;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.log(error.status);
      return throwError(new BadInputError());
    } else if (error.status === 404) {
      console.log(error.status);
      return throwError(new NotFoundError());
    } else if (error.status === 500) {
      console.log(error.status);
      return throwError(new InternalServerError());
    } else {
      return throwError(error);
    }
  }
}
