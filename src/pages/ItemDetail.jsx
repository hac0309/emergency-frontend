import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { selectMember } from "../features/member/memberSlice";


const DetailWarpper = styled.div`
  width: 1440px;
  margin: 0 auto;
  background-color: #fff;
  border-top: 20px solid #5FB393;
  border-bottom: 20px solid #5FB393;
  padding: 20px;
`;

const DetailContainer = styled.div`
  height: 600px;
  width: 100%;
  border-bottom: 1px solid black;
  display: flex;

  .img_warpper {
    width: 50%;
    margin: auto 0;
  }
  
  .content_warpper {
    width: 50%;
  }

  .title_container {
    width: 500px;
    height: 200px;
    border-bottom: 1px solid black;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px;
  }

  .title {
    font-size: 30px;
    font-weight: 600;
    color: #4d4d4d;
    text-align: left;
    line-height: 34px;
  }

  .price_warpper {
    display: flex;
    gap: 10px;
    margin: 0 auto;
    width: 500px;
    height: 96px;
    align-items: center;
  }

  .discount_rate {
    font-weight: 300;
    font-size: 32px;
    line-height: 38px;
    color: #FF0000;
  }

  .price {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #000000;
  }

  .strike_through {
    font-weight: 300;
    font-size: 32px;
    line-height: 38px;
    text-decoration-line: line-through;
    color: #707070;
  }

  .btn_container {
    width: 512px;
    height: 100px;
    margin: 40px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ImgEx = styled.img`
  width: 500px;
  height: 500px;
  background-color: #bbb;
`;

const ProductWarpper = styled.div`
  width: 512px;
  height: 126px;
  border: 1px solid #000000;
  border-radius: 18px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .btn_group {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 150px;
    height: 40px;
    border-radius: 8px;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 100%;
    font-size: 24px;
    cursor: pointer;
  }

  .count_area {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border: 1px solid black;
    font-size: 24px;
  }
`;

const StyledBtnWhite = styled.button`
  border: 2px solid #5FB393;
  width: 240px;
  height: 60px;
  background: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #5FB393;
  transition: 0.2s background ease-in;

  &:hover {
    background-color: #157347;
    color: #fff;
    border: 2px solid #157347;
  }
`;

const StyledBtn = styled.button`
  width: 240px;
  height: 60px;
  background: #5FB393;
  border-radius: 8px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #fff;
  transition: 0.2s background ease-in;
  border: none;

  &:hover {
    background: #157347;
  }
`;



function ItemDetail() {
  const [count, setCount] = useState(1);
  const [item, setItem] = useState([]);
  const { productId } = useParams();
  const member = useSelector(selectMember);

  useEffect(() => {
    try {
      axios.get(`http://localhost:8080/shops/detail?no=${productId}`)
      .then((res)=> {
        setItem(res.data);
      })
    } catch (error) {
      console.log(error);
    }
    

  }, []);
  

  const addCartItem = async () => {
    const token = localStorage.getItem("token");
    const memId = JSON.parse(localStorage.getItem("member")).memId;
    try {
    const result = await axios.post('http://localhost:8080/carts/add', {
        prodNo: productId,
        memberId: memId,
        prodCount: count
      }, {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      return result.data;
      // 장바구니 확인 모달 띄우기
    } catch (error) {
      console.error(error);
      console.log(memId);
    }
  };

  const handleDecrement = () => {
    if (count <= 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  }

  const handleIncrement = () => {
    setCount(count + 1);
  }


  const formatter = new Intl.NumberFormat('ko-KR');

  return (
    <DetailWarpper>
      <DetailContainer>
          <div className="img_warpper">
            <ImgEx src={item.imgpath}/>
          </div>
          <div className="content_warpper">
            <div className="title_container">
              <p className="title">{item.title}</p>
            </div>
            <div className="price_warpper">

              <p className="discount_rate">10%</p>
              <p className="price">{formatter.format(item.price)}원</p>
              <p className="strike_through">{formatter.format(item.price * 1.1)}</p>
            </div>

            <ProductWarpper>
              <div className="btn_group">
                <button type="button" className="btn" onClick={handleDecrement}>-</button>
                <div className="count_area">{count}</div>
                <button type="button" className="btn" onClick={handleIncrement}>+</button>
              </div>
              <div>
                <p className="price">{formatter.format( count * item.price)}원</p>
              </div>
            </ProductWarpper>
            <div className="btn_container">
              <StyledBtnWhite onClick={addCartItem}>장바구니 담기</StyledBtnWhite>
              {/* 장바구니로 이동하겠냐는 모달창 띄우기 */}

              <StyledBtn>바로 구매하기</StyledBtn>
              {/* 장바구니창? 혹은 구매창 띄우기 */}

            </div>
          </div>

      </DetailContainer>
          <img src={item.detailImgpath} alt={item.title} />
    </DetailWarpper>
  );
};

export default ItemDetail;