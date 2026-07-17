import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Products from "./Products";
import Options from "./Options";
import ErrorBanner from "./ErrorBanner";
import { OrderContext } from "../context/OrderContext";

const Type = ({ orderType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orederData, updateItemCount] = useContext(OrderContext); //OrderContext js에서 가져오기

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      // 데모 빌드는 서버 응답을 정적 JSON으로 내장 (실제 Express API는 server/ 참고)
      const response = await axios.get(
        `${process.env.PUBLIC_URL}/data/${orderType}.json`
      );
      setItems(response.data);
    } catch (error) {
      setError(true);
    }
  };

  const ItemComponent = orderType === "products" ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, orderType)
      }
    />
  ));

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  const isProducts = orderType === "products";
  const title = isProducts ? "상품 선택" : "추가 옵션";
  const subtitle = isProducts
    ? "원하는 상품을 선택해주세요"
    : "추가로 필요한 옵션을 선택해주세요";

  return (
    <div className="typeContainer">
      <div className="typeHeader">
        <h2 className="appleSubtitle">{title}</h2>
        <p className="appleText">{subtitle}</p>
        <div className="typeTotal">
          총 금액: ₩{orederData.totals[orderType].toLocaleString()}
        </div>
      </div>

      <div
        className={`typeGrid ${isProducts ? "productsGrid" : "optionsGrid"}`}
      >
        {optionItems}
      </div>
    </div>
  );
};
export default Type;
