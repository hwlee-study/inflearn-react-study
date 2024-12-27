import { useEffect } from 'react'

function useOnClickOutSide(ref, handler) {
  useEffect(() => {
    const shouldExecuteHandler = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        // ref를 추가한 DOM이 없거나,
        // mouse로 클릭한 DOM의 객체가 ref DOM(자식 DOM까지 포함) 이라면 return
        return
      }
      handler()
    }
    document.addEventListener('mousedown', shouldExecuteHandler)
    document.addEventListener('touchstart', shouldExecuteHandler)
    return () => {
      document.removeEventListener('mousedown', shouldExecuteHandler)
      document.removeEventListener('touchstart', shouldExecuteHandler)
    }
  }, [ref, handler])
}
export default useOnClickOutSide
