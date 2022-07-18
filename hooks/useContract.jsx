import React, { useState } from 'react';
import { ethers } from 'ethers';

const marketABI = require('../utils/NFT_MARKET_ABI.json');
const dogABI = require('../utils/DOG_NFT_ABI.json');

const dogNFTAddress = String(
  process.env.NEXT_PUBLIC_DEPLOYED_DOGNFT_ADDRESS
);

const marketAddress = String(
  process.env.NEXT_PUBLIC_DEPLOYED_MERKETPLACE_ADDRESS
);

const url = String(process.env.NEXT_PUBLIC_BINANCE_TESTNET_URL);
const privateKey = String(
  process.env.NEXT_PUBLIC_BINANCE_TESTNET_PRIVATE_KEY
);
const useContract = () => {
  const provider = new ethers.providers.AlchemyProvider(
    'rinkeby',
    'Fjbb-i8h6Od96y9g18_Jv7-DhNvlb8tu'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  const signer = wallet.connect(provider);
  const dogNftContract = new ethers.Contract(
    dogNFTAddress,
    dogABI,
    signer
  );
  const marketContract = new ethers.Contract(
    marketAddress,
    marketABI,
    signer
  );

  return {
    signer,
    provider,
    dogNftContract,
    marketContract,
    dogNFTAddress,
    marketAddress,
  };
};

export default useContract;
