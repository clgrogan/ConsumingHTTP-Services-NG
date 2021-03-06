import { Component, OnInit } from "@angular/core";
import { PostService } from "../services/post.service";
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import { BadInputError } from "../common/bad-input-error";
import { InternalServerError } from "../common/internal-server-error";
@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private postService: PostService) {}
  ngOnInit() {
    this.postService.getAll().subscribe(
      (posts) => {
        this.posts = posts as Array<Object>;
        console.log(this.posts);
      }
      // ,
      // (getError: AppError) => {
      //   alert("An unexpected error occurred when getting the posts!");
      //   console.log(getError);
      // }
    );
  }
  createPost(input: HTMLInputElement) {
    let post: any = {
      title: input.value,
    };
    this.posts.splice(0, 0, post); // Optimistic update before API call

    input.value = "";

    this.postService.create(post).subscribe(
      (response: any) => {
        post.id = response.id;
        post["id2"] = response.id;
        // this.posts.splice(0, 0, post); // Pessimistic Update after successful response received.
      },
      (error: AppError) => {
        this.posts.splice(0, 1);
        if (error instanceof BadInputError) {
          // If we had a form in the template, we can use the response to display the errors
          // next to the fields in the form using something like
          // this.form.setErrors(error); //we don't have a form.
          alert("Bad input: \n  error.status === 400");
          // IF we had a form use the next line of code.
          // this.form.setErrors(error.originalError);
        } else throw error;
      }
    );
  }

  updatePost(post) {
    this.postService.updatePatch(post).subscribe(
      (response) => {
        console.log("updatePost - PATCH: ", response);
      },
      (error: AppError) => {
        if (error instanceof InternalServerError) {
          alert("Internal Server Error for Post ID " + post.id + ".");
        } else throw error;
      }
    );

    post["isRead"] = true;
    this.postService.updatePut(post).subscribe(
      (response) => {
        console.log("updatePost - PUT: ", response);
      },
      (error: AppError) => {
        if (error instanceof InternalServerError) {
          alert("Internal Server Error for Post ID " + post.id + ".");
        } else throw error;
      }
    );

    this.postService.updatePutStringified(post).subscribe(
      (response) => {
        console.log("updatePostStringified - PUT: ", response);
      },
      (error: AppError) => {
        if (error instanceof InternalServerError) {
          alert("Internal Server Error for Post ID " + post.id + ".");
        } else throw error;
      }
    );
  }

  // deletePost(post) {
  //   // Used to demonstrate the difference between Promise and Observable objects.
  //   this.postService.delete(post.id);
  // }

  deletePost(post) {
    let i = this.posts.indexOf(post);
    this.posts.splice(i, 1);

    this.postService
      .delete(post.id)
      // .delete("666/666") // use to force a 404.
      .subscribe((response) => (error: AppError) => {
        this.posts.splice(i, 0, post);
        if (error instanceof NotFoundError) {
          alert(
            "Post with id " +
              post.id +
              " was not found. The post may have already been deleted."
          );
        } else throw error; // Global Error Handler will catch.
      });
  }
}
