import { ethers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// external imports
import { useState } from 'react';
import {
  ChevronRight,
  Heart,
  ThreeDots
} from 'react-bootstrap-icons';
import profile from '../assets/img/crypto.png';
import Button from '../components/button/Button';
import Card from '../components/card/Card';
import Layout from '../components/layout/layout';
// external imports
import Error from '../components/utils/error';
import ShortenAddress from '../components/utils/shortenAddress';
import useBuyNft from '../hooks/useBuyNft';
import useFetchNFTs from '../hooks/useFetchNFTs';
import useNftDetails from '../hooks/useNftDetails';
import styles from '../styles/Details.module.css';



const Details = () => {
  const [showItem, setShowItem] = useState('history');
  const router = useRouter();
  const { nftDetails } = useNftDetails(router.query.id);
  const { nfts } = useFetchNFTs();
  const [handleBuy, { ownerOf, sold }] = useBuyNft();
  console.log(nftDetails)

  if (nftDetails === undefined) {
    return (
      <Layout>
        <Error />
      </Layout>
    );
  } else {
    const price = ethers.utils.formatEther(nftDetails.price, {
      pad: true,
    });
    return (
      <Layout>
        <div className="container">
          <div className={styles.detailsHeading}>
            <h2>Details</h2>
            <p>
              <Link href="/"><span style={{cursor: "pointer"}}>Home</span></Link> <ChevronRight /> Product Details
            </p>
          </div>

          <div className={styles.detailsSectoin}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className={styles.detailsImg}>
                  <img
                    src={nftDetails.image}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.rightDetails}>
                  <div className={styles.dtHeading}>
                    <h3>{nftDetails.name}</h3>
                    <div
                      style={{ display: 'flex' }}
                      className={styles.dtIcons}
                    >
                      <Button text={<Heart />} />
                      <Button text={<ThreeDots />} />
                    </div>
                  </div>
                  
                  <p style={{display: "inline-block"}}>
                    <ShortenAddress address={nftDetails.NFTaddress} />
                  </p>
                  <h4 style={{display: "inline-block", marginLeft: "20px", width: "40px"}}>{new Date(nftDetails.date).toLocaleDateString("en-US")}</h4>

                  <div className={styles.dtNames}>
                    <div className={styles.df} style={{alignItems: "center"}}>
                      <div className={styles.imageContainer}>
                        <Image src={profile} alt="" />
                      </div>
                      <div>
                        <p style={{marginTop: "3px"}}>
                          Category <br /> 1000000000
                        </p>
                        {/* <h5>
                          {' '}
                          <ShortenAddress
                            address={nftDetails.NFTaddress}
                          />
                        </h5> */}
                      </div>
                    </div>
                    <div className={styles.df}>
                      <div className={styles.imageContainer1}>
                        <Image src={profile} alt="" />
                      </div>
                      <div>
                        <p style={{marginTop: "3px"}}>Creator</p>
                        <h5 style={{marginTop: "3px"}}>
                          <ShortenAddress
                            address={nftDetails.creator}
                          />
                        </h5>
                      </div>
                    </div>
                    <div className={styles.df}>
                      <div className={styles.imageContainer1}>
                        <Image src={profile} alt="" />
                      </div>
                      <div>
                        <p style={{marginTop: "3px"}}>Owner </p>
                        {ownerOf === undefined ? (
                          <h5 style={{marginTop: "3px"}}>
                            <ShortenAddress
                              address={nftDetails.owner}
                            />
                          </h5>
                        ) : (
                          <h5>
                            <ShortenAddress address={ownerOf} />
                          </h5>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={styles.colorF}>
                    {nftDetails.description}
                  </span>
                  <br />

                  <h4 className={styles.priceSection}>
                    <p style={{margin: 0}}>Price : </p>
                    <span>{price} ETH</span>
                  </h4>

                  {sold === false ? (
                    <button
                      className={styles.buyNowBtn}
                      onClick={() =>
                        handleBuy(nftDetails.tokenID, price)
                      }
                    >
                      Buy Now
                    </button>
                  ) : (
                    <div className={styles.buyNowBtn}>Buy Now</div>
                  )}
                </div>

                <div className={styles.history}>
                  <div className={styles.buttons}>
                    <button
                      onClick={() => setShowItem('history')}
                      className={
                        showItem === 'history' ? 'activeitems' : ''
                      }
                    >
                      History
                    </button>
                    <button
                      onClick={() => setShowItem('info')}
                      className={
                        showItem === 'info' ? 'activeitems' : ''
                      }
                    >
                      Stats
                    </button>
                    <button
                      onClick={() => setShowItem('prov')}
                      className={
                        showItem === 'prov' ? 'activeitems' : ''
                      }
                    >
                      Attributes
                    </button>
                  </div>

                  <div className={styles.lists}>
                    {showItem === 'history' && (
                      <>
                        <div className={styles.list}>
                          <div className={styles.listLeft}>
                            <div className={styles.imageContainer}>
                              <Image src={profile} alt="" />
                            </div>
                            <div className={styles.listsItem}>
                              <h5>Lorem Ipsum</h5>
                              <p>8 hours ago</p>
                            </div>
                          </div>
                          <div className={styles.listsItem}>
                            <h5>4.82 ETH</h5>
                            <p>= $12.342</p>
                          </div>
                        </div>
                        <div className={styles.list}>
                          <div className={styles.listLeft}>
                            <div className={styles.imageContainer}>
                              <Image src={profile} alt="" />
                            </div>
                            <div className={styles.listsItem}>
                              <h5>Lorem Ipsum</h5>
                              <p>8 hours ago</p>
                            </div>
                          </div>
                          <div className={styles.listsItem}>
                            <h5>4.82 ETH</h5>
                            <p>= $12.342</p>
                          </div>
                        </div>
                      </>
                    )}

                    {showItem === 'info' && (
                      <>
                        <div style={{ padding: '5px' }}>
                          <div className={styles.list}>
                            {nftDetails.AGILITY && (
                              <>
                                <div className={styles.listLeft}>
                                  <div className={styles.listsItem}>
                                    <h5>
                                      <img
                                        src={nftDetails.image}
                                        style={{
                                          width: '30px',
                                          height: '30px',
                                          marginRight: '10px',
                                        }}
                                      />
                                      AGILITY
                                    </h5>
                                  </div>
                                </div>
                                <div
                                  className={styles.listsItem}
                                  style={{ marginLeft: '50px' }}
                                >
                                  <h5>{nftDetails.AGILITY}</h5>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ padding: '5px' }}>
                          <div className={styles.list}>
                            {nftDetails.BREED_COUNT && (
                              <>
                                <div className={styles.listLeft}>
                                  <div className={styles.listsItem}>
                                    <h5>
                                      <img
                                        src={nftDetails.image}
                                        style={{
                                          width: '30px',
                                          height: '30px',
                                          marginRight: '10px',
                                        }}
                                      />
                                      BREED_COUNT
                                    </h5>
                                  </div>
                                </div>
                                <div
                                  className={styles.listsItem}
                                  style={{ marginLeft: '50px' }}
                                >
                                  <h5>{nftDetails.BREED_COUNT}</h5>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ padding: '5px' }}>
                          <div className={styles.list}>
                            {nftDetails.HEALTH && (
                              <>
                                <div className={styles.listLeft}>
                                  <div className={styles.listsItem}>
                                    <h5>
                                      <img
                                        src={nftDetails.image}
                                        style={{
                                          width: '30px',
                                          height: '30px',
                                          marginRight: '10px',
                                        }}
                                      />
                                      HEALTH
                                    </h5>
                                  </div>
                                </div>
                                <div
                                  className={styles.listsItem}
                                  style={{ marginLeft: '50px' }}
                                >
                                  <h5>{nftDetails.HEALTH}</h5>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ padding: '5px' }}>
                          <div className={styles.list}>
                            {nftDetails.LUCK && (
                              <>
                                <div className={styles.listLeft}>
                                  <div className={styles.listsItem}>
                                    <h5>
                                      <img
                                        src={nftDetails.image}
                                        style={{
                                          width: '30px',
                                          height: '30px',
                                          marginRight: '10px',
                                        }}
                                      />
                                      LUCK
                                    </h5>
                                  </div>
                                </div>
                                <div
                                  className={styles.listsItem}
                                  style={{ marginLeft: '50px' }}
                                >
                                  <h5>{nftDetails.LUCK}</h5>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ padding: '5px' }}>
                          <div className={styles.list}>
                            {nftDetails.STAMINA && (
                              <>
                                <div className={styles.listLeft}>
                                  <div className={styles.listsItem}>
                                    <h5>
                                      <img
                                        src={nftDetails.image}
                                        style={{
                                          width: '30px',
                                          height: '30px',
                                          marginRight: '10px',
                                        }}
                                      />
                                      STAMINA
                                    </h5>
                                  </div>
                                </div>
                                <div
                                  className={styles.listsItem}
                                  style={{ marginLeft: '50px' }}
                                >
                                  <h5>{nftDetails.STAMINA}</h5>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ padding: '5px' }}>
                          <div className={styles.list}>
                            {nftDetails.TIER && (
                              <>
                                <div className={styles.listLeft}>
                                  <div className={styles.listsItem}>
                                    <h5>
                                      <img
                                        src={nftDetails.image}
                                        style={{
                                          width: '30px',
                                          height: '30px',
                                          marginRight: '10px',
                                        }}
                                      />
                                      TIER
                                    </h5>
                                  </div>
                                </div>
                                <div
                                  className={styles.listsItem}
                                  style={{ marginLeft: '50px' }}
                                >
                                  <h5>{nftDetails.TIER}</h5>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ padding: '5px' }}>
                          <div className={styles.list}>
                            {nftDetails.WEIGHT && (
                              <>
                                <div className={styles.listLeft}>
                                  <div className={styles.listsItem}>
                                    <h5>
                                      <img
                                        src={nftDetails.image}
                                        style={{
                                          width: '30px',
                                          height: '30px',
                                          marginRight: '10px',
                                        }}
                                      />
                                      WEIGHT
                                    </h5>
                                  </div>
                                </div>
                                <div
                                  className={styles.listsItem}
                                  style={{ marginLeft: '50px' }}
                                >
                                  <h5>{nftDetails.WEIGHT}</h5>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {showItem === 'prov' && (
                      <div style={{ padding: '5px' }}>
                        {nftDetails.attributes?.map(
                          (attribute, id) => (
                            <div className={styles.list} key={id}>
                              {attribute.trait_type && (
                                <>
                                  <div className={styles.listLeft}>
                                    <div className={styles.listsItem}>
                                      <h5>
                                        <img
                                          src={nftDetails.image}
                                          style={{
                                            width: '30px',
                                            height: '30px',
                                            marginRight: '10px',
                                          }}
                                        />
                                        {attribute.trait_type}
                                      </h5>
                                    </div>
                                  </div>
                                  <div
                                    className={styles.listsItem}
                                    style={{ marginLeft: '50px' }}
                                  >
                                    <h5>{attribute.value}</h5>
                                  </div>
                                </>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />

          <h5 className={styles.title}>Related Items</h5>
          <br />
          <div className="row">
            {nfts.map((data, index) =>
              index < 4 ? (
                <div key={index} className="col-md-3 col-sm-6">
                  <Card data={data} />
                </div>
              ) : (
                ''
              )
            )}
          </div>
          <br />
          <br />
          <div className={styles.wf}>
            <button className={styles.loadMoreBtn}>Load More</button>
          </div>
        </div>
      </Layout>
    );
  }
};

export default Details;
