import { useEffect, useState } from "react";
import styled from "styled-components";
const BASE_URL = "http://localhost:9000";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const FetchfoodData = async () => {
      setLoading(true);
      try {
        const responce = await fetch(BASE_URL);
        const json = await responce.json();
        setData(json);
        setFilterData(json);
        setLoading(false);
        console.log(json);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    FetchfoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setFilterData(null);
    }

    const filter = data.filter((elem) =>
      elem.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilterData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter);
    setSelectedBtn(type);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading.....</div>;

  console.log(data);

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search any item"
            />
          </div>
        </TopContainer>
        <ButtonContainer>
          <Button onClick={() => filterFood("all")}>All</Button>
          <Button onClick={() => filterFood("breakFast")}>BreakFast</Button>
          <Button onClick={() => filterFood("dinner")}>Dinner</Button>
          <Button onClick={() => filterFood("lunch")}>Lunch</Button>
        </ButtonContainer>
        <CardWrapperContainer>
          <CardsContainer>
            {filterData?.map((item) => {
              return (
                <Cards key={item.name}>
                  <div className="MainContainer">
                    <div className="topSection">
                      <div className="imageConainer">
                        <img src={BASE_URL + item.image} alt="random" />
                      </div>
                      <div className="HeadingContainer">
                        <h1>{item.name}</h1>
                        <p>{item.text}</p>
                      </div>
                    </div>

                    <div className="bottomsection">
                      <Button>${item.price}</Button>
                    </div>
                  </div>
                </Cards>
              );
            })}
          </CardsContainer>
        </CardWrapperContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  height: 140px;

  .search {
    input {
      width: 285px;
      height: 40px;
      border: 1px solid #ff0909;
      font-size: 15px;
      padding-left: 10px;
    }
  }
`;
const ButtonContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 50px;
  padding: 30px;
`;
const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  gap: 10px;
  color: white;
  cursor: pointer;
`;
const CardWrapperContainer = styled.div`
  background-image: url("/bg.png");
  background-size: cover;
  height: calc(100vh - 290px);
  position: relative;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  column-gap: 18px;
  width: 1060px;
  height: 366px;
  position: absolute;
  left: calc(50% - 1060px / 2);
  top: calc(50% - 366px / 2 - 24px);
`;

const Cards = styled.div`
  width: 340px;
  height: 167px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.66px solid;

  border-image-source: radial-gradient(
      80.69% 208.78% at 108.28% 112.58%,
      #eabfff 0%,
      rgba(135, 38, 183, 0) 100%
    ),
    radial-gradient(
      80.38% 222.5% at -13.75% -12.36%,
      #98f9ff 0%,
      rgba(255, 255, 255, 0) 100%
    );

  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);

  border-radius: 20px;

  display: flex;
  padding: 8px;

  .MainContainer {
    display: flex;
    flex-direction: column;
    .topSection {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;

      .imageConainer {
        img {
          height: 120px;
        }
      }

      .HeadingContainer {
        display: flex;
        flex-direction: column;
        gap: 20px;
        h1 {
          font-size: 20px;
        }
        p {
          font-size: 12px;
        }
      }
    }
    .bottomsection {
      display: flex;
      justify-content: flex-end;
    }
  }
`;
