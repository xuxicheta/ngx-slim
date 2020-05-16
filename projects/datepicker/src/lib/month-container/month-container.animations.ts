import { animate, animation, style, keyframes, trigger, transition, useAnimation } from '@angular/animations';


const turnAnimation = animation(
  animate('0.2s', keyframes([
    style({ transform: 'translateX( {{tx}} )', offset: 0 }),
    style({ transform: 'translateX(0)', offset: 1 }),
  ])),
);

const currentAnimation = animation(
  animate('0.2s', style({ transform: 'translateX( {{tx}} )' })),
);


export const monthContainerAnimations = [
  trigger('turn', [
    transition('stable => next', useAnimation(turnAnimation, { params: { tx: '100%' } })),
    transition('stable => previous', useAnimation(turnAnimation, { params: { tx: '-100%' } })),
  ]),

  trigger('current', [
    transition('stable => next', useAnimation(currentAnimation, { params: { tx: '-100%' } })),
    transition('stable => previous', useAnimation(currentAnimation, { params: { tx: '100%' } })),
  ]),
]
