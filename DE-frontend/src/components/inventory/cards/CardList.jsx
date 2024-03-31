import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CardList.css";

// OrderCard component representing each card
const OrderCard = ({
  iconClass,
  bgColor,
  title,
  totalOrders,
  completedOrders,
}) => (
  <div className={`col-md-4 col-xl-3`}>
    <div className={`card bg-${bgColor} order-card`}>
      <div className="card-block">
        <h3 className="m-b-20">{title}</h3>
        <h2 className="text-right">
          <i className={`fa ${iconClass} f-left`}></i>
          <span style={{ fontSize: '20px' }}>{totalOrders}</span>
        </h2>
        <p className="m-b-0">
          Inventory Records<span className="f-right">{completedOrders}</span>
        </p>
      </div>
    </div>
  </div>
);

// OrderCardList component to render list of OrderCard components
const CardList = () => {
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [stockStatus, setStockStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/inventory/stockValueChart"
        );
        const total = response.data.reduce(
          (acc, item) => acc + item.stockPrice,
          0
        );
        setTotalStockValue(total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStockStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inventory/stockStatus');
        setStockStatus(response.data);
      } catch (error) {
        console.error('Error fetching stock status:', error);
      }
    };
  
    fetchStockStatus();
  }, []);

  const formattedTotalStockValue = totalStockValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'LKR'
  });

  const orderCards = [
    {
      iconClass: "fa-cart-plus",
      bgColor: "c-blue",
      title: "Stock Value",
      totalOrders: formattedTotalStockValue,
      completedOrders: 321,
    },
    {
      iconClass: "fa-rocket",
      bgColor: "c-green",
      title: "Variations",
      totalOrders: 486,
      completedOrders: 322,
    },
    {
      iconClass: "fa-refresh",
      bgColor: "c-yellow",
      title: "In Stocks",
      totalOrders: stockStatus['In Stocks'] || 'Loading...', // Display 'Loading...' if data isn't fetched yet,
      completedOrders: 323,
    },
    {
      iconClass: "fa-credit-card",
      bgColor: "c-pink",
      title: "Low Stocks",
      totalOrders: stockStatus['Low Stocks'] || 'Loading...',
      completedOrders: 324,
    },
  ];

  return (
    <div className="flex-wrapper">
    <div className="container">
      <div className="row">
        {orderCards.map((card, index) => (
          <OrderCard
            key={index}
            iconClass={card.iconClass}
            bgColor={card.bgColor}
            title={card.title}
            totalOrders={card.totalOrders}
            completedOrders={card.completedOrders}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default CardList;
