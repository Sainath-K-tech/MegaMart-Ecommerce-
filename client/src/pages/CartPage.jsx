import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid gap-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white flex items-center justify-between p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <img src={item.thumbnail} alt={item.title} className="h-20 w-20 object-cover rounded-md"/>
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">Qty: {item.qty}</p>
                    <p className="font-bold text-green-600">₹{item.price * item.qty}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="bg-white p-4 rounded-lg shadow-md text-right font-bold text-xl">
              Total: ₹{total}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
