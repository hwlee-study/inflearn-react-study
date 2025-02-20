import React, {useEffect} from 'react'
import {useAppDispatch} from '../../app/hooks'
import {fetchUerAsync, incrementAsync} from './counterSlice'

export default function Test() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(fetchUerAsync())
    // const promise = dispatch(incrementAsync(10))
    return () => {
      promise.abort()
    }
  }, [])

  return <div>Test</div>
}
