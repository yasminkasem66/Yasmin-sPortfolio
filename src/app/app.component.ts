import { Component } from '@angular/core';
import { LanguageService } from './@Appservices/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'jasmin-portfolio';
  constructor(public languageService: LanguageService) {
    this.languageService.updateLanguage('en');
  }
}
