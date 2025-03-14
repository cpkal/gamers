import CheckoutSummary from '@/Components/CheckoutSummary';
import Container from '@/Components/Container';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';
import { Head } from '@inertiajs/react';
import {  useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion, products }) {
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
        localStorage.removeItem(product.id);
    }

    return (
        <>
            <Head title="Welcome" />
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

                <CheckoutSummary />
            </Container>
        </>
    );
}
