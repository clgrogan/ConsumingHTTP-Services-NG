import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private jsonUrl = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.jsonUrl);
  }

  createPost(post: any) {
    return this.http.post(this.jsonUrl, post);
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
    return this.http.delete(this.jsonUrl + "/" + id);
  }
}
