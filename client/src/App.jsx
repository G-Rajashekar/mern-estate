import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from './components/Header';
import Private from "./components/Private";
import CreateListing from "./pages/CreateListing";
import EditListing from './pages/EditListing'
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import WishList from "./pages/WishList";
import WishlistProvider from "./WishlistContext";
import AdminAppointments from "./pages/AdminAppointments";
import AdminRoute from "./components/AdminRoute";
import Appointment from "./components/Appointment";

function AppRoutes() {
  const location = useLocation();

  // Do not show header on /appointments admin route
  const hideHeaderRoutes = ["/appointments"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<Private />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<EditListing />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/appointment" element={<Appointment />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/appointments" element={<AdminAppointments />} />
        </Route>

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </WishlistProvider>
  );
}
