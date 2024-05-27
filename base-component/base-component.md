# Base Component

## `safeObservable()`

for auto subscription any used subscribe observables in the component, just need extends from base component and use like this:

```ts
this.safeObservable(interval(2000)).subscribe(() => {
  console.log("hello", new Date().getSeconds());
});
```

put your observable before use `subscribe` method on this function. it adds a pipe that when destroy the component, the subscription also removed!

> if you want to use `ngOnDestroy` method on your component, use `onDestroy` method instead