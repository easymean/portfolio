import './App.css';
import { Infro } from '@/pages/Intro';
import { Projects } from '@/pages/projects';
import { Skills } from '@/pages/skills';
import { Books } from './pages/books';
import { StickyHeader } from '@/components/sticky-header';
import { Layout } from './components/layout';
import { useMediaQuery } from 'react-responsive';
import { ProjectsMobile } from './pages/projects-mobile';

function App() {
  const isMobile = useMediaQuery({
    query: `(min-width: 335px) and (max-width: 756px)`,
  });
  return (
    <div className="app">
      <StickyHeader />
      <Layout>
        <Infro />
        <Skills />
        {isMobile ? <ProjectsMobile /> : <Projects />}
        <Books />
      </Layout>
    </div>
  );
}

export default App;
