import "./App.css";
import { ScrollContainer } from "./components/one-page-scroll";
import { Page } from "./components/one-page-scroll/Page";

function App() {
  return (
    <>
      <ScrollContainer>
        <Page>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              placeContent: "center",
            }}
          >
            firstpage
          </div>
        </Page>
        <Page>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              placeContent: "center",
            }}
          >
            secondpage
          </div>
        </Page>
      </ScrollContainer>
    </>
  );
}

export default App;
