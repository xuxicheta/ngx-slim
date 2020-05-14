import { animate, state, style, transition } from '@angular/animations';

export const flyingMetadata = [
  state('next', style({
    transform: 'translateX(-100%)'
  })),
  state('previous', style({
    transform: 'translateX(100%)'
  })),
  state('stable', style({
    transform: 'translateX(0)',
  })),

  transition('stable => *', [
    animate('0.2s')
  ]),
  transition('* => stable', [
    animate('0s')
  ]),
];

export const currentMetadata = [
  state('next', style({
    transform: 'translateX(100%)'
  })),
  state('previous', style({
    transform: 'translateX(-100%)'
  })),
  state('stable', style({
    transform: 'translateX(0)'
  })),
  transition('stable => *', [
    animate('0s')
  ]),
  transition('* => stable', [
    animate('0.2s')
  ]),
];
