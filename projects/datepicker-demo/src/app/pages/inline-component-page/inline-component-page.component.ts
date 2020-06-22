import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inline-component-page',
  templateUrl: './inline-component-page.component.html',
  styleUrls: ['./inline-component-page.component.css']
})
export class InlineComponentPageComponent implements OnInit {
  value = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
