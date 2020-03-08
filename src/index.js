import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 创建一个函数式组件
// let Comp1 = function (props) {
//   return (
//     <div>
//       这是一个函数式组件{props.param}
//     </div>
//   )
// }

// 创建一个类组件
// class Comp2 extends React.Component{
//   render() {
//     return  (
//       <div>
//         这是一个类组件--{this.props.param}
//       </div>
//     )
//   }
// }

// 实现一个数字时钟
// class Clock extends React.Component {
//     constructor(props) {
//       super(props)
//       // state 中饿数据就是我们页面中需要用到的数据，在此定义
//       this.state = {
//         time: new Date().toLocaleTimeString()
//       }

//       // 函数绑定this
//       this.clickEvent = this.clickEvent.bind(this)
//     }
//     render () {
//       return (
//         <div>
//           当前的时间：{this.state.time}
//           <button data-index="1" onClick={this.clickEvent}>看点击事件</button>
//         </div>
//       )
//     }
//     // 点击事件
//     clickEvent(e) {
//       console.log("点击我了");
//       // 在进行绑定前，打印的this：undefined ,要在构造函数中绑定this
//       console.log(this);
//       // 绑定事件传参和小程序一样
//       console.log(e.target.dataset.index);
//     }
//     // 生命周期函数 componentDidMount 组件渲染完成时执行的周期函数 
//     componentDidMount(){
//       setInterval(() => {
//         // 重新渲染页面中的数据要用到setState，
//         //如果直接用this.state.time修改，修改后的值不会直接渲染到页面上
//         //通过this.setState修改之后的数据，并不会立即修改Dom中的内容，
//         //react会在这个函数中所有的设置状态都改变之后，统一对比虚拟Dom对象，然后进行统一修改，提升性能
//         // 和小程序的setData
//         this.setState({
//           time: new Date().toLocaleTimeString()
//         })
//       },1000)
//     }
// }

// #### 传值  父传子  button按钮控制子组件是否显示

// class ParentComp extends React.Component {
//     constructor (props) {
//       super (props)
//       this.state = {
//         isShow: true,
//         chileData: null // 子元素传过来的数据
//       }
//       this.clickEvent = this.clickEvent.bind(this)
//     }
//     render () {
//       return (
//         <div>
//             <button onClick={this.clickEvent}>按钮</button>
//             {/** 可以向子组件传递数据，和方法，在子组件props
//              *  接受，通过调用传过去的方法，可以给父元素传递数据，实现子传父
//              */}
//             <ChildComp isShow={this.state.isShow} getDatafromParent={this.getDatafromParent} />
//             <div>这是子元素传过来的数据：<h2>{this.state.chileData}</h2></div>
            
//         </div>
//       )
//     }
//     clickEvent () {
//       let isShow = !this.state.isShow
//       this.setState({
//         isShow:isShow
//       })
//     }
//     // 子元素传递数据给父元素。子元素调用父元素的方法实现传递数据
//     getDatafromParent = (data) => {
//       console.log(data);
//       this.setState({
//         chileData:data
//       })
//     }
// }


// class ChildComp extends React.Component {
//     constructor (props) {
//       super (props)
//     }
//     render () {
//       let classStr = this.props.isShow ? null : 'hide'
//       console.log(classStr);
//       return (
//         <div className={classStr}>
//           <h1>我是子组件</h1>  
//           <button onClick={this.sendDataToParent}>点击向父元素传递数据</button>
//         </div>
//       )
//     }
//     // 点击button按钮可以实现向父元素传递数据，调用此方法
//     sendDataToParent= () => {
//       this.props.getDatafromParent('123')
//     }
// }

// /**
//  * redux的使用
//  */
// // 第一步：安装 ，npm i redux --s
// // 第二部：引入
// import Redux, {createStore} from 'redux'
// // 第三步：创建仓库
//     // reducer 是一个函数,通过动作action来返回新的state数据
// const reducer = function (state ={ num: 0 },action) {
//   switch(action.type) {
//     case 'add':console.log(state.num); state.num ++ ;break;
//     case 'sub':state.num -- ;break;
//     default:break;
//   }
//   return {...state}
// }
// const store = createStore(reducer) 

// function add () {
//   store.dispatch({type:'add'})
// }
// function sub () {
//   store.dispatch({type:'sub'})

// }
// class ParentComp extends React.Component {
//     render () {
//       return (
//         <div>
//             当前数字：{store.getState().num}
//             <button onClick={add}>num+1</button>
//             <button onClick={sub}>num-1</button>
//         </div>
//       )
//     }
// }

// // 监听state值得改变
// store.subscribe(() => {
//   ReactDOM.render(<ParentComp  />, document.getElementById('root'));
// })

/**
 * react-redux的用法
 */
// 1.安装 npm i react-redux --s
// 2.引入 react-redux
import {createStore}from 'redux'
import {Provider, connect } from 'react-redux'

// 3.创建一个store仓库
const reducer = function (state = {num:0}, action) {
    switch (action.type) {
      case 'add': state.num ++;break;
      default: break;
    }
    return {...state}
}
const store = createStore(reducer)

// 4.数据的获取以及数据的修改
// 将state数据映射到组件prop中，将修改数据的方法映射到组件的props中
  // state映射到props
  function mapStateToProps (state) {
    return {
      value:state.num
    }
  }
  // 修改数据的方法映射到props
  const addAction = {
    type:'add'
  }
  function mapDispatchToProps (dispatch) {
    return {
      onAddClick: () => {
        dispatch(addAction)
      }
    }
  }
  


  class ParentComp extends React.Component {
    constructor (props) {
      super(props)
    }
      render () {
        // 通过props 获取state中的数据
        let value = this.props.value
        let onAddClick = this.props.onAddClick
  
        console.log(value);
        return (
          <div>
            num:{value}
            <button onClick={onAddClick}>点击+1</button>
          </div>
        )
      }
  }
 // 5.将这两个方法关联到组件
  const NewComp = connect (
      mapStateToProps,
      mapDispatchToProps
  )(ParentComp)

  // 6.通过provider 取得数据渲染组件
ReactDOM.render(
  <Provider store = {store}>
    <NewComp></NewComp>
  </Provider>
  , document.getElementById('root'));
