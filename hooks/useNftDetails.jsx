import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import useContract from './useContract';

const useNftDetails = (tokenID) => {
  const [data, setData] = useState();
  const [nftDetails, setNftDetails] = useState();
  const [loading, setLoading] = useState(false);
  const {
    signer,
    provider,
    dogNftContract,
    marketContract,
    dogNFTAddress,
    marketAddress,
  } = useContract();

  const handleFetchNFT = async () => {
    try {
      const marketItemsList = await marketContract.marketItemsList(
        tokenID
      );
      const royalityFee = await marketContract.royalty_fee();
      const nftList = await dogNftContract.NFTList(tokenID);

      if (nftList.token_uri !== null) {
        let tempUrl = nftList.TOKENURI;
        const url = tempUrl.replace(
          'https://ipfs.moralis.io:2053/ipfs/',
          'https://ipfs.io/ipfs/'
        );
        const response = await fetch(url);
        const _json = await response.json();
        let item = {
          image: _json.image,
          name: _json.name,
          description: _json.description,
          dna: _json.dna,
          AGILITY: nftList.AGILITY,
          BREED_COUNT: nftList.BREED_COUNT,
          HEALTH: nftList.HEALTH,
          LUCK: nftList.LUCK,
          STAMINA: nftList.STAMINA,
          TIER: nftList.TIER,
          TOKENURI: nftList.TOKENURI,
          WEIGHT: nftList.WEIGHT,
          creator: nftList.creator,
          attributes: _json.attributes,
          owner: marketItemsList.owner,
          NFTaddress: marketItemsList.NFTaddress,
          price: marketItemsList.price.toNumber(),
          tokenID: marketItemsList.tokenID.toNumber(),
          royalityFee: royalityFee.toNumber(),
          date: _json.date,
        };
        setNftDetails(item);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchNFT();
  }, [signer]);
  return { nftDetails };
};

export default useNftDetails;
