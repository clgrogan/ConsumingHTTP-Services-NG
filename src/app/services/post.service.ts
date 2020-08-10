import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
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
    return this.http.get(this.jsonUrl).pipe(catchError(this.handleError));
  }

  createPost(post: any) {
    return this.http
      .post(this.jsonUrl, post)
      .pipe(catchError(this.handleError));
  }

  updatePostPatch(post: any) {
    return this.http
      .patch(this.jsonUrl + "/" + post.id, { isRead: true })
      .pipe(catchError(this.handleError));
  }

  updatePostPut(post: any) {
    return this.http
      .put(this.jsonUrl + "/" + post.id, post)
      .pipe(catchError(this.handleError));
  }

  updatePostPutStringified(post: any) {
    return this.http
      .put(this.jsonUrl + "/" + post.id, JSON.stringify(post))
      .pipe(catchError(this.handleError));
  }

  deletePost(id: string) {
    return this.http
      .delete(this.jsonUrl + "/" + id)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    // const fakeErrorStatus = 400;
    // if (fakeErrorStatus === 400) {
    // simulate BadRequest error status also use badUrl.
    if (error.status === 400) {
      console.log(error.status);
      return throwError(new BadInputError());
    } else if (error.status === 404) {
      console.log(error.status);
      return throwError(new NotFoundError());
    } else {
      return throwError(error);
    }
  }
}
