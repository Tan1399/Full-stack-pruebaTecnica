export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border p-4 rounded shadow bg-gray-100">
      <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p>{product.descripcion}</p>
      <p className="text-green-600 font-semibold">${product.price}</p>
      {onAddToCart && (
        <button
          onClick={onAddToCart}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Agregar al carrito
        </button>
      )}
    </div>
  );
}