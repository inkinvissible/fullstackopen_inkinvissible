import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'

const promise = axios.get('')

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)