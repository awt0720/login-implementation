import React, {useState} from "react";
import {useQuery} from "react-query";
import {fakeDBApiUrl} from "@/common/url";
import {IFakeDb} from "@/types/fakeDb";
import {useRouter} from "next/router";
import {Rate} from "antd";
import {InputNumber} from "antd";
import {Button} from "antd";
import LoadingSkeleton from "@/components/loadingSkeleton";

const Detail = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const {isLoading, error, data} = useQuery<IFakeDb>(
    ["detail", router.query.id],
    () => fetch(`${fakeDBApiUrl}/${router.query.id}`).then((res) => res.json()),
    {refetchOnWindowFocus: false}
  );

  const onChange = (value: number) => {
    setQuantity(value);
  };

  const handleChangeQuantity = (type: string) => {
    if (type === "plus") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  if (isLoading || !data) return <LoadingSkeleton />;

  if (error) return "An error has occurred: " + error;

  return (
    !isLoading && (
      <div className="detail-page-wrapper">
        <div className="top">
          <span className="product-id">상품번호 {data?.id}</span>
          <span className="divider">|</span>
          <span className="url">단축 Url</span>
        </div>
        <div className="product-info-wrapper">
          <div className="image">
            {data.image && <img src={data.image} alt="main" width="100%" />}
          </div>
          <ul className="info">
            <li>
              <div className="tit">키테고리</div>
              {data?.category}
            </li>
            <li>
              <div className="tit desctiption">상품 설명</div>
              <p>{data?.description}</p>
            </li>
            <li>
              <div className="tit">가격</div>${data?.price}
            </li>
            <li>
              <div className="tit">총 판매 개수</div>
              {data?.rating?.count} 개
            </li>
            <li>
              <span className="tit rate">평점 </span>
              <Rate disabled defaultValue={data?.rating?.rate} />
            </li>
            <li className="input-wrapper">
              <span className="tit quantity-tit">수량</span>
              <div className="input">
                <Button onClick={() => handleChangeQuantity("plus")}>+</Button>
                <InputNumber min={1} value={quantity} onChange={onChange} />
                <Button onClick={() => handleChangeQuantity("minus")}>-</Button>
              </div>
            </li>
            <li className="basket">
              <Button className="basket-btn">장바구니</Button>
            </li>
            <li>
              <Button className="buy-btn">구매하기</Button>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default Detail;
