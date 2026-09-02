import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { getProductById } from "../../api/HandleApi";

interface ProductDetailDrawerProps {
    productId: number | null;
    onClose: () => void;
}

const ProductDetailDrawer = ({
    productId,
    onClose,
}: ProductDetailDrawerProps) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (productId === null) {
            setIsVisible(false);
            return;
        }

        setProduct(null);
        setLoading(true);

        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        async function fetchProduct() {
            try {
                const data = await getProductById(productId.toString());
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [productId]);

    if (productId === null) {
        return null;
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
                onClick={onClose}
            />

            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow z-50 transition-transform duration-300 ${
                    isVisible ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl"
                >
                    ✕
                </button>

                <div className="p-6 flex flex-col gap-3">
                    {loading && <p>Loading...</p>}

                    {!loading && product && (
                        <>
                            <h2 className="text-2xl font-bold">
                                {product.name}
                            </h2>

                            <p>Price: {product.price}</p>

                            <p>Stock: {product.stock}</p>

                            <p>Description: {product.description}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetailDrawer;