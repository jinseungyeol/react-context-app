import { createContext, useEffect, useMemo, useState } from "react";

export const OrderContext = createContext(); //Type js에 넘겨주기

export function OrderContextProvider(props) {
  // 수량
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  // 금액
  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  // 개당 금액
  const pricePerItem = {
    products: 1000,
    options: 500,
  };

  const calculateSubtotal = (orderType, orderCounts) => {
    let optionCount = 0;
    for (const count of orderCounts[orderType].values()) {
      optionCount += count;
    }

    return optionCount * pricePerItem[orderType];
  };

  useEffect(() => {
    const productsTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total, //total : total 이면 total만 써도 됨.
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCounts };

      const orderCountsMap = newOrderCounts[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCounts(newOrderCounts);
    }

    return [{ ...orderCounts, totals }, updateItemCount]; //orderCounts에 totals를 추가한 새로운 객체
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}

//props.chilren -> index.js 에 있는 App 컴포넌트임
