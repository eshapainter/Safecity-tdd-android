import { Component, NgZone } from "@angular/core";
import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TranslateService } from "@ngx-translate/core";
import { Network } from "@ionic-native/network/ngx";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  id: any;
  language;
  dir = 'ltr'
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public router: Router,
    private translate: TranslateService,
    private network: Network,
    private statusBar: StatusBar,
    public navController: NavController,
    public zone: NgZone
  ) {
    this.initializeApp();
    this.translate.onLangChange.subscribe((ev =>{
      console.log(ev)
      if(ev.lang == "ar")
      {
        this.dir = 'rtl'
        console.log(this.dir)
      }
      else
      {
        this.dir = 'ltr'
        console.log(this.dir)
      }
      
    }))
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.hide();
      // this.splashScreen.hide();
      setTimeout(() => {
        this.splashScreen.hide();
        this.initTranslate();
        if(this.platform.is('android')){
          localStorage.setItem('platform','android')
         }else if(this.platform.is('ios')){
           localStorage.setItem('platform','ios')
         }else{
           localStorage.setItem('platform','browser')
         }
        this.zone.run(() => {
          this.id = localStorage.getItem("userId");
          if (this.id != null) {
            this.navController.navigateForward("home");
          }
        });
        console.log("id", this.id);
      }, 1000);

      // watch network for a disconnection
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        console.log("network was disconnected :-(");
        this.navController.navigateForward(`/nointernet`);
        console.log(this.navController);
        // alert('off')
      });

      // stop disconnect watch
      //disconnectSubscription.unsubscribe();

      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe(() => {
        console.log("network connected!", this.network.type);
        console.log(this.navController);
        if (this.router.url == "/nointernet") {
          this.navController.pop();
        }
        // alert('on')
        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === "wifi") {
            console.log("we got a wifi connection, woohoo!");
          }
        }, 3000);
      });

      // stop connect watch
      //connectSubscription.unsubscribe();

      // this.initTranslate()
      console.log("id", this.id);
      // this.zone.run(()=>{
      //   this.id=localStorage.getItem('userId');
      //    if(this.id != null)
      // {
      //   this.navController.navigateForward('home')
      // }

      // })
    });
  }

  initTranslate() {
    this.language = localStorage.getItem("language");
    if (!this.language) {
      // this.dir = 'ltr'
      this.translate.setDefaultLang("en");
      this.translate.use("en");
      this.language = localStorage.setItem("language", "en");
    } else {
      this.translate.setDefaultLang(this.language);
      this.translate.use(this.language);
      if(this.language == "ar")
      {
        this.dir = 'rtl'
        console.log(this.dir)
      }
     
      
    }
  }
}
