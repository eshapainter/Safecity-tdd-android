import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {SharedService} from './shared.service';
import { Network } from '@ionic-native/network/ngx';
import { Keyboard} from '@ionic-native/keyboard/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule, 
            TranslateModule.forRoot({
              loader: {
                  provide: TranslateLoader,
                  useFactory: (createTranslateLoader),
                  deps: [HttpClient]
              }
          })
        ],
        
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CallNumber,InAppBrowser,SocialSharing,SharedService,Network,Keyboard
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
