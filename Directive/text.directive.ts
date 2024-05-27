import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[Text]'
})
export class TextDirective implements OnChanges {
  @Input() color = "#FFFFFF";
  @Input() fontSize = "20px";

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.el.nativeElement.style.color = this.color;
    this.el.nativeElement.style.fontSize = this.fontSize;
  }
}
