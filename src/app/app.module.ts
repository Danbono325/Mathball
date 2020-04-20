import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ApiServiceService } from "./services/api-service.service";
import { PlayerSearchComponent } from "./components/player-search/player-search.component";
import { TeamsComponent } from "./components/teams/teams.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@NgModule({
  declarations: [
    AppComponent,
    PlayerSearchComponent,
    TeamsComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [ApiServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
