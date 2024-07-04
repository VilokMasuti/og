import { BrowserRouter as Router ,Routes ,Navigate, Route  } from 'react-router-dom'
import FormPage from './components/FormPage'
import SecondPage from './components/SecondPage'


const ProtectedRoute = ({ component: Component }: { component: React.ElementType }) => {
  const userDetails = localStorage.getItem('userDetails');
  return userDetails ? <Component /> : <Navigate to="/" replace />;
};

const App = () => {

  return (
 <Router>
  <Routes>
  <Route path="/" element={<FormPage />} />
  <Route path="/second-page" element={<ProtectedRoute component={SecondPage} />} />
  </Routes>
 </Router>
  )
}

export default App