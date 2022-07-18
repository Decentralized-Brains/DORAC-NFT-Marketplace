const ShortenAddress = ({ address, ...res }) => {
  if (address === undefined || address === null) {
    return null;
  } else {
    const splitAddress =
      address?.substr(0, 6) +
      `....` +
      address?.substr(address.length - 5, address.length - 1);
    return <div {...res}>{splitAddress}</div>;
  }
};
export default ShortenAddress;
