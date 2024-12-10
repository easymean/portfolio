import './App.css';
import { Infro } from '@/pages/Intro';
import { Projects } from '@/pages/projects';
import { Skills } from '@/pages/skills';

function App() {
  return (
    <div className="app">
      <Infro />
      <Skills />
      <Projects />
    </div>
  );
}

export default App;
