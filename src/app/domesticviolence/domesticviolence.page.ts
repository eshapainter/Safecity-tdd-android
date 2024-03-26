import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router,ActivatedRoute ,NavigationExtras} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-domesticviolence',
  templateUrl: './domesticviolence.page.html',
  styleUrls: ['./domesticviolence.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DomesticviolencePage implements OnInit {
content
title
  constructor(private route: ActivatedRoute, private router: Router,private sanitizer:DomSanitizer) { 

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state)
        this.content =  this.content = this.sanitizer.bypassSecurityTrustHtml(this.router.getCurrentNavigation().extras.state.content);
        this.title = this.router.getCurrentNavigation().extras.state.title
        
        console.log(this.content)
        
console.log(this.title)
          }
        })

  }

  ngOnInit() {
  }

}
