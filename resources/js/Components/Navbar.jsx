import { Link } from "@inertiajs/react"
import { AiOutlineOrderedList, AiOutlineUser } from "react-icons/ai"

export default function Navbar({ auth }) {
  return (
    <nav className="px-8 md:px-32 py-0 md:py-6 flex justify-between items-center w-full shadow-sm">
      <a href="/">
        <h1 className="text-3xl font-semibold">GA<span className="text-violet-500">ME</span>RS</h1>
      </a>

      {auth.user ? (
        <div className="hidden md:flex gap-4">
          <Link href="/my-orders" className="px-4 py-2 bg-violet-600 text-white rounded-full flex items-center"><AiOutlineOrderedList size={18} /> <span className="ml-2">Order List</span></Link>
        </div>
      ) : (
        <div className="hidden md:flex gap-4">
          <Link href='/login' className="px-4 py-2 bg-violet-600 text-white rounded-full">Masuk</Link>
          <Link href="/register" className="px-4 py-2 bg-neutral-600 text-white rounded-full">Daftar</Link>
        </div>
      )}

      <button className="border-zinc-800 block md:hidden">
        Burger
      </button>
    </nav >

  )
}