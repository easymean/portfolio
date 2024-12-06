import './App.css';
import { ScrollContainer } from './components/one-page-scroll';
import { Page } from './components/one-page-scroll/Page';
import { TITLE } from './consts';
import { About } from './pages/about';

import { Projects } from './pages/projects';
import { Skills } from './pages/skills';

function App() {
  return (
    <div className="app">
      <ScrollContainer>
        <Page id={TITLE.ABOUT}>
          <About />
        </Page>
        <Page id={TITLE.SKILLS}>
          <Skills />
        </Page>
        <Page id={TITLE.PROJECTS}>
          <Projects />
        </Page>
      </ScrollContainer>
    </div>
  );
}

export default App;
