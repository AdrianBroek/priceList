// load products
const loadProducts = async () => {
    interface Product {
        id: number;
        title: string;
    }
    
    let products: Product[] = []
    
    interface ProductList {
        products: Product[];
        loaded: boolean;
    }
    
    let updatedProductList: ProductList = {
        products: [],
        loaded: false
    }
    
    const productFetch = async () => {
        try {
            const result = await fetch("https://dummyjson.com/products?limit=10")
            if (!result.ok) {
                throw new Error("smh went bad with api")
            }
            return await result.json()
            
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    
    
    async function waitForProducts() {
        const result = await productFetch()  
        const transformedProducts = result.products.map((product: any) => ({
            id: product.id,
            title: product.title,
        }));
        products.push(...transformedProducts);
        updatedProductList = {
            products,
            loaded: true
        };
    }

    await waitForProducts(); // Poczekaj na załadowanie produktów
    
    return updatedProductList;
    
}

let productList: { products: Array<any>, loaded: boolean } = {
    products: [],
    loaded: false
};

const fetchProduct = async () => {
    
    let productList = await loadProducts();
    // console.log(productList);
    if (productList.loaded){
        return productList.products;
    }
}
    

export default fetchProduct
