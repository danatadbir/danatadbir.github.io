import {Directive, ElementRef, Input, SimpleChanges} from '@angular/core';
import {IBorder} from "../../../Dashboard/utils/Config";

@Directive({
  selector: '[Border]'
})
export class BorderDirective {

  @Input() borderConfig: IBorder = {
    BorderWidth: 3,
    BorderRadius: 12,
    BorderColor: '#FFFFFF',
  };

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.el.nativeElement.style.borderColor = this.borderConfig.BorderColor;
    this.el.nativeElement.style.borderWidth = this.borderConfig.BorderWidth;
    this.el.nativeElement.style.borderRadius = this.borderConfig.BorderRadius;
  }

}
