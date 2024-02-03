import { Suspense, lazy } from 'react';

import styles from './App.module.scss';
import { Loader } from './components/Loader';
import { Logo } from './components/Logo';

const CanvasEditor = lazy(async () => ({
  default: (await import('./components/CanvasEditor')).CanvasEditor
}));

function App() {
  return (
    <div className={styles.container}>
      <h1>
        Smolimgen <Logo height={35} />
      </h1>
      <Suspense fallback={<Loader />}>
        <CanvasEditor />
      </Suspense>
    </div>
  );
}

export default App;
