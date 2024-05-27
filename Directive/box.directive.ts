import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[Card]'
})
export class BoxDirective implements OnChanges {
  @Input() backgroundColor = "#6F90D5";
  @Input() borderColor = "#6F90D5";

  private setStyle(data: { 'background-color': string, 'border-color': string }) {
  }

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.el.nativeElement.style.backgroundColor = this.backgroundColor;
    this.el.nativeElement.style.borderColor = this.borderColor;
  }
}
