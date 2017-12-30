import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ProgressHttpModule } from "angular-progress-http";
import { ServerInfoComponent } from './server-info/server-info.component';
import { routing } from './app.routing';
import { HttpService } from "./services/http.service";
import { KeysPipe, KeyValuePipe } from './pipes/keys.pipe';
import { ElementInfoComponent } from './element-info/element-info.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./shared/auth.guard";
import { AuthService } from "./services/auth.service";
import { AlertService } from "./services/alert.service";
import { AlertComponent } from "./directives/alert.component";
import { MasterfileNamePipe } from './pipes/masterfile-name.pipe';
import { ThumbnailPipe } from './pipes/thumbnail.pipe';
import { Epoch2datePipe } from './pipes/epoch2date.pipe';
import { DisplaynamePipe } from './pipes/displayname.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { SearchResultComponent } from './search/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerInfoComponent,
    KeysPipe, KeyValuePipe, 
    ElementInfoComponent, 
    SearchComponent, 
    LoginComponent,
    AlertComponent,
    MasterfileNamePipe,
    ThumbnailPipe,
    Epoch2datePipe,
    DisplaynamePipe,
    StatusPipe,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    ProgressHttpModule
  ],
  providers: [
    HttpService,
    AuthGuard,
    AuthService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
