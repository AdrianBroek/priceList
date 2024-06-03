export function checkSizes(width, height, depth, priceList) {
    
    const productSizes = [depth, height, width];
    const priceListSizes = [priceList.depth, priceList.height, priceList.width];

    const maxOfproductSizes = Math.max(...productSizes);
    const minOfproductSizes = Math.min(...productSizes);
    const midOfproductSizes = [...productSizes].sort((a,b) => a - b)[1];

    const maxOfpriceListSizes = Math.max(...priceListSizes);
    const minOfpriceListSizes = Math.min(...priceListSizes);
    // sort numbers and take median, in case of same sizes
    const midOfpriceListSizes = [...priceListSizes].sort((a,b) => a - b)[1];

    // jesli gabaryty cennika sa takie same
    if(priceListSizes[0] == priceListSizes[1] && priceListSizes[1] == priceListSizes[2]){
        // console.log(midOfpriceListSizes)
        if(
            maxOfproductSizes < priceListSizes[0] 
            && minOfproductSizes < priceListSizes[0]
            && midOfproductSizes < priceListSizes[0]
        ){
            return true;
        } else {
            return false;
        }

    } 
    // jesli gabaryty cennika sa rozne
    else {
        // console.log(midOfpriceListSizes)
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