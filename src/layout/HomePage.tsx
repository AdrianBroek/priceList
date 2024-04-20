import ProductList from '../components/productList';
import PriceList from '../components/priceList';
import MatchArea from '../components/MatchArea';
import EnhancedTable from '../components/TableWithPriceList';
import CSVReader from '../components/LoadProductsFromCsv';
import BoxSizes from '../components/BoxSizes';
import SortChange from '../components/SortChange';

const HomePage = () => {
    return (
        <>
            <CSVReader />
            <ProductList />
            <PriceList />
            <EnhancedTable />
            <BoxSizes />
            <SortChange />
            <MatchArea />
        </>
    )
}

export default HomePage