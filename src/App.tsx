import { RouterProvider } from "react-router-dom";
import router from "./routes/approuter";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="bg-stone-300">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
