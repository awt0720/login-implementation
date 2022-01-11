import type {NextPage} from "next";
import {useQuery} from "react-query";
import {fakeDBApiUrl} from "@common/url";
import {Row, Col} from "antd";

interface IFakeDb {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}

const Home = () => {
  const {isLoading, error, data, isFetching} = useQuery<IFakeDb[]>(
    "repoData",
    () => fetch(fakeDBApiUrl).then((res) => res.json()),
    {refetchOnWindowFocus: false}
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  const style = {background: "#0092ff", padding: "8px 0"};
  return (
    <>
      <h2 style={{textAlign: "center", marginBottom: "20px"}}> 판매 목록 </h2>
      <Row gutter={[16, 24]}>
        {!isLoading &&
          data.map((val) => (
            <Col className="gutter-row" span={8} key={val.id}>
              <div className="item-wrapper">
                <img src={val.image} alt="img" width="100px" height="150px" />
                <div className="tit">{val.title}</div>
                <div className="rating">
                  <div className="count">
                    누적 판매 개수 {val.rating.count}개
                  </div>
                  <div className="rate">평점 {val.rating.rate}</div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Home;
