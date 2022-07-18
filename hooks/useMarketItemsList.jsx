import useContract from './useContract';

import { useState, useEffect } from 'react';

const useMarketItemsList = () => {
  const [dataMarketItems, setDataMarketItems] = useState([]);

  const {
    signer,
    provider,
    dogNftContract,
    marketContract,
    dogNFTAddress,
    marketAddress,
  } = useContract();

  const handleMarketItem = async () => {
    const marketItemCounter =
      await marketContract.marketItemCounter();
    const marketItemArray = [];
    for (let i = 1; i <= marketItemCounter.toNumber(); i++) {
      const marketItemsList = await marketContract.marketItemsList(i);
      const temp = {
        tokenID: marketItemsList.tokenID.toNumber(),
        NftAddress: marketItemsList.NFTaddress,
        creator: marketItemsList.creator,
        owner: marketItemsList.owner,
      };
      marketItemArray.push(temp);
    }
    setDataMarketItems(marketItemArray);
  };

  useEffect(() => {
    handleMarketItem();
  }, []);
  return { dataMarketItems };
};

export default useMarketItemsList;
