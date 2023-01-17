import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject!: BehaviorSubject<string>;
  public currentLanguage!: Observable<string>;

  constructor(
    public translateService: TranslateService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    if (isPlatformBrowser(platformId)) {
      this.currentLanguageSubject = new BehaviorSubject<string>(
        JSON.parse(localStorage.getItem('lang')!)
      );

      this.currentLanguage = this.currentLanguageSubject.asObservable();

      if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', JSON.stringify('ar'));
        this.currentLanguageSubject.next('ar');
      }
    }
  }
  public get lang(): string {
    return this.currentLanguageSubject.value;
  }

  updateLanguage(language: string) {
    localStorage.setItem('lang', JSON.stringify(language));
    this.currentLanguageSubject.next(language);
  }
}
