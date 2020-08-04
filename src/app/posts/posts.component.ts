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
    let post: any = {
      title: input.value,
    };
    this.postService.createPost(post).subscribe(
      (response: any) => {
        post.id = response.id;
        post["id2"] = response.id;
        this.posts.splice(0, 0, post);
        input.value = "";
      },
      (error: Response) => {
        if (error.status === 400) {
          // If we had a form in the template, we can use the response to display the errors
          // next to the fields in the form using something like
          // this.form.setErrors(error); //we don't have a form. Not cool @ instructor. Guess I'll  figure it out.
          alert("error.status === 400");
          console.log(error);
        } else {
          alert("Unexpected error on post creation (using post) error.");
          console.log("Unexpected error on post creation (using post) error:");
          console.log(error);
        }
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
      // this.postService.deletePost("666/666").subscribe( // use to force a 404.
      (response) => {
        // Need to delete the record (post) locally.
        let i = this.posts.indexOf(post);
        this.posts.splice(i, 1);
      },
      (error: Response) => {
        if (error.status === 404) {
          alert(
            "Post with id " +
              post.id +
              " was not found. The post may have already been deleted."
          );
        } else {
          alert("Unexpected Deletion error for post id = " + post.id + ".");
          console.log(
            "Unexpected Deletion error for post id = " + post.id + ":"
          );
          console.log(error);
        }
      }
    );
  }
}
