import './App.css';
import { Infro } from '@/pages/Intro';
import { Projects } from '@/pages/projects';
import { Skills } from '@/pages/skills';
import { Books } from './pages/books';
import { StickyHeader } from '@/components/sticky-header';
import { Layout } from './components/layout';

function App() {
  return (
    <div className="app">
      <StickyHeader />
      <Layout>
        <Infro />
        <Skills />
        <Projects />
        <Books />
      </Layout>
    </div>
  );
}

export default App;
