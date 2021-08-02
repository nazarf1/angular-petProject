import { Component } from '@angular/core';

@Component({
  selector: 'not-found-app',
  template: `
    <div
      style="width: 100%; display: flex; flex-direction: column; align-items: center; margin-top: 300px;"
    >
      <h4>Page not found</h4>
      <button style="width: 300px; " routerLink="" mat-flat-button color="warn">
        Back to main page
      </button>
    </div>
  `,
})
export class NotFoundComponent {}
