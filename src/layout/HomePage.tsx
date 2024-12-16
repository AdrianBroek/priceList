import ProductList from '../components/productList';
import PriceList from '../components/priceList';
import MatchArea from '../components/MatchArea';
import EnhancedTable from '../components/TableWithPriceList';
import CSVReader from '../components/LoadProductsFromCsv';
import BoxSizes from '../components/BoxSizes';
import SortChange from '../components/SortChange';
import DataTable from '../components/TableWithProducts';

const HomePage = () => {
    return (
        <>
            <CSVReader />
            <DataTable />
            <PriceList />
            <EnhancedTable />
            <BoxSizes />
            <SortChange />
            <MatchArea />
        </>
    )
}

export default HomePage