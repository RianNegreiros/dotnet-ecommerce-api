import React, { Fragment, useEffect, useState } from "react";
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;

        agent.Catalog.list()
            .then((products) => {
                if (mounted) setProducts(products);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) return <LoadingComponent message='Loading products...' />;

    return (
        <Fragment>
            <ProductList products={products} />
        </Fragment>
    );
}