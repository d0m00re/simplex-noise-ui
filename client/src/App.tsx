import './App.css';
import * as Pages from "./components/pages";
function App() {
  return (
    <div>
      <Pages.CanvaView dim={{x : 300, y : 300}} />
    </div>
  )
}

export default App;