import styled from 'styled-components'

function Footer() {
  const FooterContainer = styled.footer`
    width: 100%;
    padding: 40px 0;
    border-top: 1px solid rgb(25, 25, 25);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
    @media (max-width: 769px) {
      padding: 20px 20px 50px 20px;
    }
  `

  const FooterLinkContainer = styled.div`
    width: 500px;

    @media (max-width: 768px) {
      width: 100%;
    }
  `

  const FooterLinkContent = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 35px;

    @media (max-width: 768px) {
      margin-top: 26px;
    }
  `

  const FooterLink = styled.a`
    color: gray;
    font-size: 14px;
    width: 110px;
    margin-bottom: 21px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      font-size: 14px;
      margin-bottom: 16px;
    }
  `

  return (
    <FooterContainer>
      <FooterLinkContainer>
        <h1 className="text-gray-500 text-lg">넷플릭스 대한민국</h1>
        <FooterLinkContent>
          <FooterLink href="https://help.netflix.com/ko/node/412">
            넷플릭스 소개
          </FooterLink>
          <FooterLink href="https://help.netflix.com/ko">고객 센터</FooterLink>
          <FooterLink href="https://help.netflix.com/ko/">
            미디어 센터
          </FooterLink>
          <FooterLink href="https://help.netflix.com/legal/termsofuse">
            이용 약관
          </FooterLink>
          <FooterLink href="https://help.netflix.com/legal/privacy">
            개인정보
          </FooterLink>
          <FooterLink href="https://help.netflix.com/legal/corpinfo">
            회사정보
          </FooterLink>
          <FooterLink href="https://help.netflix.com/ko/contactus">
            문의하기
          </FooterLink>
          <FooterLink href="https://help.netflix.com/legal/notices">
            법적 고지
          </FooterLink>
        </FooterLinkContent>
      </FooterLinkContainer>
      <div className="w-[500px] mt-[30px] md:mt-5">
        <h2 className="text-white text-sm text-center">
          Netflix RIGHTS RESERVED.
        </h2>
      </div>
    </FooterContainer>
  )
}
export default Footer
