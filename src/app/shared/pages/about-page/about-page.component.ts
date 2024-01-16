import { Component } from '@angular/core';

@Component({
  selector: 'shared-about-page',
  templateUrl: './about-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class AboutPageComponent {}
