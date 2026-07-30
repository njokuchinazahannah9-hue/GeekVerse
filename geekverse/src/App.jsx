import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";

import Manga from "./pages/Manga";
import MangaDetails from "./pages/MangaDetails";

import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";

import Comics from "./pages/Comics";
import ComicDetails from "./pages/ComicDetails";

import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import Search from "./pages/Search";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import ProtectedRoute from "./components/ProtectedRoute";

import Library from "./pages/Library";
import LibraryViewer from "./pages/LibraryViewer";

import Premium from "./pages/Premium";

import AdminLayout from "./admin/layouts/AdminLayout";

import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Users from "./admin/pages/Users";
import Staff from "./admin/pages/Staff";
import Analytics from "./admin/pages/Analytics";
import SettingsAdmin from "./admin/pages/Settings";
import Managers from "./admin/pages/Managers";

function App() {
  return (
    <Routes>

      {/* ==========================
          HOME
      ========================== */}

      <Route path="/" element={<Home />} />

      {/* ==========================
          MOVIES
      ========================== */}

      <Route path="/movies" element={<Movies />} />
      <Route path="/movie/:id" element={<MovieDetails />} />

      {/* ==========================
          MANGA
      ========================== */}

      <Route path="/manga" element={<Manga />} />
      <Route path="/manga/:id" element={<MangaDetails />} />

      {/* ==========================
          BOOKS
      ========================== */}

      <Route path="/books" element={<Books />} />
      <Route path="/book/:id" element={<BookDetails />} />

      {/* ==========================
          COMICS
      ========================== */}

      <Route path="/comics" element={<Comics />} />
      <Route path="/comic/:id" element={<ComicDetails />} />

      {/* ==========================
          SEARCH
      ========================== */}

      <Route path="/search" element={<Search />} />

      {/* ==========================
          AUTH
      ========================== */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* ==========================
          PROTECTED PAGES
      ========================== */}

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/premium"
        element={
          <ProtectedRoute>
            <Premium />
          </ProtectedRoute>
        }
      />

      {/* ==========================
          LIBRARY
      ========================== */}

      <Route
        path="/library"
        element={<Library />}
      />

      <Route
        path="/library/:id"
        element={<LibraryViewer />}
      />

  {/* ==========================
    ADMIN PANEL
========================== */}

<Route path="/admin" element={<AdminLayout />}>

  <Route
    index
    element={<Dashboard />}
  />

  <Route
    path="products"
    element={<Products />}
  />

  <Route
    path="orders"
    element={<Orders />}
  />

  <Route
    path="users"
    element={<Users />}
  />

  <Route
    path="staff"
    element={<Staff />}
  />

  <Route
    path="managers"
    element={<Managers />}
  />

  <Route
    path="analytics"
    element={<Analytics />}
  />

  <Route
    path="settings"
    element={<SettingsAdmin />}
  />

</Route>

    </Routes>
  );
}

export default App;