import './App.css';
import { ScrollContainer } from './components/one-page-scroll';
import { Page } from './components/one-page-scroll/Page';
import { TITLE } from './consts';
import { About } from './pages/about';
import { Title } from './components/layout/mover/Title';
import { Titles } from './components/layout/mover/Titles';
import { Projects } from './pages/projects';
import { Skills } from './pages/skills';

function App() {
  const titles = Object.entries(TITLE).map((el) => el[1] as string);

  return (
    <div className="app">
      <Titles>
        {titles.map((el) => (
          <Title key={el} id={el} label={el} />
        ))}
      </Titles>
      <ScrollContainer>
        <Page>
          <About />
        </Page>
        <Page>
          <Skills />
        </Page>
        <Page>
          <Projects />
        </Page>
      </ScrollContainer>
    </div>
  );
}

export default App;
