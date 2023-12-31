import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        border: "1px solid grey",
        borderRadius: 16,
    },
    messageText: {
        color: "black",
        fontSize: 16,
    },
};

class Noti extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // 문장을 묶을 때 일반 따옴표가 아닌 역따옴표(`)를 사용해서 묶어줌!!!
    // 컴포넌트가 마운트 된 이후 호출됨
    componentDidMount() {
        console.log(`${this.props.id} componentDidMount() called.`);
    }

    // 컴포넌트가 업데이트 된 이후 호출됨
    componentDidUpdate() {
        console.log(`${this.props.id} componentDidUpdate() called.`);
    }

    // 컴포넌트가 언마운트 되기 전에 호출됨
    componentWillUnmount() {
        console.log(`${this.props.id} componentWillUnmount() called.`);
    }

    render() {
        return (
            <div style={styles.wrapper}>
                <span style={styles.messageText}>{this.props.message}</span>
            </div>
        );
    }
}

export default Noti;