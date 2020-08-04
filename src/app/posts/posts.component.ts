import { Component, OnInit } from "@angular/core";
import { PostService } from "../services/post.service";
@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private postService: PostService) {}
  ngOnInit() {
    this.postService.getPosts().subscribe(
      (response) => {
        // this.posts = response; //works but gives warning in VS Code about the action
        this.posts = response as any;
        console.log(this.posts);
      },
      (getError: any) => {
        alert("An unexpected error occurred when getting the posts!");
        console.log(getError);
      }
    );
  }
  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    this.postService.createPost(post).subscribe(
      (response: any) => {
        post.id = response.id;
        post["id2"] = response.id;
        this.posts.splice(0, 0, post);
        input.value = "";
      },
      (createError: any) => {
        alert("Unexpected Creation (using post) error.");
        console.log("Unexpected Creation (using post) error:");
        console.log(createError);
      }
    );
  }

  updatePost(post) {
    this.postService.updatePostPatch(post).subscribe(
      (response) => {
        console.log("updatePost - PATCH: ", response);
      },
      (error: any) => {
        alert("Unexpected Update (using PATCH) error for post id = " + post.id);
        console.log(
          "Unexpected Update (using PATCH) error for post id = " + post.id
        );
        console.log(error);
      }
    );

    post["isRead"] = true;
    this.postService.updatePostPut(post).subscribe(
      (response) => {
        console.log("updatePost - PUT: ", response);
      },
      (error: any) => {
        alert("Unexpected Update (using PUT) error for post id = " + post.id);
        console.log(
          "Unexpected Update (using PUT) error for post id = " + post.id
        );
        console.log(error);
      }
    );

    this.postService.updatePostPutStringified(post).subscribe(
      (response) => {
        console.log("updatePostStringified - PUT: ", response);
      },
      (error: any) => {
        alert(
          "Unexpected Update (using PUT with stringified object) error for post id = " +
            post.id
        );
        console.log(
          "Unexpected Update (using PUT with stringified object) error for post id = " +
            post.id
        );
        console.log(error);
      }
    );
  }

  deletePost(post) {
    this.postService.deletePost(post.id).subscribe(
      (response) => {
        // Need to delete the record (post) locally.
        let i = this.posts.indexOf(post);
        this.posts.splice(i, 1);
      },
      (error: any) => {
        alert("Unexpected Deletion error for post id = " + post.id + ".");
        console.log("Unexpected Deletion error for post id = " + post.id + ":");
        console.log(error);
      }
    );
  }
}
