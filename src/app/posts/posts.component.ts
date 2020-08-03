import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
})
export class PostsComponent implements OnInit {
  posts: any[];
  private jsonUrl = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {
    // http.get(this.jsonUrl).subscribe((response) => {
    //   // this.posts = response; //works but gives warning in VS Code about the action
    //   this.posts = response as any;
    //   console.log(this.posts);
    // });
  }
  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    // HttpClient.post(url,body)
    this.http.post(this.jsonUrl, post).subscribe((response: any) => {
      // Add the id using dot notation, if 'post' was declared as any[]
      post.id = response.id;
      // use bracket notation if post wasn't declared as any and didn't have an id attribute initially.
      post["id2"] = response.id;
      console.log(post); // lets see what damage we did.
      // add post to the posts array using splice to add it to the front of the array (vs push)
      this.posts.splice(0, 0, post);
      //clear the input field
      input.value = "";
    });
  }

  updatePost(post) {
    // the end point must reference a specific record (called post in this instance).
    // append the id to the url.
    this.http
      .patch(this.jsonUrl + "/" + post.id, JSON.stringify({ isRead: true }))
      .subscribe((response) => {
        console.log("updatePost - PATCH: ", response);
      });

    // Using put we send the entirity of the data in the Object
    post["isRead"] = true;
    this.http
      .put(this.jsonUrl + "/" + post.id, JSON.stringify(post))
      .subscribe((response) => {
        console.log("updatePost - PUT: ", response);
      });
  }

  deletePost(post) {
    this.http.delete(this.jsonUrl + "/" + post.id).subscribe((response) => {
      // Need to delete the record (post) locally.
      let i = this.posts.indexOf(post);
      this.posts.splice(i, 1);
    });
  }
  ngOnInit() {
    this.http.get(this.jsonUrl).subscribe((response) => {
      // this.posts = response; //works but gives warning in VS Code about the action
      this.posts = response as any;
      console.log(this.posts);
    });
  }
}
