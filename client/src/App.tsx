import './App.css';
import * as Pages from "./components/pages";

function App() {
  return (
    <div>
      <Pages.CanvaView dim={{x : 640, y : 360}} />
    </div>
  )
}

export default App;