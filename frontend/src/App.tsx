import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./screens/Landing";
import { Game } from "./screens/Game";
import NotFound from "./screens/NotFound";
function App() {
  return (
    <div className="flex justify-center w-full">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
