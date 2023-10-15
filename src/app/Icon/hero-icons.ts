import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-icons',
  template: `
    <div *ngIf="icon">
      <h2>Icon: {{ icon }}</h2>
    </div>
  `
})