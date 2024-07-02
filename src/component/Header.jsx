import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import styled from "styled-components";

import logoImg from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess, selectMember } from "../features/member/memberSlice";
import axios from "axios";

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #ffffff;
`;
const HeaderInner = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #ffffff;
  margin: 0 auto;
  font-size: 18px;
`;

const CustomedNavbar = styled(Navbar)`
  height: 100px;
`;

const LoginBtn = styled(Button)`
  box-sizing: border-box; 

  background-color: #ffffff;
  color: #5FB393;
  border: solid 2px #5FB393;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;

  &:hover {
    background: #157347;
    color: #ffffff;
    transition: 0.7s;
    border: 2px solid #157347;
  }
`;

const RegBtn = styled(Button)`
  background-color: #5FB393;
  border: none;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;
  width: 120px;
`;

const MyPageBtn = styled(Button)`
  background-color: #5FB393;
  border: none;
  font-weight: 600;
  border-radius: 24px;
  height: 48px;
  font-size: 16px;
  width: 120px;
`;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(selectMember);

  const handleMyPageClick = () => {
    navigate('/mypage');
  }

  const handleRegisterClick = () => {
    navigate('/register');
  }

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.get(`http://localhost:8080/logout`, {
      headers: {
        Authorization: token
      }
    });
    console.log(result);

    // 전역 상태 초기화
    dispatch(logoutSuccess());
    // 로컬 스토리지 초기화
    localStorage.removeItem('member');
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <CustomedNavbar bg="white" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="#">
              <img src={logoImg} alt="logoImg" width="60px" onClick={() => navigate('/')}/>
            </Navbar.Brand>
            <Nav className="ml-auto" style={{ alignItems: 'center' }}>
              <Nav.Link href="#" className="align-self-center">나지금급해</Nav.Link>
              <Nav.Link className="ms-3 align-self-center" >화장실 등록</Nav.Link>
              <NavDropdown className="ms-3 align-self-center" title="게시판" id="navbarScrollingDropdown">
                <NavDropdown.Item className="mb-2 py-2 align-self-center">자유 게시판</NavDropdown.Item>
                <NavDropdown.Item className="mb-2 py-2 align-self-center">긴급 요청 게시판</NavDropdown.Item>
                <NavDropdown.Item className="py-2 align-self-center">뉴스 게시판</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#pricing" className="ms-3 align-self-center">포인트샵</Nav.Link>
              {member
              ? (
                  <>
                    <Nav.Link href="#" className="ms-4" style={{ textDecoration: 'underline' }} variant="success" onClick={handleMyPageClick}>{member.memId}님</Nav.Link>
                    <LoginBtn className="ms-3" variant="outline-succes" onClick={handleLogout}>로그아웃</LoginBtn>
                    <MyPageBtn className="ms-3" variant="success" onClick={handleMyPageClick}>마이페이지</MyPageBtn>  
                  </>
              )
              : (
                <>
                  <LoginBtn className="ms-4" variant="outline-success" onClick={() => {navigate('/login')}}>로그인</LoginBtn>
                  <RegBtn className="ms-3" variant="success" onClick={handleRegisterClick}>회원가입</RegBtn>  
                </>
              ) 
            }
            
            </Nav>
          </Container>
        </CustomedNavbar>
      </HeaderInner>
    </HeaderContainer>
  );
}

export default Header;
