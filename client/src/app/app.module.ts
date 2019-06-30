import { UserService } from './user/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { from } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PlayerProfileComponent } from './player/player-profile/player-profile.component';
import { OwnerProfileComponent } from './owner/owner-profile/owner-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { PlayerComponent } from './player/player/player.component';
import { OwnerComponent } from './owner/owner/owner.component';
import { OwnerPlaygroundsComponent } from './owner/owner-playgrounds/owner-playgrounds.component';
import { NewPlaygroundComponent } from './owner/new-playground/new-playground.component';
import { EditPlaygroundComponent } from './owner/edit-playground/edit-playground.component';
import { PlaygroundsComponent } from './player/playgrounds/playgrounds.component';
import { MatchTimeComponent } from './player/match-time/match-time.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MyMatchesComponent } from './player/my-matches/my-matches.component';
import { ReservationsComponent } from './owner/reservations/reservations.component'; // for FullCalendar!


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    PlayerProfileComponent,
    OwnerProfileComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    PlayerComponent,
    OwnerComponent,
    OwnerPlaygroundsComponent,
    NewPlaygroundComponent,
    EditPlaygroundComponent,
    PlaygroundsComponent,
    MatchTimeComponent,
    MyMatchesComponent,
    ReservationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule // for FullCalendar!
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
