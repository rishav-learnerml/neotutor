import { RouterProvider } from "react-router-dom";
import router from "./routes/approuter";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
