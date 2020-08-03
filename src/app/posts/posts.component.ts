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
    this.postService.getPosts().subscribe((response) => {
      // this.posts = response; //works but gives warning in VS Code about the action
      this.posts = response as any;
      console.log(this.posts);
    });
  }
  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    this.postService.createPost(post).subscribe((response: any) => {
      post.id = response.id;
      post["id2"] = response.id;
      this.posts.splice(0, 0, post);
      input.value = "";
    });
  }

  updatePost(post) {
    this.postService.updatePostPatch(post).subscribe((response) => {
      console.log("updatePost - PATCH: ", response);
    });

    post["isRead"] = true;
    this.postService.updatePostPut(post).subscribe((response) => {
      console.log("updatePost - PUT: ", response);
    });

    this.postService.updatePostPutStringified(post).subscribe((response) => {
      console.log("updatePostStringified - PUT: ", response);
    });
  }

  deletePost(post) {
    this.postService.deletePost(post.id).subscribe((response) => {
      // Need to delete the record (post) locally.
      let i = this.posts.indexOf(post);
      this.posts.splice(i, 1);
    });
  }
}
