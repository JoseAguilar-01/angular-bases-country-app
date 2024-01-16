import { Component } from '@angular/core';

@Component({
  selector: 'shared-contact-page',
  templateUrl: './contact-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ContactPageComponent {}
