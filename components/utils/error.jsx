import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'react-bootstrap-icons';
import styles from '../../styles/Details.module.css';

const Error = () => {
  return (
    <div className="container">
      <div className={styles.detailsHeading}>
        <h2>Details</h2>
        <p>
          <Link href="/"><span style={{cursor: "pointer"}}>Home</span></Link> <ChevronRight /> Product Details
        </p>
      </div>
      <div
        class="spinner-border text-info"
        role="status"
        style={{ marginLeft: '50%', marginTop: '50px' }}
      >
        <span class="visually-hidden" style={{ color: 'white' }}>
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Error;
