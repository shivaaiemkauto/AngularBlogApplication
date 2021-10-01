import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  id?: number;
  title?: string;
  content?: string;
  constructor(private postService: PostService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((parameters)=>this.postService.getPost(parameters.id)
    .subscribe((retrivedPost)=>{
      this.title=retrivedPost.title,
      this.content=retrivedPost.content,
      this.id=retrivedPost.id
    }));
  }

  onSubmit(){
    const updatedPost = {
      id: this.id,
      title: this.title,
      content: this.content
    }
    
    this.postService.editPost(updatedPost).subscribe(()=> this.router.navigate(['/blog']));
  }

}
