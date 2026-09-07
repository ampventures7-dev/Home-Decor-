import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Check } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Collections from "./pages/Collections";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import StyleGuide from "./pages/StyleGuide";
import { products } from "./data/products";

// Realistic initial dummy state so pages are immediately testable
const initialSampleCart = [
  {
    ...products[10], // Konkan Teak Wood Daybed
    qty: 1
  },
  {
    ...products[7], // Ganpatipule Handcrafted Ceramic Urn
    qty: 2
  }
];

const initialSampleWishlist = [1, 2, 4, 7];

export default function App() {
  const [cart, setCart] = useState(initialSampleCart);
  const [wishlist, setWishlist] = useState(initialSampleWishlist);
  const [globalToast, setGlobalToast] = useState(null);

  const showToast = (message, actionLink = null, actionText = null) => {
    setGlobalToast({ message, actionLink, actionText });
    setTimeout(() => setGlobalToast(null), 3500);
  };

  // Cart Handlers
  const onAdd = (product, qty = 1) => {
    setCart((curr) => {
      const existing = curr.find((item) => item.id === product.id);
      if (existing) {
        return curr.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...curr, { ...product, qty }];
    });
    showToast(`Added "${product.name}" to your bag!`, "/cart", "View Bag →");
  };

  const onQty = (id, qty) => {
    setCart((curr) => curr.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const onRemove = (id) => {
    const item = cart.find(x => x.id === id);
    setCart((curr) => curr.filter((item) => item.id !== id));
    if (item) {
      showToast(`Removed "${item.name}" from your bag.`);
    }
  };

  const onClearCart = () => {
    setCart([]);
    showToast("Cleared your shopping bag.");
  };

  const onResetCart = () => {
    setCart(initialSampleCart);
    showToast("Restored sample handcrafted creations to your bag.");
  };

  // Wishlist Handlers
  const onWishlist = (id) => {
    const product = products.find((p) => p.id === id);
    const name = product ? product.name : "Creation";
    setWishlist((curr) => {
      if (curr.includes(id)) {
        showToast(`Removed "${name}" from your wishlist.`);
        return curr.filter((item) => item !== id);
      } else {
        showToast(`Saved "${name}" to your wishlist!`, "/wishlist", "View Wishlist →");
        return [...curr, id];
      }
    });
  };

  const onClearWishlist = () => {
    setWishlist([]);
    showToast("Cleared all saved pieces from wishlist.");
  };

  const onResetWishlist = () => {
    setWishlist(initialSampleWishlist);
    showToast("Restored demo wishlist pieces.");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlist.length;

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col selection:bg-terracotta selection:text-white relative">
      <ScrollToTop />
      
      {/* Global Toast Notification */}
      {globalToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-walnut text-offwhite px-5 py-3.5 shadow-warm-lg border border-brass/40 animate-fadeIn rounded-[2px]">
          <div className="w-5 h-5 rounded-full bg-brass text-walnut flex items-center justify-center shrink-0">
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-xs font-sans tracking-wide">{globalToast.message}</span>
          {globalToast.actionLink && (
            <Link
              to={globalToast.actionLink}
              className="ml-3 text-xs font-bold text-brass-light underline uppercase tracking-wider hover:text-white shrink-0"
            >
              {globalToast.actionText}
            </Link>
          )}
        </div>
      )}

      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />
      
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<Home wishlist={wishlist} onWishlist={onWishlist} onAdd={onAdd} />}
          />
          <Route
            path="/shop"
            element={<Shop wishlist={wishlist} onWishlist={onWishlist} onAdd={onAdd} />}
          />
          <Route
            path="/home-decor"
            element={<Shop wishlist={wishlist} onWishlist={onWishlist} onAdd={onAdd} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetails wishlist={wishlist} onWishlist={onWishlist} onAdd={onAdd} />}
          />
          <Route path="/collections" element={<Collections />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onQty={onQty}
                onRemove={onRemove}
                onWishlist={onWishlist}
                onClearCart={onClearCart}
                onResetCart={onResetCart}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                onWishlist={onWishlist}
                onAdd={onAdd}
                onClearWishlist={onClearWishlist}
                onResetWishlist={onResetWishlist}
              />
            }
          />
          <Route path="/style-guide" element={<StyleGuide />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
