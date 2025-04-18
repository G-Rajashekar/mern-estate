import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Profile  from './pages/Profile'
import SignIn  from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from './components/Header';
import Private from "./components/Private";
import CreateListing from "./pages/CreateListing";
import EditListing from './pages/EditListing'
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import WishList from "./pages/WishList";
import WishlistProvider from "./WishlistContext";
import Appointment from "./components/Appointment";
export default function App(){
  return(
    <WishlistProvider>
   <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/sign-in" element={<SignIn/>}></Route>
    <Route path="/sign-up" element={<SignUp/>}></Route>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/search" element={<Search/>}></Route>
    <Route element={<Private/>}>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/create-listing" element={<CreateListing/>}></Route>
    <Route path='/update-listing/:listingId' element={<EditListing/>}></Route>
    <Route path="/listing/:listingId" element={<Listing/>}></Route>
    <Route path="/wishlist" element={<WishList/>}></Route>
    <Route path="/appointment" element={<Appointment/>}></Route>
    </Route>
  </Routes>
  </BrowserRouter>
  </WishlistProvider>
  )
}