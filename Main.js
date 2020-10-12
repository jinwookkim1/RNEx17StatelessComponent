import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Main extends Component{

    // 4)실습에서 사용할 state변수
    constructor(){
        super();
        this.state={
            msg: "",
        }
    }

    render(){
        return (
            <View style= { styles.root }>
                {/* 새로운 Custom Component를 만드는 방법은 2가지 종류가 있음.  [ 즉, React Native에서는 2가지 종류의 Component가 존재함 ]*/}
                {/* 1. stateful Component :  Component class를 상속해서 만드는 일반적인 Component */}
                {/* 2. stateless Component : 마치 익명함수를 만드는 방식처럼 만들어진 Component [함수형 컴포넌트라고도 부름] */}

                {/* 1) 두 컴포넌트의 차이를 알아보기 위해 먼저 익숙한 stateful 컴포넌트 만들어보기 */}
                <MyComponent></MyComponent>

                {/* 2) stateless 컴포넌트 만들기 */}
                <MyComponent2></MyComponent2>

                {/* 즉, 간단한 Contents를 화면에 보여 주고자 할 때 사용하기 편한 Component임 */}
                {/* 차이점? : class가 없으니 멤버변수를 만들 수 없음. 즉, state 변수를 가질 수 없음 , 또한, Lifecycle메소드도 존재하지 않음. */}



                {/* 3) 대신에 props는 가질 수 있음. */}
                {/* 3.1) props를 받는 일반 stateful Component  */}
                <MyComponent3 data="aaa"></MyComponent3>

                {/* 3.2) props를 받는 stateless component */}
                <MyComponent4 data="bbb"></MyComponent4>

                {/* 3.3) 여러개의 파라미터 전달 stateless component */}
                <MyComponent5 data="ccc" title="sam"></MyComponent5>
                
                {/* 3.4) 구조분해 할당으로 props 받기 */}
                <MyComponent6 data="ddd" title="robin"></MyComponent6>



                {/* 4) 컴포넌트들 간의 제어  : Main컴포넌트의 state 값이 BBB컴포넌트의 props로 전달!! */}
                <AAA onPress={ this.changeText } ></AAA>
                <BBB msg={ this.state.msg } ></BBB>

            </View>
        );
    }

    //4)실습에서 사용할 콜백메소드
    changeText= ()=>{
        this.setState( {msg:"Nice to meet you."});
    }
}


//1) stateful Component 
class MyComponent extends Component{
    render(){
        return (
            <View>
                <Text style={styles.text}>Hello MyComponent</Text>
            </View>
        );
    }
}


//2) stateless Component [익명함수 만드는 방법과 동일] : 문법형태를 보면 Component를 상속하여 class를 만들고 render()하는 코드를 축약해서 작성한 모습처럼 보이기도 함.
const MyComponent2= ()=>{

    // ## 아래 return 수업후에.....####
    // constructor를 가질 수 없고 당연히 state도 가질 수 없음. 그래서 stateless라고 부름
    // constructor(){
    //     super();
    //     this.state={}
    // }

    return (
        <View>
            <Text style={styles.text}>Nice MyComponent2</Text>
        </View>
    );
}

// 2.1) 아래처럼 화살표함수 대신에 일반 익명함수로 만들어도 됨.
// const MyComponent2= function(){
//     return (
//         <View>
//             <Text style={styles.text}>Nice MyComponent2</Text>
//         </View>
//     );
// }

// 2.2) 심지어 이렇게 일반 함수 만드는 방법으로 만들어도 됨. 단, this키워드와 파라미터의 문제로 인해 화살표함수 방법을 권장함.
// function MyComponent2(){
//     return (
//         <View>
//             <Text style={styles.text}>Nice MyComponent2</Text>
//         </View>
//     );
// }



//3.1) props를 받는 일반 statful Component
class MyComponent3 extends Component{
    render(){
        return (
            <View>
                {/* 전달받은 props를 출력 */}
                <Text style={styles.text}>MyComponent3 :  {this.props.data} </Text>
            </View>
        );
    }
}

//3.2) props를 받는 stateless component
const MyComponent4= ( props )=>{
    return (
        <View>
            {/* 전달받은 props를 출력하기 위해 일반 Component처럼 작성하면 this.props의 undefined로 인해 ERROR [why? Component를 상속하지 않았으므로 this.props멤버가 존재하지 않음*/}            
            {/* <Text style={styles.text}>  MyComponent3 :  {this.props.data} </Text> */}

            {/* 받으려면 이 stateless component 함수의 () 파라미터로 properties들을 객체로 받아야 함[변수명은 꼭 props일 필요는 없음.] */}
            <Text style={styles.text}>MyComponent4 :  {props.data} </Text>            
        </View>
    );
}

//3.3) 여러개의 파라미터 전달 stateless component 
const MyComponent5= ( props )=>{
    return (
        <View>
            {/* 파라미터로 받은 객체의 properties 출력*/}            
            <Text style={styles.text}>MyComponent5 data :  {props.data} </Text>
            <Text style={styles.text}>MyComponent5 title :  {props.title} </Text>
        </View>
    );
}

// 3.4) 구조분해 할당으로 props 받기
const MyComponent6= ( {data, title} )=>{
    return (
        <View>
            {/* 파라미터로 받은 객체의 properties 출력*/}            
            <Text style={styles.text}>MyComponent6 data : {data} </Text>
            <Text style={styles.text}>MyComponent6 title :  {title} </Text>
        </View>
    );
}


// 4) 컴포넌트들 간의 제어하기
// 버튼을 가진 컴포넌트
const AAA= (props)=>{
    return (
        <View style={ {padding:16,} }>
            <Button title="change" onPress={ props.onPress }></Button>
        </View>        
    );
}

//버튼에 의해 변경될 글씨를 보여줄 컴포넌트
const BBB= ( {msg} )=>{ //구조분해 할당으로 받기
    return (
        <View style={ {padding:16,} } >
            <Text style= { {fontWeight:'bold'}}> message : {msg} </Text>
        </View>
    );
}



const styles= StyleSheet.create({
    root: { flex:1, padding:16, },
    text: {margin:8, padding:8, },
});