import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[recommendedHighlight]',
  standalone: true
})
export class RecommendedHighlight implements OnChanges {
  @Input() recommendedHighlight = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    if (this.recommendedHighlight) {
      this.el.nativeElement.style.border = '2px solid green';
      this.el.nativeElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.15)';
      this.el.nativeElement.style.borderRadius = '12px';
    } else {
      this.el.nativeElement.style.border = '';
      this.el.nativeElement.style.boxShadow = '';
      this.el.nativeElement.style.borderRadius = '';
    }
  }
}
