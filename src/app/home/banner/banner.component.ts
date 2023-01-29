import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/@Appservices/analytics/analytics.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  stagger,
  query,
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('bannerTrigger', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: 'translateX(-50px)' }),
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
export class BannerComponent implements OnInit {
  constructor(
    public analyticsService: AnalyticsService,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {}
}
