## Composition(합성)

여러 개의 컴포넌트를 합쳐서 새로운 컴포넌트를 만드는 것을 의미함

Ex) airbnb -> 컴포넌트 A와 컴포넌트 B를 합쳐서 페이지 컴포넌트를 만들었으므로 컴포지션 즉, 합성을 사용했다고 볼 수 있음

<br />

### 조합 방법에 따라 나뉘는 컴포지션 사용 기법

## 1. Containment

: 하위 컴포넌트를 포함하는 형태의 합성 방법

- 사용 방법 : React 컴포넌트의 props에 기본적으로 들어있는 Children 속성을 사용하면 됨

    ```jsx
    function FancyBorder(props) {
        return (
            <div className={'FancyBorder FancyBorder-' + props.color}>
                {props.children}
            </div>
        );
    }

    React.createElement(
        type,
        [props],
        [...children]
    );
    ```
    - props.children을 사용하면 해당 컴포넌트의 하위 컴포넌트가 모두 children으로 들어오게 됨
    - [...children] : 왜 배열로 되어있냐?
        - 여러 개의 하위 컴포넌트를 가질 수 있기 때문에
    - 결과적으로 FancyBorder 컴포넌트는 자신의 하위 컴포넌트를 모두 포함하여 예쁜 테두리로 감싸주는 컴포넌트가 됨

    <br />

    - 실제로 FancyBorder 컴포넌트를 사용하는 예제
    ```jsx
    function WelcomeDialog(props) {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">
                    어서오세요
                </h1>
                <p className="Dialog-message">
                    우리 사이트에 방문하신 것을 환영합니다!
                </p>
            </FancyBorder>
        );
    }
    ```
    - WelcomeDialog 컴포넌트에서 FancyBorder 컴포넌트를 사용하고 있음
    - FancyBorder 컴포넌트로 감싸진 부분 안에는 h1 태그와 p 태그가 있고 이 두 개의 태그는 모두 FancyBorder 컴포넌트에 Children이라는 이름의 props로 전달됨
    - 결과적으로 파란색의 테두리로 모두 감싸지는 결과!

    <br />

    Q. 여러 개의 Childeren 집합이 필요한 경우에는 어떻게 해야 할까?

    A. 별도로 props를 정의해서 각각 원하는 컴포넌트를 넣어주면 됨

    예제 코드)

    ```jsx
    function SplitPane(props) {
        return (
            <div className="SplitPane">
                <div className="SplitPane-left">
                    {props.left}
                </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        );
    }
    
    function App(props) {
        return (
            <SplitPane
                left={
                    <Contacts />
                }
                right={
                    <Chat />
                }
            />
        );
    }
    ```
    - 화면을 왼쪽과 오른쪽으로 분할해서 보여주는 SplitPane 컴포넌트
    - App 컴포넌트에서 SplitPane 컴포넌트를 사용하고 있는데 여기에서 left, right라는 두 개의 props를 정의하여 그 안에 각각 다른 컴포넌트를 넣어주고 있음

<br />

## 2. Specialization

: 범용적인 개념을 구별이 되도록 구체화하는 것

- 범용적으로 쓸 수 있는 컴포넌트를 만들어 놓고, 이를 특수화시켜서 컴포넌트를 사용하는 Composition 방법

    'WelcomeDialog는 Dialog의 특별한 케이스이다'

    - 객체 지향 언어 : 상속(Inheritance)을 사용하여 Specialization 구현
    - 리액트 : 합성(Composition)을 사용하여 Specialization 구현

    ```jsx
    function Dialog(props) {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">
                    {props.title}
                </h1>
                <p className="Dialog-message">
                    {props.message}
                </p>
            </FancyBorder>
        );
    }

    function WelcomeDialog(props) {
        return (
            <Dialog
                title="어서오세요"
                message="우리 사이트에 방문하신 것을 환영합니다!"
            />
        );
    }
    ```
    - WelcomeDialog : Dialog라는 범용적인 의미를 가진 컴포넌트를 사용하는 컴포넌트
    - Dialog 컴포넌트는 title, message 두 가지 props를 가지고 있고 이를 어떻게 사용하느냐에 따라서 경고 또는 인삿말 Dialog가 될 수도 있음

<br />

## Containment와 Specialization 같이 사용하기

```jsx
funtion Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

function SignUpDialog(props) {
    const [nickname, setNickname] = useState('');

    const handleChange = (event) => {
        setNickName(event.target.value);
    }

    const handleSignUp = () => {
        alert(`어서오세요, ${nickname}님`);
    }

    return (
        <Dialog
            title="화성 탐사 프로그램"
            message="닉네임을 입력해주세요">
            <input
                value={nickname}
                onChange={handleChange} />
            <button onClick={handleSignUp}>
                가입하기
            </button>
        </Dialog>
    );
}
```
- Dialog 컴포넌트에 {props.children} 추가해줌으로써 하위 컴포넌트가 다이얼로그 하단에 렌더링 됨
- Dialog 컴포넌트를 사용하는 SignUpDialog 컴포넌트를 살펴보면 Specialization을 위한 props인 title과 message에 값을 넣어주고 있으며,

    사용자로부터 닉네임을 입력받고 가입을 유도하기 위해 input과 button 태그가 들어가 있음
    - 이 두 개의 태그는 props.childeren으로 전달되어 Dialog에 표시됨! 아!
- 이런 형태로 Containment와 Specialization을 동시에 사용할 수 있다~!

<br />

## Inheritance

: Composition과 대비되는 객체지향 프로그래밍 개념

- 부모 클래스를 상속받아서 새로운 자식 클래스를 만든다는 개념으로, 자식 클래스는 부모 클래스가 가진 변수나 함수 등의 속성을 모두 갖게 됨
- 근데 meta에서 굳이 상속을 사용해서 컴포넌트를 만드는 것을 추천할만한 사용 사례를 찾지 못했다고 함
- 리액트에서는 Composition을 사용해서 개발하는 것이 더 좋은 방법!

<br />

### 복잡한 컴포넌트를 쪼개 여러 개의 컴포넌트로 만들고, 만든 컴포넌트들을 조합해서 새로운 컴포넌트들을 만들자!