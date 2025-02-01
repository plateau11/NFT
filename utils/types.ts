interface NFTItem {
  price: string;
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  tokenURI: string;
}

interface NFT {
  image: string;
  tokenId: string;
  name: string;
  owner: string;
  price: string;
  seller: string;
  description: string;
}
