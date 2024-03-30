import React from 'react';
import "./CardList.css"
// OrderCard component representing each card
const OrderCard = ({ iconClass, bgColor, title, totalOrders, completedOrders }) => (
  <div className={`col-md-4 col-xl-3`}>
    <div className={`card bg-${bgColor} order-card`}>
      <div className="card-block">
        <h3 className="m-b-20">{title}</h3>
        <h2 className="text-right"><i className={`fa ${iconClass} f-left`}></i><span>{totalOrders}</span></h2>
        <p className="m-b-0">Inventory Records<span className="f-right">{completedOrders}</span></p>
      </div>
    </div>
  </div>
);

// OrderCardList component to render list of OrderCard components
const CardList = () => {
  const orderCards = [
    { iconClass: 'fa-cart-plus', bgColor: 'c-blue', title: 'Stock Value', totalOrders: "4800000", completedOrders: 321 },
    { iconClass: 'fa-rocket', bgColor: 'c-green', title: 'Variations', totalOrders: 486, completedOrders: 322 },
    { iconClass: 'fa-refresh', bgColor: 'c-yellow', title: 'In Stocks', totalOrders: 486, completedOrders: 323 },
    { iconClass: 'fa-credit-card', bgColor: 'c-pink', title: 'Low Stocks', totalOrders: 486, completedOrders: 324 }
  ];

  return (
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
  );
};

export default CardList;
