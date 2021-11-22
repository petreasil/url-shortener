import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlInputComponent } from './components/url-input/url-input.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { UrlendpointService } from './services/urlendpoint.service';
import { ListUrlComponent } from './components/list-url/list-url.component';
import { SingleUrlComponent } from './components/list-url/single-url/single-url.component';

@NgModule({
  declarations: [AppComponent, UrlInputComponent, HeaderComponent, ListUrlComponent, SingleUrlComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [UrlendpointService],
  bootstrap: [AppComponent],
})
export class AppModule {}
