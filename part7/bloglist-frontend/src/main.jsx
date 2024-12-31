import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import "./index.css"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
