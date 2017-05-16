import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { masterFirebaseConfig } from './api-keys';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CampgroundDataComponent } from './campground-data/campground-data.component';
import { ApiKey } from './RIDB-API';
import { BotApi } from './botApiKey';
import { MapComponent } from './map/map.component';
import { CleverbotComponent } from './cleverbot/cleverbot.component';
import { WeatherComponent } from './weather/weather.component';
import { NguiMapModule } from '@ngui/map';
import { routing } from './app.routing';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    CampgroundDataComponent,
    MapComponent,
    CleverbotComponent,
    WeatherComponent,
    MapComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    routing,
    NguiMapModule.forRoot({
     apiUrl: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARXikf8fvb_SyWNSCBBOGkhz7NHHcMC5w&callback=initMap'
   })
  ],

  providers: [ApiKey, BotApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
