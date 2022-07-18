import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'react-bootstrap-icons';
// internal imports
import styles from './Card.module.css';
import ShortenAddress from '../utils/shortenAddress';

const Card = ({ data }) => {
  const {
    image,
    name,
    description,
    symbol,
    tokenAddress,
    ownerOf,
    tokenId,
    amount,
  } = data;
  return (
    <div className={`card ${styles.myCard}`}>
      <div className={styles.image}>
        <img
          src={image}
          alt="Image"
          style={{ width: '100%', height: '270px' }}
        />
      </div>
      <div className="card-body">
        <div className={styles.customCB}>
          <div className={styles.cardHeader}>
            <div className={styles.headerImages}>
              <div>
                <img src={image} alt="Image" />
                <ShortenAddress
                  address={ownerOf}
                  style={{ color: 'gray' }}
                />
              </div>
            </div>
            <span>
              <Heart /> {0}
            </span>
          </div>
          <h5>{name}</h5>
          <p>{description}</p>
        </div>
        <div className={styles.cardFooter}>
          <h5>{amount} ETH</h5>
          <span className={styles.custonBtn}>
            <Link href={'/' + tokenId}>Buy Now</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
