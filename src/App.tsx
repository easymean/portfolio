import './App.css';
import { Infro } from '@/pages/Intro';
import { Projects } from '@/pages/projects';
import { Skills } from '@/pages/skills';
import { Books } from './pages/books';
import { StickyHeader } from './components/layout/sticky-header';

function App() {
  return (
    <div className="app">
      <StickyHeader />
      <Infro />
      <Skills />
      <Books />
      <Projects />
    </div>
  );
}

export default App;
