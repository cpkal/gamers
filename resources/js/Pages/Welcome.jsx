import CheckoutButton from '@/Components/CheckoutButton';
import CheckoutSummary from '@/Components/CheckoutButton';
import Container from '@/Components/Container';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';
import { Head } from '@inertiajs/react';
import {  useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion, products }) {
    const [productsSelected, setProductsSelected] = useState([]); //used for ui update only

    const handleSelectProduct = (product) => {
        localStorage.setItem(product.id, JSON.stringify({
            productId: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            qty: 1,
            pickTime: "08:00",
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 1))
        }));

        setProductsSelected([
            {
                productId: product.id,
                image: product.image,
                name: product.name,
                price: product.price
            },
            ...productsSelected
        ]);
    }

    const handleDeleteProduct = (product) => {
        setProductsSelected(productsSelected.filter(a => a.productId !== product.id))
        localStorage.removeItem(product.id);
    }

    return (
        <>
            <Head title="Gamers" />
            <Navbar auth={auth} />

            <Container>
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

                <CheckoutButton />
            </Container>
        </>
    );
}
