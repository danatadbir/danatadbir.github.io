import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({ template: `` })
export default abstract class WidgetComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() config: Record<string, any> | null | undefined = undefined;
  readonly id: string = 'id-' + Math.random().toString(16).slice(2);
  readonly Subscriptions: Subscription[] = [];

  protected destroy$ = new Subject<void>();

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderView();
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach(sub => sub.unsubscribe());
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy();
  }

  abstract renderView(): void;
  abstract destroy(): void;

  safeObservable<T = any>(observable: Observable<T>) {
    return observable.pipe(takeUntil(this.destroy$));
  }
}
