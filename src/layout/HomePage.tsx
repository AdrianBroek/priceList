import ProudctList from '../components/productList';
import PriceList from '../components/priceList';
import MatchArea from '../components/MatchArea';
import EnhancedTable from '../components/TableWithPriceList';
import CSVReader from '../components/LoadProductsFromCsv';
import BoxSizes from '../components/BoxSizes';

const HomePage = () => {
    return (
        <>
            <CSVReader />
            <ProudctList />
            <PriceList />
            <EnhancedTable />
            <BoxSizes />
            <MatchArea />
        </>
    )
}

export default HomePage