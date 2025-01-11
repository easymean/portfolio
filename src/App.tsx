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
  const isDesktop = useMediaQuery({
    query: `(min-width: 1024px)`,
  });
  return (
    <div className="app">
      <StickyHeader />
      <Layout>
        <Infro />
        <Skills />
        {isDesktop ? <Projects /> : <ProjectsMobile />}
        <Books />
      </Layout>
    </div>
  );
}

export default App;
