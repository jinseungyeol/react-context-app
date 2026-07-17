import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";

const CompletePage = ({ setStep }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderData] = useContext(OrderContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData]);

  const orderCompleted = async (orderData) => {
    // 데모 빌드: 서버 없이 주문 처리를 시뮬레이션 (실제 Express API는 server/ 참고)
    await new Promise((resolve) => setTimeout(resolve, 600));
    const orderNumber = Math.floor(Math.random() * 1000000);
    setOrderHistory((prev) => [
      ...prev,
      { price: orderData.totals.total, orderNumber },
    ]);
    setLoading(false);
  };

  const orderTable = orderHistory.map((item) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>₩{item.price.toLocaleString()}</td>
    </tr>
  ));

  if (loading) {
    return (
      <div className="appleContainer">
        <div className="loadingContainer">
          <div className="loadingSpinner"></div>
          <p className="appleText">주문을 처리하고 있습니다...</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="appleContainer">
        <div className="completePageContent appleFadeIn">
          <div className="successIcon">✓</div>
          <h1 className="appleTitle">주문이 완료되었습니다</h1>
          <p className="appleText appleSpacingLarge">
            주문이 성공적으로 처리되었습니다. 감사합니다!
          </p>

          <div className="orderHistorySection">
            <h2 className="appleSubtitle">주문 내역</h2>
            <div className="tableContainer">
              <table className="appleTable">
                <thead>
                  <tr>
                    <th>주문 번호</th>
                    <th>총 금액</th>
                  </tr>
                </thead>
                <tbody>{orderTable}</tbody>
              </table>
            </div>
          </div>

          <div className="buttonContainer">
            <button className="appleButton" onClick={() => setStep(0)}>
              새로운 주문하기
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default CompletePage;
