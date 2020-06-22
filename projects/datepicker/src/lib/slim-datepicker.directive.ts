import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  LOCALE_ID,
  OnDestroy,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { DOCUMENT } from '@angular/common';
import { merge, Subscription } from 'rxjs';
import { NgControl } from '@angular/forms';
import { DateTransformationsService } from './transformations/date-transformations.service';

/** @dynamic */
@Directive({
  selector: '[slimDatepicker]',
  exportAs: 'slimDatepicker',
})
export class SlimDatepickerDirective implements OnDestroy {
  private sub = new Subscription();
  private datepickerRef: ComponentRef<DatepickerComponent>;
  private datepicker: DatepickerComponent;


  @HostListener('focus')
  onFocus() {
    this.showDatepicker();
  }


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>,
    private ngControl: NgControl,
    private dateTransformationsService: DateTransformationsService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeID: string,
  ) {
  }

  public left = () => this.datepicker?.left();
  public right = () => this.datepicker?.right();
  public openDay = () => this.datepicker?.openDay();
  public openMonth = () => this.datepicker?.openMonth();
  public openYear = () => this.datepicker?.openYear();
  public pickDay = (day: number) => this.datepicker?.pickDay(day);
  public pickMonth = (month: number) => this.datepicker?.pickMonth(month);
  public pickYear = (year: number) => this.datepicker?.pickYear(year);
  public get = () => this.datepicker?.get();
  public set = (value: Date) => this.datepicker?.set(value);


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private showDatepicker() {
    if (this.datepickerRef) {
      return;
    }

    const datepickerCtor = this.componentFactoryResolver.resolveComponentFactory(DatepickerComponent);
    this.datepickerRef = this.vcr.createComponent(datepickerCtor);
    this.datepicker = this.datepickerRef.instance;

    const controlValue = this.ngControl.value;

    if (controlValue) {
      this.datepicker.set(this.dateTransformationsService.parse(controlValue));
    }

    this.renderer.addClass(this.datepickerRef.location.nativeElement, 'datepicker-floating');

    this.setPosition();

    setTimeout(() => this.subscribeToClosingAction(), 500);
    this.subscribeToValue();
  }

  private subscribeToClosingAction() {
    const {valueChange, dispose} = this.datepickerRef.instance;

    this.sub.add(
      merge(valueChange, dispose).subscribe(() => this.hideDatepicker())
    );
  }

  private subscribeToValue() {
    this.sub.add(
      this.datepickerRef.instance.valueChange
        .subscribe(date => {
          const value = this.dateTransformationsService.stringify(date);
          this.ngControl.control.setValue(value);
        })
    );
  }

  private hideDatepicker() {
    this.vcr.clear();
    this.datepickerRef = null;
    this.datepicker = null;
  }

  private setPosition() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const datepickerEl = this.datepickerRef.location.nativeElement;

    const inTop = rect.top > 196;
    if (inTop) {
      this.renderer.setStyle(datepickerEl, 'top', rect.bottom - 222 + 'px');
    } else {
      this.renderer.setStyle(datepickerEl, 'top', rect.bottom + 2 + 'px');
    }
    this.renderer.setStyle(datepickerEl, 'opacity', '1');
  }

}
