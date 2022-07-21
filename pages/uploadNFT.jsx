import 'bootstrap/dist/css/bootstrap.min.css';
import { ethers } from 'ethers';
import Link from 'next/link';
import { useState } from 'react';
// external imports
import { ChevronRight } from 'react-bootstrap-icons';
import Layout from '../components/layout/layout';
import useContract from '../hooks/useContract';
import styles from '../styles/Details.module.css';
const UploadNFT = () => {
  const [tokenURL, setTokenURL] = useState('');
  const [tire, setTire] = useState('');
  const [breedCount, setBreedCount] = useState('');
  const [agility, setAgility] = useState('');
  const [weight, setWeight] = useState('');
  const [stamina, setStamina] = useState('');
  const [health, setHealth] = useState('');
  const [luck, setLuck] = useState('');

  const {
    signer,
    provider,
    dogNftContract,
    marketContract,
    dogNFTAddress,
    marketAddress,
  } = useContract();

  const handleUpload = async () => {
    const createCollectable = await dogNftContract.createCollectible(
      tokenURL,
      tire,
      breedCount,
      agility,
      weight,
      stamina,
      health,
      luck
    );
    const tokenCounter = await dogNftContract.tokenCounter();
    console.log('tokenCounter', tokenCounter);
    const tokenID = tokenCounter.toNumber() - 1;
    console.log('Token ID', tokenID);
    const approve = await dogNftContract.approve(
      marketAddress,
      tokenID
    );
    const value = ethers.utils.parseEther('0.001');
    const addMarketItem = await marketContract.addMarketItem(
      tokenID,
      dogNFTAddress,
      value
    );
    console.log('Add Market Item');
    console.log(addMarketItem);
    const marketItemCounter =
      await marketContract.marketItemCounter();
    console.log('Market Item Counter');
    console.log(marketItemCounter);
    const NFTList = await dogNftContract.NFTList(tokenID);
    console.log('Market Items List', NFTList);
  };

  return (
    <Layout>
      <div className={styles.detailsHeading}>
        <h2>Upload NFT</h2>
        <p>
          <Link href="/"><span style={{cursor: "pointer"}}>Home</span></Link> <ChevronRight /> Upload NFT
        </p>
      </div>
      <br />
      <br />
      <div style={{ width: '50%', marginLeft: '20%' }}>
        <div className="form-group">
          <h5
            style={{
              textAlign: 'center',
              color: 'white',
              paddingBottom: '10px',
            }}
          >
            Token URL
          </h5>
          <input
            type="text"
            className="form-control "
            value={tokenURL}
            onChange={(e) => setTokenURL(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h5
            style={{
              textAlign: 'center',
              color: 'white',
              paddingBottom: '10px',
            }}
          >
            TIER
          </h5>
          <input
            type="text"
            className="form-control "
            value={tire}
            onChange={(e) => setTire(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h5
            style={{
              textAlign: 'center',
              color: 'white',
              paddingBottom: '10px',
            }}
          >
            BREED_COUNT
          </h5>
          <input
            type="text"
            className="form-control "
            value={breedCount}
            onChange={(e) => setBreedCount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h5
            style={{
              textAlign: 'center',
              color: 'white',
              paddingBottom: '10px',
            }}
          >
            AGILITY
          </h5>
          <input
            type="text"
            className="form-control "
            value={agility}
            onChange={(e) => setAgility(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h5
            style={{
              textAlign: 'center',
              color: 'white',
              paddingBottom: '10px',
            }}
          >
            WEIGHT
          </h5>
          <input
            type="text"
            className="form-control "
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h5
            style={{
              textAlign: 'center',
              color: 'white',
              paddingBottom: '10px',
            }}
          >
            STAMINA
          </h5>
          <input
            type="text"
            className="form-control "
            value={stamina}
            onChange={(e) => setStamina(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h5
            style={{
              textAlign: 'center',
              color: 'white',
              paddingBottom: '10px',
            }}
          >
            HEALTH
          </h5>
          <input
            type="text"
            className="form-control "
            value={health}
            onChange={(e) => setHealth(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h5
            style={{
              textAlign: 'center',
              color: 'white',
              paddingBottom: '10px',
            }}
          >
            LUCK
          </h5>
          <input
            type="text"
            className="form-control "
            value={luck}
            onChange={(e) => setLuck(e.target.value)}
          />
        </div>
        <button
          className="mt-3 btn btn-primary w-100"
          onClick={handleUpload}
        >
          Mint
        </button>
      </div>
    </Layout>
  );
};

export default UploadNFT;
