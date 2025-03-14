import { formatRupiah } from "@/lib/helper";
import { Link } from "@inertiajs/react"
import axios from "axios";
import { useEffect, useState } from "react"

const useLocalStorageListener = () => {
  const [storageData, setStorageData] = useState(getAllLocalStorageItems());

  useEffect(() => {
    const handleStorageChange = () => {
      setStorageData(getAllLocalStorageItems()); // Update state when storage changes
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return storageData;
};

const getAllLocalStorageItems = () => {
  let items = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      items[key] = JSON.parse(localStorage.getItem(key)); // Parse JSON values
    } catch {
      items[key] = localStorage.getItem(key);
    }
  }
  return items;
};


export default function CheckoutSummary() {
  const localStorageData = useLocalStorageListener();
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.post('/api/checkout-summary', localStorageData)
      .then(res => setTotal(res.data))
      .catch(err => console.log('failed to retrieve data ' + err));
    setLoading(false);
    
  }, [localStorageData]);

  return (
    <div className='fixed bottom-5 right-5 p-8 bg-white border-2 border-gray-500 flex gap-4 items-center rounded-xl'>
      {/* <h1 className='text-2xl font-semibold'>Total: {formatRupiah(total)}</h1> */}
      {/* <p>{JSON.stringify(localStorageData, null, 2)}</p> */}
      <Link href='/checkout' className="px-4 py-2 bg-violet-600 text-white rounded-full">Checkout</Link>
    </div>
  )
}