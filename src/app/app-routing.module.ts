import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlayerSearchComponent } from "./components/player-search/player-search.component";
import { TeamsComponent } from "./components/teams/teams.component";

const routes: Routes = [
  { path: "", component: PlayerSearchComponent },
  {
    path: "teams",
    component: TeamsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
