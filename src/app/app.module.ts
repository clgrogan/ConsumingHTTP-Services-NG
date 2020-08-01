import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { PostsComponent } from "./posts/posts.component";
import { PostsComponentComponent } from "./posts-component/posts-component.component";

@NgModule({
  declarations: [AppComponent, PostsComponent, PostsComponentComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
