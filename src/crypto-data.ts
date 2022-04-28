export type CryptoDataType = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string | null;
  explorer: string | null;
};

async function api<CryptoDataType>(url: string): Promise<CryptoDataType> {
  return fetch(url).then((response) => {
    return response.json() as Promise<CryptoDataType>;
  });
}

export const fetchCyptoData = (name: string) => {
  return api<{ data: CryptoDataType }>(
    `https://api.coincap.io/v2/assets/${name}`
  ).then(({ data }) => {
    return [data];
  });
};

export let errorResult: CryptoDataType = {
  id: '',
  rank: '',
  symbol: '',
  name: 'No Such Crypto',
  supply: '',
  maxSupply: null,
  marketCapUsd: '',
  volumeUsd24Hr: '',
  priceUsd: 'Price not available',
  changePercent24Hr: '',
  vwap24Hr: null,
  explorer: null
};
