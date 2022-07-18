import Image from 'next/image';
import { useState } from 'react';
import {
  PencilSquare,
  Share,
  ThreeDots,
  Twitter,
} from 'react-bootstrap-icons';
import Banner from '../../assets/img/banner2.png';
import Man from '../../assets/img/tala2.png';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import Layout from '../../components/layout/layout';
import styles from '../../styles/Profile.module.css';
// external imports
import { useMoralis } from 'react-moralis';
import ShortenAddress from '../../components/utils/shortenAddress';
import useFetcUserhNFTs from '../../hooks/useFetchUserNFTs';
import Davatar from '@davatar/react';

const Profile = () => {
  const [filtering, setFiltering] = useState('all');
  const { Moralis, user, account } = useMoralis();
  const { userNfts } = useFetcUserhNFTs();
  return (
    <Layout>
      <div className={styles.header}>
        <Image src={Banner} alt="image" />
      </div>
      <div className={styles.profile}>
        {account === undefined || account === null ? (
          <div className={styles.profilePic}>
            <Image src={Man} alt="image" />
          </div>
        ) : (
          <div className={styles.profilePic}>
            <Davatar
              size={134}
              address={account}
              generatedAvatarType="jazzicon"
              style={{ padding: '2px' }}
            />
          </div>
        )}
        <div className={styles.texts}>
          <h2>
            <ShortenAddress address={account} />
          </h2>
          <div className={styles.ico}>
            <span>
              <Twitter />{' '}
            </span>
            <p style={{ fontWeight: '400', margin: '4px 0 0 6px' }}>
              loremipsum
            </p>
          </div>
          <div className={styles.ering}>
            <p>
              <span>189k</span> followers
            </p>
            <p>
              <span>123</span> following
            </p>
          </div>

          <div className={styles.buttons}>
            <Button text="Follow" />
            <Button text={<Share />} />
            <Button text={<ThreeDots />} />
            <Button text={<PencilSquare />} />
          </div>
        </div>
      </div>

      <br />
      <div className="container">
        <div className={styles.exploreProduct}>
          <div className={styles.titleWrapper}>
            <ul className={styles.titleFilters}>
              <li
                onClick={() => setFiltering('all')}
                className={filtering === 'all' && 'activeFilter'}
              >
                All
              </li>
              <li
                onClick={() => setFiltering('art')}
                className={filtering === 'art' && 'activeFilter'}
              >
                Art
              </li>
              <li
                onClick={() => setFiltering('music')}
                className={filtering === 'music' && 'activeFilter'}
              >
                Music
              </li>
              <li
                onClick={() => setFiltering('video')}
                className={filtering === 'video' && 'activeFilter'}
              >
                Video
              </li>
            </ul>
          </div>

          <div
            className="row justify-content-center gx-4 gy-4"
            style={{ marginTop: '20px' }}
          >
            {account !== undefined && account !== null ? (
              <div className="row">
                {userNfts.map((data, index) => (
                  <div key={index} className="col-md-3 col-sm-6">
                    <Card data={data} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                class="spinner-border text-info"
                role="status"
                style={{ marginLeft: '50%', marginTop: '50px' }}
              >
                <span
                  class="visually-hidden"
                  style={{ color: 'white' }}
                >
                  Loading...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
