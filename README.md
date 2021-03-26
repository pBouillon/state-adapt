# StateAdapt

## Introduction

[Introducing StateAdapt: RxJS, Redux Devtools and Adapters](https://medium.com/@m3po22/rxjs-redux-devtools-introducing-ngrx-adapt-8520094e21b6)

## Demos

This repository contains two demo apps:

- ng-demo is for NgRx
- ngxs-demo is for NGXS

You can also play with StateAdapt in these StackBlitz demos:

- [NgRx](https://stackblitz.com/edit/state-adapt-ngrx?file=src/app/app.component.ts)
- [NGXS](https://stackblitz.com/edit/state-adapt-ngxs?file=src/app/app.component.ts)

## Using StateAdapt in your own project

### NgRx

First, `npm install`:

```
npm install --save @ngrx/store @ngrx/store-devtools @state-adapt/core @state-adapt/ngrx
```

Include in your app.module.ts like so:

```typescript
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { actionSanitizer } from '@state-adapt/core';
import { adaptReducer } from '@state-adapt/ngrx';
```

In your module imports array:

```typescript
    StoreModule.forRoot({ adapt: adaptReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      actionSanitizer
    }),
```

Now you can use it in a component or service. Here's an example in a component:

```typescript
import { Source, createAdapter } from '@state-adapt/core';
import { Adapt } from '@state-adapt/ngrx';
...
  newStr$ = new Source<string>('newStr$');
  stringAdapter = createAdapter<string>()({
    append: (state, newStr: string) => `${state}${newStr}`,
  });
  stringStore = this.adapt.init(['string', this.stringAdapter, ''], {
    append: this.newStr$,
  });
  str$ = this.stringStore.getState();
  constructor(private adapt: Adapt) {
    this.str$.subscribe();
    setTimeout(() => this.newStr$.next('Hello World!'), 3000);
  }
...
```

Open up Redux Devtools and you should see the state update after 3 seconds.

### NGXS

First, `npm install`:

```
npm install --save @ngrx/store @ngxs/store @ngxs/devtools-plugin @state-adapt/core @state-adapt/ngxs
```

Include in your app.module.ts like so:

```typescript
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { actionSanitizer } from '@state-adapt/core';
import { AdaptState } from '@state-adapt/ngxs';
```

In your module imports array:

```typescript
    NgxsModule.forRoot([AdaptState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
      actionSanitizer
    }),
```

Now you can use it in a component or service. Here's an example in a component:

```typescript
import { Source, createAdapter } from '@state-adapt/core';
import { Adapt } from '@state-adapt/ngxs';
...
  newStr$ = new Source<string>('newStr$');
  stringAdapter = createAdapter<string>()({
    append: (state, newStr: string) => `${state}${newStr}`,
  });
  stringStore = this.adapt.init(['string', this.stringAdapter, ''], {
    append: this.newStr$,
  });
  str$ = this.stringStore.getState();
  constructor(private adapt: Adapt) {
    this.str$.subscribe();
    setTimeout(() => this.newStr$.next('Hello World!'), 3000);
  }
...
```

Open up Redux Devtools and you should see the state update after 3 seconds.
