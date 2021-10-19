import React, { useState, useEffect } from "react";
import millify from "millify";
import { Row, Col, Card } from "antd";
import { useGetExchangesQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 50;
  const { data: cryptoList, isFetching } = useGetExchangesQuery(count);
  // eslint-disable-next-line no-unused-vars
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(cryptoList.data.coins);

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm);
    });

    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return "Loading....";

  return (
    <>
      <div className="search-crypto">
        <input
          placeholder="Search Cryptocurrencies"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank} ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt={currency.name}
                    src={currency.iconUrl}
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
