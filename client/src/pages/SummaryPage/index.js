import React, { useContext, useState } from 'react'
import { OrderContext } from '../../context/OrderContext';

const SummaryPage = ({ setStep }) => {

  const [checked, setChecked] = useState(false);
  const [orderDetails] = useContext(OrderContext);
  
  const productArray = Array.from(orderDetails.products);
  const productList = productArray.map(([key, value]) => (
    <li key={key} className="summaryItem">
      <span className="itemName">{key}</span>
      <span className="itemQuantity">{value}개</span>
    </li>
  ))

  const hasOptions = orderDetails.options.size > 0;
  let optionsDisplay = null;

  if (hasOptions) {
    const optionsArray = Array.from(orderDetails.options.keys());
    const optionList = optionsArray.map((key) => (
      <li key={key} className="summaryItem">
        <span className="itemName">{key}</span>
        <span className="itemQuantity">선택됨</span>
      </li>
    ))
    optionsDisplay = (
      <div className="optionsSummary">
        <h2 className="appleSubtitle">추가 옵션</h2>
        <ul className="summaryList">{ optionList }</ul>
      </div>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(2);
  }

  return (
    <div className="summaryPageContainer">
      <div className="summaryPageContent">
        <div className="summaryHeader">
          <h1 className="appleTitle">주문 확인</h1>
          <p className="appleText">주문 내용을 확인해주세요</p>
        </div>
        
        <div className="summaryCard">
          <div className="productsSummary">
            <h2 className="appleSubtitle">상품 목록</h2>
            <ul className="summaryList">
              {productList}
            </ul>
          </div>
          
          {optionsDisplay}
          
          <div className="totalSection">
            <div className="totalRow">
              <span>상품 총액</span>
              <span>₩{orderDetails.totals.products.toLocaleString()}</span>
            </div>
            {hasOptions && (
              <div className="totalRow">
                <span>옵션 총액</span>
                <span>₩{orderDetails.totals.options.toLocaleString()}</span>
              </div>
            )}
            <div className="totalRow totalFinal">
              <span>총 결제금액</span>
              <span>₩{orderDetails.totals.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="confirmForm">
          <div className="confirmCheckbox">
            <input
              type="checkbox"
              checked={checked}
              id="confirm-checkbox"
              className="appleCheckbox"
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label htmlFor='confirm-checkbox' className="confirmLabel">
              주문하려는 것을 확인하셨나요?
            </label>
          </div>
          
          <button 
            disabled={!checked} 
            type='submit'
            className={`appleButton confirmButton ${!checked ? 'disabled' : ''}`}
          >
            주문 확인
          </button>
        </form>
      </div>
    </div>
  )
}

export default SummaryPage