import {use} from 'react'

/**
 * props로 전달받은 Promise를 use API에 전달한다.
 * 해당 promise가 resolve될 때까지 Suspense로 래핑되어있으므로 fallback이 표시된다.
 * 참조링크 : https://ko.react.dev/reference/react/use#dealing-with-rejected-promises
 *
 * useEffect vs use
 * useEffect
 * - 경우 렌ㄴ더링 후에 작동하여 렌더링을 block하지 않는다.
 * - if문 안에서 useEffect를 실행 할 수 없다.
 * use
 * - 데이터 받아오기까지 렌더링을 지연시킨다.
 * - if문 안에서 실행 가능하다.
 */
function TextItem({message}) {
  let trueOrFalse = true
  let text = 'default text'
  if (trueOrFalse) {
    text = use(message)
  }
  return <h1>{text}</h1>
}

export default TextItem
