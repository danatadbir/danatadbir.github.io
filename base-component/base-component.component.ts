import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-module',
  template: '<div></div>',
})
export class SharedFeaturesBaseComponent<T extends object = object>
  implements OnDestroy, OnChanges
{
  protected destory$ = new Subject<void>();
  @Input() id: string;
  @Input() config: T;
  protected _widgetId: string;

  public get widgetId() {
    return this._widgetId;
  }

  constructor() {
    this._widgetId =
      'shared_component_' +
      new Date().getTime() +
      '_' +
      Math.ceil(Math.random() * 10000);
  }

  safeObservable<T = any>(observable: Observable<T>) {
    return observable.pipe(takeUntil(this.destory$));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // =>make unique id
    // if (changes['id']) {
    //   this.id = this.id + '_' + Math.ceil(Math.random() * 10000);
    // }

    this.onChanges(changes);
  }
  // =>Called once, before the instance is destroyed.
  @HostListener('unloaded')
  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
    this.onDestroy();
  }
  onDestroy() {
    // =>TODO:called from child component
  }

  onChanges(changes: SimpleChanges) {
    // =>TODO:called from child component
  }
}
