import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import Typewriter from 'typewriter-effect';
import { topCollections } from '../assets/Database';
import Card from '../components/card/Card';
import Card1 from '../components/card1/Card1';
import Layout from '../components/layout/layout';
import useFetchNFTs from '../hooks/useFetchNFTs';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [filtering, setFiltering] = useState('all');
  const { nfts } = useFetchNFTs();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Layout home>
        <div className={`${styles.Home} container`}>
          <div className={styles.hero}>
            <div className={styles.heroTexts}>
              <h2>Discover, Find</h2>
              <h1>
                <Typewriter
                  options={{
                    strings: [
                      'Sell extraordinary',
                      'Sell Efficiently',
                    ],
                    autoStart: true,
                    loop: true,
                    wrapperClassName: 'heroH1',
                  }}
                />
              </h1>
              <h2>Monster NFTs</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing
                elit.
              </p>
              <br />
              <br />
              <div className={styles.heroButtons}>
                <button className="BBtn">Explore</button> &nbsp;
                &nbsp;
                <button className="GBtn">Create</button>
              </div>
            </div>
          </div>

          <div className={styles.topCollection}>
            <h2 className={styles.title}>
              Top Collection
              <span className={styles.viewAll}>
                <Link href="/about">
                  <span>
                    View all <ArrowRight />
                  </span>
                </Link>
              </span>
            </h2>
            <div className="row">
              {topCollections.map((data) => (
                <div key={data.id} className="col-md-3 col-sm-6">
                  <Card1 data={data} />
                </div>
              ))}
            </div>
          </div>

          <br />
          <br />

          <div className={styles.exploreProduct}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>Explore Product</h2>
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
            <div className="row justify-content-center gx-4 gy-4">
              {nfts
                .filter((nft) => {
                  if (nft.image !== undefined) {
                    return nft;
                  }
                })
                .map((nft, index) => (
                  <div key={index} className="col-md-3 col-sm-6" style={{padding: "17px"}}>
                    <Card data={nft} />
                  </div>
                ))}
            </div>
            <br />
            <br />
            <div className="row justify-content-center">
              <button className="BBtn" style={{ width: '200px' }}>
                Load More
              </button>
            </div>
          </div>
        </div>
      </Layout>

      {/* Bootstrap CDN */}
      <Script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
        integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
        crossorigin="anonymous"
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
        integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
        crossorigin="anonymous"
      ></Script>
    </>
  );
}
