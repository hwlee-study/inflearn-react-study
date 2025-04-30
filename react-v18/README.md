### 브라우저 렌더링 원리 및 가상돔

#### 브라우저 렌더링 과정

- DOM tree 생성
  - 렌더 엔진이 HTML, CSS, Javascript를 읽어 파싱 후 어떤 페이지에 렌더링할지 결정
  - HTML > DOM / Javascript / CSS > CSSOM
- Render tree 생성
  - 브라우저가 DOM과 CSSOM 결합하는 곳
  - 화면에 표시되는 모든 노드의 콘텐츠 및 스타일 정보(최종 렌더링) 트리 출력
- Layout(Reflow)
  - 브라우저가 페이지에 표시되는 요소의 위치를 계산
- Paint
  - 실제 화면 그리기

#### 위 렌더링 과정의 문제점

- DOM 조작 비용이 크게 발생
  - 인터렉션에 의해 DOM 변화가 발생하면 그 때마다 Render tree가 생성되어 위 과정이 계속적으로 반복되는 비용이 크게 발생

#### 가상돔

- 인터렉션이 많이 발생했을 때 비용을 줄이는 방법 중 하나
- 실제돔과 가상돔 차이를 Diffing과증을 통해 발견, 바뀐 부분만 reconciliation(재조정) 과정을 거친다.
- 재조정과정은 변화된 부분이 많더라도 한번에 묶어서 실제 돔을 수정하여 처리한다.

### React설치 시 Node.js가 필요한 이유

- 브라우저에서 실행되는 코드라서 런타임시에는 필요없다.
- babel, webpack, 리로딩 등 주요 모듈들이 node를 사용하기 때문에 필요하다.

### Webpack

- 오픈소스 Javascript 모듈 번들러
- 여러개로 나뉘어진 파일을 하나의 Javascript코드로 압축 및 최적화하는 라이브러리
  - 압축하여 최적화하여 로딩에 대한 네트워크 비용을 줄일 수 있다.
- 번들러 과정 중 하나로 압축된 파일 즉, 모듈 단위로 개발이 가능하여 가독성과 유지보수가 쉽다.
- CRA로 React시작 시 만들어진 src폴더 안에 파일들을 읽어서 번들링을 한다.

### Babel

- 최신 자바스크립트 문법을 구형 브라우저에서도 구동할 수 있도록 변환 시켜주는 라이브러리

### Class Components vs Function Components

- 함수형 컴포넌트에서는 리엑트 생명주기를 사용할 수 없었는데, 16.8 Hooks를 통해 업데이트가 가능해졌다.
- 리엑트 생명주기
  - Mounting - react를 시작 했을 때 어떤 것을 하는 것
  - Updating - react를 시작하고 난 이후 어떤 것을 update
  - Unmounting - react components를 사용하지 않을 때

```jsx
/**
* class components life cycle 에시
*/
componentDidMount() {
	// 컴포넌트가 마운트 되었을 때 어떤 동작이 필요할 때 사용
	// ex. 컴포넌트가 마운트 되면 updateLists 함수 호출
	this.updateLists(this.props.id)
}

componentDidUpdate() {
	// 어떤 것을 update 할 때 사용
	if(prevProps.id !== this.props.id) {
		// ex. updateLists 함수를 호출 할 때
		// 사용되는 id 가 달라지면 다시 updateLists 호출
		this.updateLists(this.props.id)
	}
}

// updateLists 함수 정리
updateLists = (id) => {
	fetchLists(id).then((lists) => this.setState({
		lists
	}))
}

/**
* function components life cycle 에시
*/
useEffect(() => {
	fetchLists(id).then((repos) => {
		setRepos(repos)
	})
}, [id])
```

- Class Component에서 생명주기 사용 시
  componentDidMount(), componentDidUpdate(), componentWillUnmount() 모두 다르게 처리를 해줘야한다.
- Hook에서 생명주기 사용 시 useEffect안에서 모든 처리가 가능하다.

### Hook Component

- HOC 컴포넌트를 Custom React Hooks로 대체해서 수많은 Wrapper 컴포넌트를 줄이게 되었다.
- HOC 컴포넌트
  - Higher Order Component
  - 컴포넌트를 인자로 받아서 새로운 리엑트 컴포넌트를 리턴하는 함수
  - 화면에 재사용 가능한 로직만을 분리해서 component로 만들고, 재사용 불가능한 UI 같은 다른 부분들은 parameter로 받아서 처리 하는 방법

ex) user를 공통으로 사용 할 때

```jsx
// user을 가져오는 공통적인 부분을 HOC컴포넌트에 구현
function userHOC(Component) {
	return class userHOC extends React.component {
		state = {
			user: []
		}

		componentDidMount() {
			fetchUsers().then(users => {
				this.setState({users})
			})
		}

		render() {
			return (
				<Component
						{...this.props}
						{...this.state}
				/>
			)
		}
	}
}

// HOC가 필요한 컴포넌트에 감싸준다.
function Apage({user}) {
	// ...
}

export default userHOC(Apage);

function Bpage({user}) {
	// ...
}

export default userHOC(Bpage);
```

- User를 갖고오는 공통적인 부분은 HOC 컴포넌트에 넣어주고, 해당 **HOC 컴포넌트를 사용하는 컴포넌트에 감싸주면**! 인증을 위한 부분은 각 컴포넌트에 넣어주지 않아도 된다.
- 위의 코드의 문제점 : 수많은 wrapper을 만든다.
  ```jsx
  <LanguageHOC>
    <ThemeHOC>
      <AuthHOC>
        <Apage />
      </AuthHOC>
    </ThemeHOC>
  </LanguageHOC>
  ```

### Custom React Hooks로 위 코들 문제를 해결

```jsx
// users 데이터 조회
function useAuth() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers().then(users => {
				setState({users})
		})
	}, [])

	return users;
}

funtion Apage() {
	// 데이터 담아오기
	const [users] = useAuth();

	return (
		<div>
			A 페이지
			{users.map(({ name, url }) => (
				<div key={name}>
					<p>{name}, {url}</p>
				</div>
			))}
		</div>
	)
}
```

## 구조 분해 할당

- ES6에서 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 Javascript 표현식

### 객체 구조 분해 할당

```javascript
function unicon(uniconData) {
  const { accessory, animal, color, hairType } = uniconData
}
```

- 깊게 들어간 객체 구조 분해 할당

```javascript
const person = {
  name: 'Maya',
  age: 30,
  phone: '123',
  address: {
    zipcode: 1234,
    street: 'rainbow',
    number: 42,
  },
}

const {
  address: { zipcode, street, number },
} = person

console.log(zipcode, street, number) //1234 rainbow 42
```

```javascript
const studentDetails = {
  firstName: 'John',
  lastName: 'Mary',
}

// 'not given' 초기화 값 : firstName에 값이 없는 경우 사용
const { firstName: fName = 'not given', lastName } = studentDetails
console.log('fName : ', fName) //fName :  John
console.log('lastName : ', lastName) //lastName :  Mary
```

### 배열 구조 분해 할당

```javascript
const [a, b, ...rest] = [10, 20, 30, 40, 50]
console.log(rest) // [30, 40, 50]

const week = ['monday', 'tuesday', 'wednesday', 'thurseday', 'friday']
const [day1, day2, day3, day4, day5] = week
console.log(day3) // wednesday

const number = [1, 2, 3, 4, 5, 6]
// 6의 대한 값의 변수는 적어주지 않으면 구조분해 할당이 안된다.
const [, , three, , five] = number
console.log('three : ', three) // three : 3
console.log('five : ', five) // five : 5
```

### 객체 for문을 이용한 깊은 구조 분해 할당

```javascript
const people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith',
      sister: 'Samantha Smith',
    },
    age: 35,
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Norah Jones',
      father: 'Richard Jones',
      brother: 'Howard Jones',
    },
    age: 25,
  },
]

for (let {
  name: n,
  family: { father: f },
} of people) {
  console.log('Name: ', n, ', Father: ', f)
}

// Name: Mike Smith, Father: Harry Smith
// Name: Tom Jones, Father: Richard Jones
```

### ⚠️ CRA 경고

- npm run start 할 때 모듈 경고 발생

  > ⚠️ 모듈 경고

  <aside>
  One of your dependencies, babel-preset-react-app, is importing the
  "@babel/plugin-proposal-private-property-in-object" package without
  declaring it in its dependencies. This is currently working because
  "@babel/plugin-proposal-private-property-in-object" is already in your
  node_modules folder for unrelated reasons, but it may break at any time.
  babel-preset-react-app is part of the create-react-app project, which is not maintianed anymore. It is thus unlikely that this bug will ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to your devDependencies to work around this error. This will make this message go away.

  당신의 의존성 중 하나인 `babel-preset-react-app`이 `@babel/plugin-proposal-private-property-in-object` 패키지를 의존성에 선언하지 않고 가져오고 있습니다. 현재는 `@babel/plugin-proposal-private-property-in-object`가 다른 이유로 이미 `node_modules` 폴더에 있기 때문에 작동하고 있지만, 언제든지 중단될 수 있습니다.
  `babel-preset-react-app`은 더 이상 유지 관리되지 않는 `create-react-app` 프로젝트의 일부입니다. 따라서 이 버그가 수정될 가능성은 낮습니다. 이 오류를 해결하려면 `@babel/plugin-proposal-private-property-in-object`를 `devDependencies`에 추가하세요. 그러면 이 메시지가 사라질 것입니다.
  </aside>

* 원인
  - `babel-preset-react-app`이 `@babel/plugin-proposal-private-property-in-object` 패키지를 종송성 선언없이 가져와서 문제가 발생하는걸로 판단
* 해결 방법
  - `npm install --save-dev @babel/plugin-proposal-private-property-in-object --legacy-peer-deps`
  - `@babel/plugin-proposal-private-property-in-object`는 더이상 사용 X

### Drag and Drop 기능 추가

- HTML Drag & Drop API를 사용하여 드래그 기능 추가 가능
  → https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API
- react-beautiful-dnd 에 주요 기능이 사라지고, 개발 중단이 되어 추후 순수 HTML Drag & Drop API로 변경 필요
  → FIXME로 적어둠
- Array 복사, Array 얕은 복사, 깊은 복사 확인 필요

  ```jsx
  const newTodos = todos // 이렇게 하면 왜 안돼?

  const newTodos = [...todos] // 얕은복사? 깊은 복사?
  const newTodos = Array.from(todos) // 얕은 복사
  const newTodos = todos.slice() // 얕은 복사
  ```

### Javscript의 immutable vs mutable

![ immutable vs mutable](https://github.com/user-attachments/assets/f1ca58b9-0433-4e3c-9af8-bc0f22e5b6fb)

### 원시타입

- Boolean, String, Number, undefined, null, Symbol
- immutable한 값
- CallStack에 하나의 주소당 하나의 값을 저장
- ex. 원시타입은 같은 변수라하더라도 값이 달라지면 주소값이 달라진다.
  ```javascript
  // CallStack 한 주소에 Walter라는 값을 가진다.
  let userName = 'Walter'
  // 같은 변수에 값을 변경하여 넣게 되면,
  // 기존의 Walter가 가진 주소값이 아닌
  // Callstack에 새로운 주소값으로 John이 저장된다.
  userName = 'John'
  ```

### 참조타입

- Object, Array
- mutable한 값
- Heap의 한 주소에 객체 값을 저장 후 CallStack에 Heap에 저장된 주소값으로 저장한다.
- ex. 참조타입은 같은 주소값에 속성값은 변경 가능하다.
  따라서, **원본 데이터가 변경 될 수 있으므로 불변성을 지키도록 해주어야한다**.
  ```javascript
  // heap메모리 특정 주소에 ['1', '2', '3']값 저장한다.
  // 해당 주소값에 ['2', '3', '4']의 값을 다시 저장한다.
  let array = ['1', '2', '3']
  array = ['2', '3', '4']
  ```

### 불변성을 지켜야하는 이유

- 참조타입에서 객체나 배열의 값이 변할 때 원본데이터가 변경 되므로, 해당 값을 참조하고 있는 곳에서는 오류가 발생할 수 있어서 복잡도가 높아진다.
- 리엑트에서 가상돔을 이용하여 리얼돔과 다른 값만 업데이트 하는 특성이 있어, 불변성을 지켜줘야한다.

### 불변성을 지키는 방법

- 참조타입의 경우 불변성을 유지할 수 없어 새로운 배열을 반환하는 메소드를 사용한다.
  - spread operator, map, filter, slice, reduce
- 원본 데이터를 변경하는 메소드
  - splice, push

```javascript
const array = [1, 2, 3, 4]
const sameArray = array
array.push(5)
console.log(
  'array: ',
  array,
  ' sameArray: ',
  sameArray,
  ' array === sameArray: ',
  array === sameArray
)
// array: [1,2,3,4,5]
// sameArray: [1,2,3,4,5]
// array === sameArray: true

const array = [1, 2, 3, 4]
const differentArray = [...array, 5]
// console.log('array === differentArray: ', array === differentArray // false
// console.log('array: ', array) // array: [1, 2, 3, 4]
// console.log('differentArray: ', differentArray) // differentArray: [1, 2, 3, 4, 5
```

### 최적화 React.memo, useCallback, useMemo

### React.memo

- 분리된 컴포넌트의 렌더링으로 관련되지 않은 컴포넌트도 리렌더링 되는 것을 방지 할 때 사용
- ex. todo 예제에서,
  → Form 컴포넌트에 input을 이용하여 onChange로 todo값을 추가할 때, 타이핑 될 때마다 전체 컴포넌트가 리렌더링이 된다.
  → 여기서, App에 Form, Lists가 있어 Form의 리렌더링이 Lists와 Lists안에 List도 영향을 받으므로, 해당 컴포넌트들은 Form이 리렌더링 시 영향을 받지 않도록 하기위해서는
  → Lists, List컴포넌트를 React.memo로 감싸준다.
  → 감싸줄 때,

```jsx
// 이렇게 감싸줄 수가 없다.
export default function React.memo(List() {})

// function과 export를 분리, arrow함수에서만 사용가능
function List(){}
export default React.memo(List)
```

### useCallback

- 컴포넌트가 렌더링 될 때 안에 있는 함수도 재생성 된다.
- 따라서, 부모컴포넌트의 함수가 props로 내려주어 자식 컴포넌트에서 사용 시 부모가 리렌더링 되면, 자식도 리렌더링이 되면서, 함수도 다시 새롭게 만들어지게 되어 메모리 비용이 많이 발생한다.
- 이럴 때, useCallback의 dependency를 이용하여 특정 데이터나 상태값이 변경 될 때에만 사용한다면, 리렌더링을 방지 할 수 있고, dependency가 빈 배열이면, 최초 렌더링 할 때만 생성되고 해당 함수로 계속 사용하게 된다.

### useMemo

- Memoization
  → 비용이 많이 발생하는 함수 호출의 **결과를** 저장하고 동일한 입력이 다시 발생할 때 **캐시된 결과를 반환**하는 기술
- ex. compute가 복잡한 연산인 경우 성능이 안 좋아지고, UI지연현상도 발생하므로, useMemo를 통해 a, b값이 동일한 경우 컴포넌트가 렌더링 되더라도 계산을 다시 하지 않고, 이전 렌더링 때 저장한 값을 재활용 한다.

```jsx
function Component({ a, b }) {
  const result = useMemo(() => compute(a, b), [a, b])
  return <div>{result}</div>
}
```
