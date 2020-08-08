import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import { BadInputError } from "../common/bad-input-error";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private jsonUrl = "https://jsonplaceholder.typicode.com/posts";
  private badUrl = "https://jsonplaceholderd.typicodesz.com/possts";

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.jsonUrl);
  }

  createPost(post: any) {
    return this.http.post(this.jsonUrl, post).pipe(
      catchError((error: HttpErrorResponse) => {
        // let fakeErrorStatus = 400;
        // if (fakeErrorStatus === 400) {
        if (error.status === 400) {
          return throwError(new BadInputError(error));
        } else {
          return throwError(new AppError(error));
        }
      })
    );
  }

  updatePostPatch(post: any) {
    return this.http.patch(this.jsonUrl + "/" + post.id, { isRead: true });
  }

  updatePostPut(post: any) {
    return this.http.put(this.jsonUrl + "/" + post.id, post);
  }

  updatePostPutStringified(post: any) {
    return this.http.put(this.jsonUrl + "/" + post.id, JSON.stringify(post));
  }

  deletePost(id: string) {
    return this.http.delete(this.jsonUrl + "/" + id).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          console.log(error.status);
          //No need to return the error response from the API since this is an expected error.
          return throwError(new NotFoundError());
          // return Observable.throw(new NotFoundError());
        } else {
          return throwError(new AppError(error));
        }
      })
    );
  }
}
