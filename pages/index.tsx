import {useQuery} from "react-query";
import {fakeDBApiUrl} from "@/common/url";
import {Col, Row} from "antd";
import {StarFilled} from "@ant-design/icons";
import Link from "next/link";
import LoadingPage from "@/components/layout/loadingPage";
import {IFakeDb} from "@/types/fakeDb";

const MainPage = () => {
  const {isLoading, error, data} = useQuery<IFakeDb[]>(
    "repoData",
    () => fetch(fakeDBApiUrl).then((res) => res.json()),
    {refetchOnWindowFocus: false}
  );

  if (isLoading) return <LoadingPage />;

  if (error) return "An error has occurred: " + error;

  return (
    <div className="main-page-wrapper">
      <h2> 판매 목록 </h2>
      <Row gutter={[16, 24]}>
        {!isLoading &&
          data.map((val) => (
            <Link href={`/detail/${val.id}`} key={val.id}>
              <Col className="gutter-row" span={8}>
                <div className="item-wrapper">
                  <img src={val.image} alt="img" width="100px" height="150px" />
                  <div className="title-wrapper">
                    <div className="title">{val.title}</div>
                  </div>
                  <div className="rating">
                    <div className="count">
                      누적 판매 개수 {val.rating.count}개
                    </div>
                    <div className="rate">
                      평점 {val.rating.rate}
                      <StarFilled />
                    </div>
                  </div>
                </div>
              </Col>
            </Link>
          ))}
      </Row>
    </div>
  );
};

export default MainPage;
