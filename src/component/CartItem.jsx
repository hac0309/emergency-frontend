import { IoCloseOutline } from "react-icons/io5";
import { IoIosCheckbox,IoIosCheckboxOutline } from "react-icons/io";
import styled from "styled-components";

const CartItemWrapper = styled.div`

display: flex;
justify-content: space-between;
align-items: center;
padding: 15px 0;
border-bottom: 1px solid #cdcdcd;

  .btn_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 116px;
    height: 24px;
    border-radius: 4px;
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
    height: 24px;
    border: 1px solid black;
    font-size: 18px;
  }
`;

const CartItemImg = styled.div`
  width: 150px;
  height: 150px;
  background-color: #5f5f5f;
`;

const StyledCheckbox = styled(IoIosCheckbox)`
  width: 35px;
  height: 35px;
  color: #5FB393;
  cursor: pointer;
`;

const StyledOutlinCheckbox = styled(IoIosCheckboxOutline)`
   color: #5FB393;
   width: 35px;
   height: 35px;
   cursor: pointer;
`;

const CartItemTitle = styled.div`
  width: 65px;
  font-weight: 700;
  font-size: 18px;
  line-height: 19px;
  text-align: center;
`;

const CartItemPrice = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const CloseBtn = styled(IoCloseOutline)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

function CartItem(props) {
  const { isChecked } = props;
  


  return (
    <CartItemWrapper>
      {isChecked ? <StyledCheckbox/> : <StyledOutlinCheckbox/>}

        <CartItemImg/> {/* 실제 이미지로 받아와서 변경 */}
        <CartItemTitle>가방에 쏘옥 넣고 다니는 물티슈 18개입</CartItemTitle>
      <div className="btn_wrapper">
        <button type="button" className="btn">-</button>
        <div className="count_area">1</div>
        <button type="button" className="btn">+</button>
      </div>
      <CartItemPrice>20,000원</CartItemPrice>
      <CloseBtn />
  </CartItemWrapper>
  );
};

export default CartItem;