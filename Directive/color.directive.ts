import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[Color]'
})
export class ColorDirective {
  @Input() color: string;
  @Input() backgroundColor: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['color']?.currentValue)
      this.el.nativeElement.style.color = this.color;
    if (changes && changes['backgroundColor']?.currentValue)
      this.el.nativeElement.style.backgroundColor = this.backgroundColor;
  }
}
