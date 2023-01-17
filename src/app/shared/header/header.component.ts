import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  trigger,
  style,
  query,
  transition,
  stagger,
  animate,
} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/@Appservices/analytics/analytics.service';
import { LanguageService } from 'src/app/@Appservices/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('animateMenu', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: 'translateY(-50%)' }),
          stagger(50, [
            animate(
              '250ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  responsiveMenuVisible: Boolean = false;
  pageYPosition!: number;
  languageFormControl: FormControl = new FormControl();
  cvName: string = '';
  src: string = 'https://www.worldometers.info/img/flags/us-flag.gif';
  alt: string = 'English';

  constructor(
    private router: Router,
    public analyticsService: AnalyticsService,
    public languageService: LanguageService,
    public translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (isPlatformBrowser(platformId)) {
      this.languageService.currentLanguage.subscribe((language) => {
        this.changeLanguage(language, true);
      });
    }
  }

  ngOnInit(): void {
    // this.languageFormControl.valueChanges.subscribe((val) =>
    //   this.languageService.changeLanguage(val)
    // );
    // this.languageFormControl.setValue(this.languageService.language);
    // this.languageService.updateLanguage(this.languageService.currentLanguage);
  }

  scroll(el: any) {
    if (document.getElementById(el)) {
      document.getElementById(el)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router
        .navigate(['/home'])
        .then(() =>
          document.getElementById(el)?.scrollIntoView({ behavior: 'smooth' })
        );
    }
    this.responsiveMenuVisible = false;
  }

  downloadCV() {
    this.translateService.get('Header.cvName').subscribe((val) => {
      this.cvName = val;
      console.log(val);
      // app url
      let url = window.location.href;

      // Open a new window with the CV
      window.open(url + '/../assets/cv/' + this.cvName, '_blank');
    });
  }

  @HostListener('window:scroll', ['getScrollPosition($event)'])
  getScrollPosition(event: any) {
    this.pageYPosition = window.pageYOffset;
  }

  changeLanguage(lang: string, frmLocalStorage: boolean) {
    let html = this.document.getElementsByTagName('html')[0] as HTMLElement;
    html.dir = lang == 'en' ? 'ltr' : 'rtl';
    this.translateService.setDefaultLang(lang);
    let curentUrl = this.router.url;
    if (frmLocalStorage == false) {
      this.languageService.updateLanguage(lang);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([curentUrl]);
      });
    }

    this.languageService.updateLanguage(lang);
    // this.languageFormControl.setValue(language);
    if (lang == 'en') {
      this.src = 'https://www.worldometers.info/img/flags/us-flag.gif';
      this.alt = 'English';
    } else {
      this.src = 'https://www.worldometers.info/img/flags/eg-flag.gif';
      this.alt = 'Arabic';
    }
  }
}
