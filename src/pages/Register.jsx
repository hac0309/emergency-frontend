import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterContainer = styled.div`
  /* width: 100%; */
  max-width: 1440px;
  margin: 0 auto;
  background-color: #5fb393;
  min-height: 820px;
`;

const Autolayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 24px;
  width: 819px;
  height: 830px;
  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const Sublayout = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  gap: 24px;
  margin: 0 auto;

  position: absolute;
  width: 606px;
  height: 685px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const RegisterWhite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;
  isolation: isolate;

  width: 606px;
  height: 685px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Autobox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;

  color: #111111;

  /* width: 560px; */
  height: 82px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const CommonInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;

  width: 559px;
  height: 29px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const InfoStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 490px;
  height: 29px;

  /* flex: 1; */
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const CheckStyle = styled.div`
  margin: 0 auto;
  /* width: 50px; */
  /* height: 29px; */
  border-style: none;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 20px;

  color: #007aff;

  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`;

const CommonInput = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;

  font-size: 16px;

  width: 100%;
  height: 45px;

  background: #ffffff;
  border: 1px solid rgba(145, 145, 145, 0.5);
  border-radius: 8px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const CommonBtn = styled.button`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;

  width: 558px;
  height: 45px;

  background: #5fb393;
  border: none;
  border-radius: 8px;

  flex: none;
  order: 5;
  align-self: stretch;
  flex-grow: 0;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;

  color: #ffffff;

  &:hover {
    background: #5fb393;
    color: black;
    transition: 0.7s;
  }
`;

function Register() {
  const [formData, setFormData] = useState({
    memId: "",
    memPwd: "",
    memName: "",
    memEmail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e.target);

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // console.log(formData);
    // setFormData('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 아이디와 비밀번호에 대한 검증 로직 추가
    const idPattern = /^[a-z0-9]{6,17}$/;
    const pwdPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;

    if (!idPattern.test(formData.memId)) {
      alert("아이디는 6~17자리의 소문자와 숫자로만 구성되어야 합니다.");
      return;
    }

    if (!pwdPattern.test(formData.memPwd)) {
      alert("비밀번호는 영문과 숫자를 포함한 8~15자리로 구성되어야 합니다.");
      return;
    }

    if (
      !formData.memId ||
      !formData.memPwd ||
      !formData.memName ||
      !formData.memEmail
    ) {
      alert("빈칸이 존재합니다.");
      return;
    }

    axios
      .post("http://localhost:8080/register", formData)
      .then((response) => {
        alert("회원가입을 성공하였습니다.");
        navigate("/login");
      })
      .catch((error) => {
        console.error("회원가입 실패!", error);
        alert("회원가입을 실패하였습니다.");
      });
  };

  // useEffect(() => {
  //   axios.get('http://localhost:8080/register', {
  //     headers: {
  //       Authorization: `Bearer ${yourAuthToken}` // yourAuthToken은 실제 사용할 토큰입니다
  //     }
  //   })
  //     .then(response => {
  //       setGreeting(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the greeting!', error);
  //     });
  // }, []);

  return (
    <RegisterContainer>
      <Autolayout>
        <RegisterWhite>
          <Sublayout onSubmit={handleSubmit}>
            <Autobox>
              <CommonInfo>
                <InfoStyle>ID</InfoStyle>
                {/* <CheckStyle>중복체크</CheckStyle> */}
              </CommonInfo>
              <CommonInput
                type="text"
                name="memId"
                value={formData.memId}
                onChange={handleChange}
              />
            </Autobox>

            <Autobox>
              <CommonInfo>
                <InfoStyle>Password</InfoStyle>
                <CheckStyle>
                  영문, 숫자 포함 8~15자리로 입력해주세요.
                </CheckStyle>
              </CommonInfo>
              <CommonInput
                type="password"
                name="memPwd"
                value={formData.memPwd}
                onChange={handleChange}
              />
            </Autobox>

            <Autobox>
              <CommonInfo>
                <>Name</>
              </CommonInfo>
              <CommonInput
                type="text"
                name="memName"
                value={formData.memName}
                onChange={handleChange}
              />
            </Autobox>

            <Autobox>
              <CommonInfo>
                <InfoStyle>Email</InfoStyle>
                {/* <CheckStyle>중복체크</CheckStyle> */}
              </CommonInfo>
              <CommonInput
                type="text"
                placeholder="example@example.com"
                name="memEmail"
                value={formData.memEmail}
                onChange={handleChange}
              />
            </Autobox>

            {/* <Autobox>
                <CommonInfo>
                  <>Nick-Name</>
                </CommonInfo>
                <CommonInput type="text" name="memNick" value={formData.memNick} onChange={handleChange} />
              </Autobox> */}

            <>
              <CommonBtn type="submit" onClick={handleSubmit}>
                Sign Up
              </CommonBtn>
              <CommonBtn type="button" onClick={() => navigate("/login")}>
                Login Page
              </CommonBtn>
            </>
          </Sublayout>
        </RegisterWhite>
      </Autolayout>
    </RegisterContainer>
  );
}

export default Register;
