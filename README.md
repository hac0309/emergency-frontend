# emergency-frontend

<!-- 네이버 로그인 토큰 발급 -->
<!-- 1번 입력 순서 상관X -->
<!-- 1. Param -->
https://nid.naver.com/oauth2.0/token
code={인가코드}&state={client-secret}&client_id={client-id}&client_secret={client-secret}&grant_type=authorization_code

<!-- 2. Header -->
https://openapi.naver.com/v1/nid/me
Authorization Bearer {access_token}

<!-- 카카오 로그인 토큰 발급 -->
<!-- 1. Param -->
https://kauth.kakao.com/oauth/token
code={인가코드}&client_id={client-id}&redirect_uri={REDIRECT_URI}&grant_type=authorization_code

<!-- 2. Header -->
https://kapi.kakao.com/v2/user/me
https://kapi.kakao.com/v1/user/access_token_info
Authorization Bearer {access_token}