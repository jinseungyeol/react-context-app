import React, { useContext } from 'react'
import Type from '../../components/Type'
import { OrderContext } from '../../context/OrderContext';

const OrderPage = ({ setStep }) => {
  const [orderData] = useContext(OrderContext);
  return (
    <div className="orderPageContainer">
      <div className="orderPageHeader">
        <h1 className="appleTitle">Travel Products</h1>
        <p className="appleText">원하는 상품과 옵션을 선택해주세요</p>
      </div>
      
      <div className="productsSection">
        <Type orderType='products' />
      </div>
      
      <div className="orderPageFooter">
        <div className="optionsSection">
          <h2 className="appleSubtitle">추가 옵션</h2>
          <Type orderType='options' />
        </div>
        
        <div className="orderSummary">
          <div className="priceCard">
            <h2 className="priceTitle">총 금액</h2>
            <div className="priceAmount">₩{orderData.totals.total.toLocaleString()}</div>
            <button 
              className="appleButton orderButton"
              onClick={() => setStep(1)}
            >
              주문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage