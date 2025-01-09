import {Suspense} from 'react'
import TextItem from './TextItem'

const getMessage = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('here is the server message')
    }, 2000)
  })
}

function UseHook() {
  /**
   * use hook 사용한 컴포넌트 사용 시
   * 서버컴포넌트 - <Suspense>, Promise 사용
   * 1. 부모 컴포넌트에서 해당 컴포넌트를 <Suspense></Suspense>로 감싸줘야한다.
   * 2. Suspense는 비동기 요청 후 fallback 부분을 보여줄 수 있도록 처리 한다.
   * 3. use hook을 사용 한 클라이언트 컴포넌트에 Promise를 처리하는 컴포넌트에 Props로 내려준다.
   * 클라이언트에서 생성된 Promise는 렌더링 할 때마다 다시 생성된다.
   * 서버 컴포넌트에서 클라이언트 컴포넌트로 전달된 Promise는 리렌더링 전반에 걸쳐 안정적이다.
   */

  return (
    <Suspense
      fallback={
        <p style={{fontSize: '35px', fontWeight: 'bold'}}>
          Downloading message...
        </p>
      }
    >
      <TextItem message={getMessage()} />
    </Suspense>
  )
}

export default UseHook
