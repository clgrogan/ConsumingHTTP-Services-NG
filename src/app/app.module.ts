import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { PostsComponent } from "./posts/posts.component";
import { PostService } from "./services/post.service";
import { AppErrorHandler } from "./common/app-error-handler";

@NgModule({
  declarations: [AppComponent, PostsComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    PostService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
