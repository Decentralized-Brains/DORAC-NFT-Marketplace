import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';

const useFetcUserhNFTs = () => {
  const [userNfts, setUserNfts] = useState([]);
  const { Moralis, user, account } = useMoralis();
  const [results, setResults] = useState();

  const handleFetchNFT = async (account) => {
    try {
      const marketNfts = await Moralis.Web3API.account.getNFTs({
        chain: 'rinkeby',
        address: account,
      });

      setResults(marketNfts.result);

      const items = await Promise.all(
        results.map(async (nft) => {
          if (nft.token_uri !== null) {
            let tempUrl = nft.token_uri;
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
              amount: nft.amount,
              blockNumber: nft.block_number,
              blockNumberMinted: nft.block_number_minted,
              contractType: nft.contract_type,
              lastMetadataSync: nft.last_metadata_sync,
              lastTokenUriSync: nft.last_token_uri_sync,
              metadata: nft.metadata,
              name: nft.name,
              ownerOf: nft.owner_of,
              symbol: nft.symbol,
              tokenAddress: nft.token_address,
              tokenHash: nft.token_hash,
              tokenId: nft.token_id,
              tokenUri: nft.token_uri,
            };
            return item;
          }
        })
      );
      setUserNfts(items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchNFT(account);
  }, [results]);
  return { userNfts };
};

export default useFetcUserhNFTs;
