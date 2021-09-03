import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';
import { ThemeProvider } from '@material-ui/styles';

//components
import AdminToolbar from './components/AdminToolbar';

//hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';
// pages
import Homepage from './pages/Homepage';
import Search from './pages/Search';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Order from './pages/Order';
import './default.scss';

//theme
import {theme} from './theme';

const App = props => {

const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

  }, []);


 
    return (
      <ThemeProvider theme={theme}>
      <div className="App">
      {/* <AdminToolbar/> */}
        <Switch>
          <Route exact path="/" 
          render={() => (
            <HomepageLayout >
              <Homepage />
            </HomepageLayout>
          )} />
          <Route exact path="/search" 
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )} />
          <Route path="/search/:filterType" 
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )} />
          <Route path="/product/:productID" 
          render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          )} />
          <Route path="/cart" 
          render={() => (
            <MainLayout>
              <Cart />
            </MainLayout>
          )} />
          <Route path="/payment" 
          render ={() => (
            <WithAuth>
            <MainLayout>
              <Payment />
            </MainLayout>              
            </WithAuth>

          )} />
          <Route path="/registration" 
          render={() => (
            <MainLayout>
              <Registration/>
            </MainLayout>
          )}/>
          <Route path="/login" 
          render={() => (
            <MainLayout>
              <Login/>
            </MainLayout>
          )}/>
          <Route path="/recovery" 
          render={() => (
            <MainLayout>
              <Recovery/>
            </MainLayout>
          )}/>
          <Route path="/dashboard" 
          render={() => (
            <WithAuth>
            <DashboardLayout>
              <Dashboard/>
            </DashboardLayout>
            </WithAuth>
          )}/>
          <Route path="/order/:orderID"
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Order />
              </DashboardLayout>
            </WithAuth>
          )} />
         <Route path="/admin" 
          render={() => (
            <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>              
            </WithAdminAuth>
          )}/>
        </Switch>
        </div>
      </ThemeProvider>
    );
  }


export default App;
