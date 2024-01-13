import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store.js";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./redux/useAuth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </HashRouter>
);
