import React, { useState } from 'react';
import { interval } from 'rxjs';
import { createAdapter } from '@state-adapt/core';
import { Source, toSource } from '@state-adapt/rxjs';
import { useAdapt, useObservable, useSource, useStore } from '@state-adapt/react';
import { adapt } from '../store';

export const countAdapter = createAdapter<number>()({
  increment: (state, n: number) => state + n,
  double: state => state * 2,
  selectors: {
    bold: s => s.toString().bold(),
  },
});

const resetAll$ = new Source<void>('[App] resetAll$');
const interval$ = interval(5_000).pipe(toSource('[App] interval$'));

export function App() {
  const [count1, count1Store] = useAdapt('count1', 0);
  const [count2, count2Store] = useAdapt(['count2', 0], interval$);
  const [count3, count3Store] = useAdapt(['count3', 0], countAdapter);
  const [count4, count4Store] = useAdapt(['count4', 10], {
    multiply: (state, n: number) => state * n,
  });
  const [count5, count5Store] = useAdapt(['count5', 0, countAdapter], interval$);
  const [count6, count6Store] = useAdapt(['count6', 0, countAdapter], {
    set: interval$,
    reset: resetAll$,
  });

  // count1Store.set();
  // count2Store.set();
  // count3Store.double(4);
  // count4Store.multiply('4');
  // count5Store.set('4');
  // count6Store.increment();

  return (
    <div>
      <main>
        <div>
          <h2>Counter 1</h2>
          <p>
            {count1.state}
            {/* <span dangerouslySetInnerHTML={{ __html: bold1 || '' }}></span> */}
          </p>
          <p>
            <button onClick={() => count1Store.set(300)}>Set</button>
            {/* <button onClick={() => count1.increment(3)}>Increment</button> */}
            {/* <button onClick={() => count1.double()}>Double</button> */}
          </p>
        </div>

        <div>
          <h2>Counter 2</h2>
          <p>
            {count2.state}
            {/* <span dangerouslySetInnerHTML={{ __html: bold2 || '' }}></span> */}
          </p>
          <p>
            <button onClick={() => count2Store.set(300)}>Set</button>
            {/* <button onClick={() => count2.increment(3)}>Increment</button> */}
            {/* <button onClick={() => count2.double()}>Double</button> */}
          </p>
        </div>

        <div>
          <h2>Counter 3</h2>
          <p>
            {count3.state}{' '}
            <span dangerouslySetInnerHTML={{ __html: count3.bold || '' }}></span>
          </p>
          <p>
            <button onClick={() => count3Store.set(300)}>Set</button>
            <button onClick={() => count3Store.increment(3)}>Increment</button>
            <button onClick={() => count3Store.double()}>Double</button>
          </p>
        </div>

        <div>
          <h2>Counter 4</h2>
          <p>
            {count4.state}
            {/* <span dangerouslySetInnerHTML={{ __html: bold4 || '' }}></span> */}
          </p>
          <p>
            <button onClick={() => count4Store.set(300)}>Set</button>
            <button onClick={() => count4Store.multiply(10)}>Multiply By 10</button>
            {/* <button onClick={() => count4.increment(3)}>Increment</button> */}
            {/* <button onClick={() => count4.double()}>Double</button> */}
          </p>
        </div>

        <div>
          <h2>Counter 5</h2>
          <p>
            {count5.state}{' '}
            <span dangerouslySetInnerHTML={{ __html: count5.bold || '' }}></span>
          </p>
          <p>
            <button onClick={() => count5Store.set(300)}>Set</button>
            <button onClick={() => count5Store.increment(3)}>Increment</button>
            <button onClick={() => count5Store.double()}>Double</button>
          </p>
        </div>

        <div>
          <h2>Counter 6</h2>
          <p>
            {count6.state}{' '}
            <span dangerouslySetInnerHTML={{ __html: count6.bold || '' }}></span>
          </p>
          <p>
            <button onClick={() => count6Store.set(300)}>Set</button>
            <button onClick={() => count6Store.increment(3)}>Increment</button>
            <button onClick={() => count6Store.double()}>Double</button>
          </p>
        </div>

        <br />
        <br />
        <button onClick={() => resetAll$.next()}>Reset Externally</button>
      </main>
    </div>
  );
}

export default App;
