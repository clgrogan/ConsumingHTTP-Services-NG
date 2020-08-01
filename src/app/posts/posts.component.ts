import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
})
export class PostsComponent {
  posts: any[];

  constructor(private http: HttpClient) {
    http
      .get("https://jsonplaceholder.typicode.com/posts")
      .subscribe((response) => {
        // this.posts = response; //works but gives warning in VS Code about the action
        this.posts = response as any;
        console.log(this.posts);
      });
  }
  createPost(title: HTMLInputElement) {}
}
