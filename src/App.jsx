import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import de rutas publicas
import RegisterPage from './pages/public/RegisterPage';
import LoginPage from './pages/public/LoginPage';
import NotFound from './pages/public/NotFound';
import HomePage from './pages/public/HomePage';
import ProductsPage from './pages/public/ProductsPage';
import ViewDetails from './pages/public/ViewDetails';
import AssignPage from './pages/public/assignPage';
import DeviesPage from './pages/private/user/DevicesPage';
//datos de la empresa
import LocationPage from './pages/public/LocationPage';
import MissionPage from './pages/public/MissionPage';
import PoliciesPage from './pages/public/PoliciesPages';
import ContactPage from './pages/public/ContactPage';
import VisionPage from './pages/public/VisionPage';
import FaqsPage from './pages/public/faqsPage';
//para recuperacion de contrasñe
import AuthUser from './pages/public/recovery/AuthUser';
import OptionsRecovery from './pages/public/recovery/OptionsRecovery';
import QuestionPage from './pages/public/recovery/QuestionPage';
import { TokenPage } from './pages/public/recovery/TokenPage';
import ResetPassword from './pages/public/recovery/ResetPassword';
//contextos de la aplicacioni
import { ProductProvider } from './context/ProductsContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

//admin
import ProfilePageA from './pages/private/ProfilePage';
import DashboardAdminPage from './pages/private/admin/DashboardAdminPage';
// -->    Sus rutas admin
import ProductFormPage from './pages/private/admin/forms/ProductsFormPage';
import PoliciesFormPage from './pages/private/admin/forms/PoliciesFormPage';
import MisionFormPage from './pages/private/admin/forms/MissionFormPage';
import UsersFormPage from './pages/private/admin/forms/UsersFormPage';
import UsersFormUpdate from './pages/private/admin/forms/UsersFormUpdate';
//atalogos para el administrador
import MissionCatalog from './pages/private/admin/catalogs/MissionCatalog';
import VisionCatalog from './pages/private/admin/catalogs/VisionCatalog';
import PoliciesCatalog from './pages/private/admin/catalogs/PoliciesCatalog';
import UsersCatalog from './pages/private/admin/catalogs/UsersCatalog';
import ProductCatalog from './pages/private/admin/catalogs/ProductsCatalog';
import DevicesCatalog from './pages/private/admin/catalogs/DevicesCatalog';

//user
import ProfilePageU from './pages/private/ProfilePage';
import DashboardUserPage from './pages/private/user/DashboardUserPage';
import GestionDevicesPage from './pages/private/user/GestionDevicesPage';
import ControlDevicesPage from './pages/private/user/ControlDevicesPage';
import HistoryPage from './pages/private/user/HostoryPage';

//componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CompanyProvider } from './context/CompanyContext';
import Breadcrumbs from './components/Breadcrumbs';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CompanyProvider>
          <BrowserRouter>
            <div id="root">
              <main>
                <Navbar />
                <Breadcrumbs />
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/home' element={<HomePage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/catalog' element={<ProductsPage />} />
                  <Route path='/view-details/:id' element={<ViewDetails/>} />
                  <Route path='/404' element={< NotFound />} />
                  <Route path='/assign' element={< AssignPage />} />
                  <Route path='/assign/:id' element={< AssignPage />} />
                  {/* DATOS DE LA EMPRESA */}
                  <Route path='/policies' element={<PoliciesPage />} />
                  <Route path='/mission' element={<MissionPage />} />
                  <Route path='/vision' element={<VisionPage />} />
                  <Route path='/location' element={<LocationPage />} />
                  <Route path='/contact' element={<ContactPage />} />
                  <Route path='/faqs' element={<FaqsPage />} />
                  {/* PAGINAS PARA RECUPERACION DE CONTRASEÑA */}
                  <Route path='/token/:username' element={<TokenPage />} />
                  <Route path='/token' element={<TokenPage />} />
                  <Route path='/question' element={<QuestionPage />} />
                  <Route path='/question/:id' element={<QuestionPage />} />
                  <Route path='/options' element={<OptionsRecovery />} />
                  <Route path='/auth' element={<AuthUser />} />
                  <Route path='/new-password/:username' element={<ResetPassword />} />
                  <Route path='/new-password' element={<ResetPassword />} />

                  {/* Rutas protegidas para usuarios */}
                  <Route element={<ProtectedRoute allowedRoles={['Usuario']} />}>
                    <Route path='/dashboard-u' element={<DashboardUserPage />} />
                    <Route path='/agregar' element={<GestionDevicesPage />} />
                    <Route path='/control' element={< ControlDevicesPage />} />
                    <Route path='/control/:id' element={< ControlDevicesPage />} />
                    <Route path='/devices/:id' element={< DeviesPage />} />
                    <Route path='/profile-u' element={<ProfilePageU />} />
                    <Route path='/view-details/:id' element={<ViewDetails />} />
                    <Route path='/history/:mac' element={<HistoryPage />} />
                    <Route path='/404' element={< NotFound />} />
                  </Route>

                  {/* Rutas protegidas para administradores */}
                  <Route element={<ProtectedRoute allowedRoles={['Administrador']} />}>
                    <Route path='/profile' element={<ProfilePageA />} />
                    <Route path='/dashboard-admin' element={<DashboardAdminPage />} />
                    <Route path='/404' element={< NotFound />} />

                    <Route path='/add-product' element={<ProductFormPage />} />
                    {/* PARA PODER USAR LA RUTA DE ACTUALIZACION */}
                    <Route path='/add-product/:id' element={<ProductFormPage />} />
                    <Route path='/add-policies' element={<PoliciesFormPage />} />
                    <Route path='/add-mv' element={<MisionFormPage />} />
                    {/* PARA PODER USAR LA RUTA DE ACTUALIZACION DE USUARIO */}
                    <Route path='/add-users' element={<UsersFormPage />} />
                    <Route path='/add-users/:id' element={<UsersFormUpdate />} />

                    <Route path='/catalog-mission' element={<MissionCatalog />} />
                    <Route path='/catalog-vision' element={<VisionCatalog />} />
                    <Route path='/catalog-policies' element={<PoliciesCatalog />} />
                    <Route path='/catalog-users' element={<UsersCatalog />} />
                    <Route path='/catalog-products' element={<ProductCatalog />} />
                    <Route path='/catalog-devices' element={<DevicesCatalog />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
              <ToastContainer />
            </div>
          </BrowserRouter>
        </CompanyProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;