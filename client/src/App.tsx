import './App.css';
import * as Pages from "./components/pages";
import { Layout, Menu, Row, Col } from "antd";

function App() {
  return (
    <main style={{ backgroundColor: "orange", height : "100dvh" }}>
        <Pages.CanvaView dim={{ x: 300, y: 300 }}  />
    </main>
  )
}

export default App;