import { useEffect, useState } from 'react';
import { LangProvider } from './context/LangContext';
import { MotionProvider } from './context/MotionContext';
import { ToastProvider } from './context/ToastContext';
import { StatusBar } from './components/StatusBar';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Dock } from './components/Dock';
import { IntroOverlay } from './components/IntroOverlay';
import { EasterEgg } from './components/EasterEgg';
import { useScrollVelocity } from './hooks/useScrollVelocity';

function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      '%cCurious about the DOM instead of the About section? Respect.',
      'font-family:monospace;font-size:12px;',
    );
    console.log('flag{portfolio_ctf_2026}');
  }, []);
  return null;
}

function Page() {
  const [introRunId, setIntroRunId] = useState(0);
  const scrollVelocityRef = useScrollVelocity();

  return (
    <>
      <IntroOverlay key={introRunId} />
      <ConsoleEasterEgg />
      <EasterEgg />
      <StatusBar onReplayIntro={() => setIntroRunId((n) => n + 1)} />
      <Nav />
      <Hero scrollVelocityRef={scrollVelocityRef} />
      <About />
      <Projects />
      <Experience />
      <Footer />
      <Dock />
    </>
  );
}

export function App() {
  return (
    <LangProvider>
      <MotionProvider>
        <ToastProvider>
          <Page />
        </ToastProvider>
      </MotionProvider>
    </LangProvider>
  );
}
