import Container from '@/Components/Container';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const products = [
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41zzkufEtNtca2D54yPz-Bip4x5vep1IByQ&s',
        name: 'PlayStation 4',
        price: 'Rp 30.000 / sesi'
    },
    {
        id: 2,
        image: 'https://media.dinomarket.com/docs/imgTD/2024-02/DM_CA961EB8D9C88E81647BBFE7417EB9C0_210224140212_ll.jpg',
        name: 'PlayStation 5',
        price: 'Rp 40.000 / sesi'
    }
]


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [productsSelected, setProductsSelected] = useState([]);

    const handleSelectProduct = (product) => {
        setProductsSelected([
            {
                productId: product.id,
                image: product.image,
                name: product.name,
                price: product.price
            },
            ...productsSelected
        ])
    }

    const handleDeleteProduct = (product) => {
        setProductsSelected(productsSelected.filter(a => a.productId !== product.id))
    }

    const [bookingStartDate, setBookingStartDate] = useState(null);
    const [bookingEndDate, setBookingEndDate] = useState(null);
    const [bookingPickTime, setBookingPickTime] = useState(null);
    const [bookingQty, setBookingQty] = useState(null);

    return (
        <>
            <Head title="Welcome" />
            <Navbar auth={auth} />
            {/* <Hero /> */}

            <Container>
                {/* <DateRangePicker /> */}
                <div>
                    <h2 className="text-3xl font-semibold">Playstation Tersedia</h2>
                    <p>Pilih Playstation sesuai keinginan Anda!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 mb-12">
                    {products.map((product) => {
                        return <ProductCard
                            key={product.id}
                            product={product}
                            productsSelected={productsSelected}
                            handleSelect={handleSelectProduct}
                            handleDelete={handleDeleteProduct}
                        />
                    })}
                </div>

                <div className='fixed bottom-5 right-5 p-8 bg-white border-2 border-gray-500 flex gap-4 items-center rounded-xl'>
                    <h1 className='text-2xl font-semibold'>Total: Rp50,000</h1>
                    <Link href='/checkout' className="px-4 py-2 bg-violet-600 text-white rounded-full">Checkout</Link>
                </div>
            </Container>
        </>
    );
}
