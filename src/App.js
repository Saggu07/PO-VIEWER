// import PoViewer from "./PoViewer";
// function App() {
//   return <PoViewer />;
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PoViewer from "./PoViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<PoViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;