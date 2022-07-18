import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useMoralisQuery } from 'react-moralis';
import Moralis from 'moralis';

const useBuyNft = () => {
  const [ownerOf, setOwnerOf] = useState();
  const [sold, setSold] = useState(false);
  const { fetch } = useMoralisQuery(
    'AllToken',
    (query) => query,
    [],
    {
      autoFetch: false,
    }
  );

  const handleBuy = async (tokenID, price) => {
    const marketABI = require('../utils/NFT_MARKET_ABI.json');
    const dogABI = require('../utils/DOG_NFT_ABI.json');

    const dogNFTAddress = String(
      process.env.NEXT_PUBLIC_DEPLOYED_DOGNFT_ADDRESS
    );

    const marketAddress = String(
      process.env.NEXT_PUBLIC_DEPLOYED_MERKETPLACE_ADDRESS
    );
    const provider = new ethers.providers.Web3Provider(
      web3.currentProvider
    );
    const signer = provider.getSigner();
    const dogWeb3Contract = new ethers.Contract(
      dogNFTAddress,
      dogABI,
      signer
    );
    const marketWeb3Contract = new ethers.Contract(
      marketAddress,
      marketABI,
      signer
    );

    const ownerOfBefore = await dogWeb3Contract.ownerOf(tokenID);
    console.log('ownerOfBefore', ownerOfBefore);
    setOwnerOf(ownerOfBefore);
    const gas = 450000;
    // const value = ethers.utils.formatEther(String(price));
    const value = ethers.utils.parseUnits(price.toString(), 'ether');
    const tx = await marketWeb3Contract.sellMarketItem(tokenID, {
      value: value,
      gasLimit: gas,
    });
    marketWeb3Contract.on('ChangeOwnership', async () => {
      console.log(tx);
      const fetsh = await fetch();
      const _res = Moralis.Object.extend('AllItemsMarket');
      const query = new Moralis.Query(_res);
      query.equalTo('itemId', `${tokenID}`);
      const results = await query.first();
      console.log(results);
      if (results) {
        results.set('status', true);
        results.save();
      }
      setSold(true);
    });
    console.log('tx', tx);
    const ownerOfAfter = await dogWeb3Contract.ownerOf(tokenID);
    console.log('ownerOfAfter', ownerOfAfter);
    setOwnerOf(ownerOfAfter);
  };
  return [handleBuy, { ownerOf, sold }];
};

export default useBuyNft;
