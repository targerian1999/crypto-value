import * as React from 'react';
import { fetchCyptoData, CryptoDataType, errorResult } from './crypto-data';

type FormProps = {
  onSubmit: (name: string) => void;
};

const Form = ({ onSubmit }: FormProps) => {
  const [value, setValue] = React.useState('bitcoin');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="crypto-input">
        <label htmlFor="name-of-crypto">Name of Cryptocurrency</label>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          id="name-of-crypto"
        />
      </div>
      <input type="submit" value="Fetch Crypto Data" />
    </form>
  );
};

const Data = ({ crypto }: { crypto: CryptoDataType }) => {
  return (
    <article className="crypto-data">
      {crypto && (
        <div>
          <h3>{crypto.name}</h3>
          <p>Price: {crypto.priceUsd}</p>
        </div>
      )}
      {!crypto && (
        <div>
          <h3>{errorResult.name}</h3>
          <p>{errorResult.priceUsd}</p>
        </div>
      )}
    </article>
  );
};

const Application = () => {
  const [cryptos, setCryptos] = React.useState<CryptoDataType[]>([]);

  const handleSubmit = (n: string) => {
    fetchCyptoData(n).then((crypto) => {
      setCryptos(crypto);
    });
  };

  return (
    <main>
      <Form onSubmit={handleSubmit} />
      <section>
        {cryptos.map((crypto, index) => (
          <Data key={index} crypto={crypto} />
        ))}
      </section>
    </main>
  );
};

export default Application;
