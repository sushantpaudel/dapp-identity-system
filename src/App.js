import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
class App extends React.Component {
  loading = () => {
    return <div>Loading...</div>;
  };

  render() {
    return (
      <HashRouter baseUrl="/admin">
        <ToastContainer />
        <Suspense fallback={this.loading}>
          <AppRoutes />
        </Suspense>
      </HashRouter>
    );
  }
}

export default App;
