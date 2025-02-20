### 특징

- Redux 로직을 작성하기 위한 공식 권장 접근 방식
- Redux를 더 쉽게 작성할 수 있도록 Redux의 필수 패키지와 기능을 포함하는데 작업을 단순화하여 실수를 방지 할 수 있다.

### CRA로 react 설정 시 Error 발생 해결

```bash
Installing template dependencies using npm...
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: react-redux-toolkit@0.1.0
npm ERR! Found: react@19.0.0
npm ERR! node_modules/react
npm ERR!   react@"^19.0.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^18.0.0" from @testing-library/react@13.4.0
npm ERR! node_modules/@testing-library/react
npm ERR!   @testing-library/react@"^13.0.1" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
```

- 문제점 : react 19버전과 충돌되는 library들이 충돌 되어 제대로 설치가 안됨
- 해결: React 18버전으로 다운그레이드

```bash
npm install react@18 react-dom@18 @testing-library/jest-dom@5.17.0 @testing-library/react@13.4.0 @testing-library/user-event@13.5.0 web-vitals
```

- react-redux 설정 안되어 있어서 error 발생 하여 설치

```bash
yarn add react-redux
```

- tsconfig.json 없어서 typescript global로 설정 후 초기화진행

```bash
yarn add typescript -g
ts --init // zsh: command not found: tsc 발생
brew install typescript
yarn add typescript -g
tsc --version
```

- but '--jsx' is not set.

  → compilerOptions에서 jsx 의 설정이 제대로 되어있지 않아 생긴 문제

- 문제점 : Could not find a declaration file for module 'react-dom/client’
  → index.js파일에 react-dom/client 모듈을 찾을 수 없다. - react-dom/client는 v18에 새로 생긴 모듈로 이 모둘을 이용해 DOM을 렌더링한다. - React 18 이전 버전은 react-dom모듈을 사용하여 렌더링 한다.
  → 이걸 회귀 시켜주면 된다.
- React 17과 18은 DOM 렌더링 코드가 17과 다르다.

  - https://stackoverflow.com/questions/71913692/module-not-found-error-cant-resolve-react-dom-client

  ### **React 17 example:**

  ```jsx
  import React from 'react'
  import {render} from 'react-dom'
  import './index.css'
  import App from './App'

  const root = document.getElementById('root')
  render(<App />, root)
  ```

  ### **React 18 example:**

  ```jsx
  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import './index.css'
  import App from './App'

  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  ```

- 해결방법
  - https://stackoverflow.com/questions/73826910/could-not-find-a-declaration-file-for-module-react-dom-client
  - `npm i @types/react@latest` 로 해결

---

# RTK 시작

## store 생성

<img width="161" alt="Image" src="https://github.com/user-attachments/assets/2f70ac7a-aea7-4161-9264-e9439a3d2c97" />

```jsx
import {configureStore} from '@redux/toolkit'

export const store = configureStore({
  reducer: {},
})
```

## React에 Redux 스토어 제공

- Store생성 후 `src/index` 에서 `react-redux` 의 `<Provider>` 태그로 Application을 감싸서 Store의 값을 사용할 수 있도록 props로 store을 전달 한다.

```jsx
import App from '/App'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	document.getElementById('root')
)
```

## Redux State Slice → Reducer역할

<img width="232" alt="Image" src="https://github.com/user-attachments/assets/95fcdaf7-c80f-4ba3-a06e-38fe64beb6cd" />

- `react-redux`의 `createSlice API`를 이용하여 state값을 변경한다.
- 필수 요소
  - slice 이름, 초기상태, 어떻게 변경하면 되는지 (reducer 함수)
- reducer 함수
  - Immer 라이브러리를 사용하여 불변성(immutable)상태를 지켜준다.
    → 따라서 직접적으로 State값을 변경하지 않는다.
    (리엑트도 state에 대한 불변성을 지켜줘야하는데 같은 원리)
    → 초안(draft)값을 직접 변경하는게 아닌 초안값을 복사한 값을 변경 후 변경된 복사값을 원래 draft값에 넣어준다. (eslint에서 for문 사용시 x값을 직접 변경할 때 에러나는 상황과 동일)

## Store에 Slice Reducer 추가

```jsx
import {configureStore} from '@redux/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

## 컴포넌트에서 사용방법

### useSelector() : store에서 데이터를 읽는 함수

### useDispatch : Action객체를 전달

```jsx
export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <button aria-label="Increment value" onClick={() => dispatch(increment())}>
      Increament
    </button>
  )
}
```

## createReducer Action 처리 방법 - Builder callback, Map Object

## Builder Callback

- `createReducer(initialState, builderCallback)`
- 타입스크립트 호환성으로 해당 방식을 선호한다.

### `builder.addCase(actoinCreator, reducer)`

- 액션 타입과 정확히 맵핑되는 케이스 리듀서를 추가하여 액션처리
- `addMatcher` , `addDefaultCase` 매서드보다 먼저 작성 해야한다.

### `builder.addMatcher(matcher, reducer)`

- 새로 들어오는 모든 액션에서 주어진 **패턴**과 일치하는지 확인 후 리듀서 실행

### `builder.addDefaultCase(reducer)`

- 기본 리듀서로 다른 케이스 리듀서나 매처리듀서가 실행되지 않았다면 실행
- `switch-case`문의 `default`와 동일

```jsx
const initialState = {}
const resetAction = createActon('reset-tracked-loading-state')

function isPendingAction(action) {
	return action.type.endWith('/pending')
}

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(resetAction, () => initialState)
		.addMatcher(isPendingAction, (state, action) => {
			state[action.meta.requestId] = 'pending'
		})
		.addMatcher(
			(action) => action.type.endWith('/rejected'),
			(state, action) => {
				state[action.meta.requestId] = 'rejected'
			}
		)
		.addMatcher(
			(action) => action.type.endWith('fulfilled')
			(state, action) => {
				state[action.meta.requestId] = 'fullfilled'
			}
		)
})
```

## Map Object

- `createReducer(initialState, actionMap, actionMatchers, defaultCaseReducer)`

### `initialState`

- 리듀서를 처음 호출할 때 사용해야하는 초기상태 값

### `actionsMap`

- 액션타입이 케이스 리듀서에 맵핑되어 있는 객체

### `actionMatchers`

- {matcher, reducer} 형식으로 정의된 배열
- 케이스 리듀서가 일치하는지 여부에 관계없이 모든 일치하는 리듀서가 순서대로 실행

### `defaultCaseReducer`

- 기본케이스 리듀서로 actionMap, actionMatcher이 실행되지 않은 경우 실행

```jsx
const isStringPayloadAction = (action) => typeof action.payload === 'string'

const lengthOfAllStringsReducer = createReducer(
  // initialState
  {strLen: 0, nonStringActions: 0},
  // actionMap
  {
    increment: (state, action) => state + action.payload,
    decrement: (state, action) => state - action.payload,
  },
  // actionMatchers
  [
    {
      matcher: isStringPayloadAction,
      reducer(state, action) {
        state.str.Len += action.payload.length
      },
    },
  ],
  // defaultCaseReducer
  (state) => {
    state.nonStringActions++
  },
)
```

## Prepare 콜백함수를 사용하여 Action 수정하기

```jsx
import { createAction, nanoid} from '@reduxjs/toolkit'

const addTodo = createAction('todo/add', function prepare(text) {
	return {
		payload: {
			text,
			id: nanoid(),
			createdAt: new Date().toISOString()
		}
	}
})

console.log(addTodo('Write more docs')
/*
{
	type: 'todo/add'
	payload: {
		text: 'Write more docs',
		id: '4AJvw.....',
		createAt: '....'
	}
}
*/
```

- action을 생성할 때 콜백함수를 이용하여 사용자 정의 값을 미리 추가해 주는 것

## createSlice

- createAction과 createReducer를 사용
- Prepare callback 함수를 이용하여 리듀서가 실행되기 전에 Action 값을 미리 넣어준다.

```jsx
const todoSlice = createSlice({
	name: 'todos'.
	initialState: [],
	reducers: {
		addTodo: {
			reducer: (state, action) => {
				state.push(action.payload)
			},
			prepare: (text) => {
				const id = nanoid()
				return {payload: {id, text}}
			}
		}
	}
})

export const { todos } = todoSlice.actions
export default todoSlice.reducer
```

## extraReducers

- createSlice에서 생성한 action type외에 다른 action type에 응답할 수 있다.
- extraReducers로 생성한 케이스 리듀서는 ‘외부’액션을 참조하기 위한 것으로, slice.actions에서 생성된 액션을 가지지 않는다.

```jsx
// createSlice 이외에 생성된 action
const incrementBy = createAction('incrementBy')
const decrementBy = createActoin('decrementBy')

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increemnt: (state) => state++,
    decrement: (state) => state--,
  },
  extraReducers: (builder) => {
    builder.addCase(incrementBy, (state, action) => {
      return state + action.payload
    })
    builder.addCase(decrementBy, (state, action) => {
      return state - action.payload
    })
  },
})
```

## createAsyncThunk

- createAction의 비동기 버전

### `function createAsyncThunk(type, payloadCreator, options)`

- Type
  - 비동기 요청의 생명주기를 나타내는 Redux action type 상수를 생성하는데 사용되는 문자열
  - ex) ‘users/requestStatus’ type인수는 다음 action type을 생성한다.
    → pending : ‘users/requestStatus/pending’, API요청 후 처리 중인 상태
    → fulfilled : ‘users/requestStatus/fulfilled’, API 요청 후 Response를 받은 상태
    → rejected : ‘users/requestStatus/rejected’, API 요청 후 처리가 되지 않고 Error 발생한 상태
- payloadCreator : promise를 반환하는 콜백함수

```jsx
const fetchUserById = createAsyncThunk(
	'user/fetchByIdStatus',
	async(userId, thunkAPI) => {
		const response = await userAPI.fetchById(userId)
		return response.data
	}
)

// 위의 FetchUserById의 Reducer 처리는 extraReducer로 처리한다.
const usersSlice = createSlice({
	reducers: {
		...
	},
	extreaReducers: (builder) => {
		builder.addCase(fetchUserById.pending, (state, action) => {
			...
		})
		builder.addCase(fetchUserById.fulfilled, (state, action) => {
			state.entities.push(action.payload)
		})
		builder.addCase(fetchUserById.rejected, (state, action) => {
			...
		})
	}
})

// 위 함수 호출 시
dispatch(fetchUserById(123))
```

### `thunkAPI`

- redux thunk 함수에 전달되는 모든 매개변수와 추가 옵션을 포함하는 객체
- 객체

  - `dispatch` : Redux스토어 dispatch 매서드
  - `getState` : Redux스토어 getState 매서드
  - `extra` : 설정 시 Thunk 미들웨어에 제공되는 ‘추가 인수’ →사용 가능한 경우
  - `requestId` : 해당 요청 시퀀스를 식별하기 위해 자동으로 생성된 고유 문자열 ID 값
  - `signal` : `AbortController.signal` 객체로 요청 처리 시 앱 로직의 다른 부분에서 취소가 필요한 것으로 표시 되었는지 확인
  - `rejectWithValue(value, [meta])`: rejectWithValue는 정의된 payload및 mata와 함께 거부된 response를 반환하기 위해 작업 생성자에서 throw 또는 반환 할 수 있는 함수
    → 어떤 request든 거부된 작업의 payload를 반환
    → meta 전달시 기존 rejectActon.meta와 병합
  - `fulfillWithValue(value, meta)`: fulfillWithValue는 fulfilledAction.meta에 추가할 수 있는 기능을 가지고 있는 동안 값으로 이행하기 위해 작업 생성자에서 반환할 수 있는 함수

  ### `rejectWithValue(value, [meta])` property 알아보기

  ```jsx
  const updateUser = createAsyncThunk(
    'users/update',
    async (userData, {rejectWithValue}) => {
      const {id, ...fields} = userData
      try {
        const response = await userAPI.updateById(id, fields)
        return response.data.user
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    },
  )

  // createSlice의 extraReducer에서 처리할 때
  builder.addCase(fetchUserById.rejected, (state, action) => {
    state.error = action.payload
  })
  // action.payload에 rejectWithValue함수에 넣은 error.response.data 값이다.
  ```

## thunk 요청 중지시키기

- useEffect의 unmount와 promise.abort()를 이용하여 thunk함수가 dispatch 되어 실행도 중 unmount되어 중지 되도록 한다.

```jsx
export default function Test() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(incrementAsync(10))
    return () => {
      promise.abort()
    }
  }, [])

  return <div>Test</div>
}

export default function App() {
  const [isTestOpen, setIsTestOpen] = useState(true)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => setIsTestOpen((prev) => !prev)}>Toggle</button>
        {isTestOpen && <Test />}
        <Counter />
      </header>
    </div>
  )
}
```

### abort()

- fetch 요청이 완료되기 전에 취소한다.
- [abort event mdn](https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement/abort_event)

## abort 이벤트 발생 시 request도 취소하기

### AbortController.signal 사용하기

```jsx
// counter/Test.tsx
export default function Test() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(fetchUerAsync())
    return () => {
      promise.abort()
    }
  }, [])

  return <div>Test</div>
}

// counter/counter.slice.ts
export const fetchUerAsync = createAsyncThunk(
  'counter/fetchUsers',
  async (_, thunkAPI) => {
    const controller = new AbortController()

    // abort 이벤트 바생 시 fetch 중단
    thunkAPI.signal.addEventListener('abort', () => {
      controller.abort()
    })

    await axios.get('https://jsonplaceholder.typicode.com/users', {
      signal: controller.signal,
    })
  },
)
```

- [AbortController.signal mdn](https://developer.mozilla.org/ko/docs/Web/API/AbortController/signal)
  → `AbortController` 인터페이스의 `signal` 읽기 전용 프로퍼티는 DOM요청과 통신하거나 취소하는데 사용하는 `AbortSignal` 객체의 인터페이스를 반환한다.
