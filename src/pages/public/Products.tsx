import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { getProducts } from "../../api/HandleApi";
import ProductDetailDrawer from "../../components/product/ProductDetailDrawer";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}

            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => setSelectedProductId(product.id)}
                            className="border rounded p-4 shadow cursor-pointer"
                        >
                            <p>Name: {product.name}</p>
                            <p>Price: {product.price}</p>
                            <p>Stock: {product.stock}</p>
                        </div>
                    ))}
                </div>
            )}

            <ProductDetailDrawer
                productId={selectedProductId}
                onClose={() => setSelectedProductId(null)}
            />
        </div>
    );
};

export default Products;