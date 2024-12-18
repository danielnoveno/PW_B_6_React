import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routing = useRoutes(routes);
  return (
    <>
      {routing}
      <ToastContainer />
    </>
  );
}

export default App;