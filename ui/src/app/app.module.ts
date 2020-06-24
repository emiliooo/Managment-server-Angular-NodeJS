import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainTableComponent } from './main-table/main-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ScoreElementsComponent } from './panel-counter/panel-counter.component';
import { AppMainCoverComponent } from './main-app/app-main-cover.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { FilterSearchPipe } from './shared/pipes/filter-search.pipe';
import { MenuDropdownComponent } from './menu-dropdown/menu-dropdown.component';
import { HeaderAppComponent } from './header-app/header-app.component';

@NgModule({
  declarations: [
    AppComponent,
    MainTableComponent,
    AppMainCoverComponent,
    ScoreElementsComponent,
    SearchTableComponent,
    FilterSearchPipe,
    MenuDropdownComponent,
    HeaderAppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
