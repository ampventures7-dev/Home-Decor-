import ProductCard from "./ProductCard";
export default function ProductGrid({ products, wishlist, onWishlist, onAdd, children }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {products.map(product => <ProductCard key={product.id} product={product} wished={wishlist.includes(product.id)} onWishlist={onWishlist} onAdd={onAdd}/>)}
      {children}
    </div>
  );
}
