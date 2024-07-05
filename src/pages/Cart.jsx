import styled  from "styled-components";
import { IoIosCheckbox,IoIosCheckboxOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import CartItem from "../component/CartItem";
import axios from "axios";


const CartWarpper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 0;

  .cartlist_warpper {
    width: 100%;
    display: flex;
    margin: 20px;
    justify-content: space-between;
    
    .cartlist_warpper_left {
      width: 635px;
      border: 1px solid #fff;
      padding: 8px 20px;
      background: #FFFFFF;
      border: 1px solid #928F8F;
    }

    .cartlist_warpper_right {
      width: 500px;
      height: 379px;
      background: #FFFFFF;
      border: 1px solid #928F8F;
    }
  }

  .cartlist_btn_group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
    /* width: 50px; */
    height: 50px;

    .cartlist_btn_group_left {
      display: flex;
      
      .cursor-pointer {
        justify-content: center;
        align-items: center;
        display: flex;

        .select_all_btn {
          font-weight: 900;
          font-size: 22px;
          margin-left: 16px;
        }
      }

    }
    .cartlist_btn_group_right {
      display: flex;

      .btn_group {
        font-size: 22px;
        margin: 15px;
        font-weight: 300;
      }

      .cursor-pointer::before {
        content: "";
        display: block;
        width: 1px;
        height: 26px;
        background-color: #cccccc;
        position: absolute;
        right: 1040px;
      }
      .cursor-pointer:first-child::before {
        display: none;
      }
    }
  }
`;


const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  color: #FFFFFF;
  width: 1200px;
  text-align: start;
  padding: 0 30px;
  `;

const StyledCheckbox = styled(IoIosCheckbox)`
  width: 35px;
  height: 35px;
  color: #5FB393;
  `;

const StyledOutlinCheckbox = styled(IoIosCheckboxOutline)`
   color: #5FB393;
   width: 35px;
   height: 35px;
   `;





function Cart() {
  const [isChecked, setIsChecked] = useState(false);
  const [cartList, setCartList] = useState([]);
  
  const [selectedItems, setSelectedItems] = useState([]);
  

  const handleCheck = () => {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    const fetchCartList = async () => {
      try {
        const memId = JSON.parse(localStorage.getItem("member")).memId;
        const response = await axios.get(`http://localhost:8080/carts?id=${memId}`);
        setCartList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCartList();
  }, []);


  const onUpdateCount = (cartNo, newCount) => {
    const updatedCartList = cartList.map(item =>
      item.cartNo === cartNo ? { ...item, prodCount: newCount } : item
    );
    setCartList(updatedCartList);
  };



  return (
    <CartWarpper>
      <Title>장바구니</Title>
      <div className="cartlist_warpper">
        <div className="cartlist_warpper_left">

          {/* 체크박스, 전체 선택 */}
          <div className="cartlist_btn_group">
            <div className="cartlist_btn_group_left">
              <label className="cursor-pointer" onClick={handleCheck}>
                {isChecked ? <StyledCheckbox /> : <StyledOutlinCheckbox />}
                <p className="select_all_btn">{isChecked? '전체해체': '전체선택'}</p>
              </label>
            </div>
            <div className="cartlist_btn_group_right">
              <div className="btn_group cursor-pointer">선택 삭제</div>
              <div className="btn_group cursor-pointer">전체 삭제</div>
            </div>
          </div>

          {cartList && cartList.length > 0 && cartList.map((cartitem) => {
            return (
              <CartItem 
                key={cartitem.no} 
                cartitem={cartitem} 
                isChecked={isChecked}
                onUpdateCount={onUpdateCount}
                cartList={cartList}
                setCartList={setCartList}
              />
            );
          })}
        </div>

        <div className="cartlist_warpper_right">

        </div>
      </div>
    </CartWarpper>
  );
};

export default Cart;