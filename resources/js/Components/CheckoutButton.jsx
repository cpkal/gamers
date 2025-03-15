import { router } from "@inertiajs/react"
import { useEffect } from "react";

export default function CheckoutButton() {

  const handleCheckout = () => {
    router.get('/checkout');
  }

  return (
    <button onClick={handleCheckout} className={`bg-violet-600 fixed bottom-5 right-5 px-4 py-2 text-white rounded-full`}>Checkout</button>
  )
}