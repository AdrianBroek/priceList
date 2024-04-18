export function checkSizes(width, height, depth, priceList) {
    
    const productSizes = [depth, height, width];
    const priceListSizes = [priceList.depth, priceList.height, priceList.width];

    const maxOfproductSizes = Math.max(...productSizes)
    const minOfproductSizes = Math.min(...productSizes)
    const midOfproductSizes = [...productSizes].filter((el)=> el !== maxOfproductSizes && el !== minOfproductSizes)

    const maxOfpriceListSizes = Math.max(...priceListSizes)
    const minOfpriceListSizes = Math.min(...priceListSizes)
    const midOfpriceListSizes = [...priceListSizes].filter((el)=> el !== maxOfpriceListSizes && el !== minOfpriceListSizes)

    if(priceListSizes[0] == priceListSizes[1] && priceListSizes[1] == priceListSizes[2]){
        if(
            maxOfproductSizes < priceListSizes[0] 
            && minOfproductSizes < priceListSizes[0]
            && midOfproductSizes < priceListSizes[0]
        ){
            return true;
        } else {
            return false;
        }
    } else {
        if(
            maxOfproductSizes < maxOfpriceListSizes 
            && minOfproductSizes < minOfpriceListSizes
            && midOfproductSizes < midOfpriceListSizes
        ){
            return true;
        } else {
            return false;
        }
    }
}