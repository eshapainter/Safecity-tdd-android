import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router,ActivatedRoute ,NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-domesticviolence',
  templateUrl: './domesticviolence.page.html',
  styleUrls: ['./domesticviolence.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DomesticviolencePage implements OnInit {
content
  constructor(private route: ActivatedRoute, private router: Router) { 

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state)
        this.content = this.router.getCurrentNavigation().extras.state.content;
        
        
        console.log(this.content)
        

          }
        })

  }

  ngOnInit() {
  }

}
