import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BooleanTextoPipe } from './pipes/boolean-texto.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BooleanTextoPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
