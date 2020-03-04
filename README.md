
#### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run build`

Builds the app for production to the `build` folder.<br />

#### 特点
    + 声明式的设计
    + 高校。虚拟dom实现dom的渲染，减少dom操作
    + 灵活，搭配其他库
    + jsx
    + 组件化
    + 单向数据流，没有实现数据的双向绑定
    
#### 创建项目
    + script标签引入
    + 脚手架
        npm i -g create-react-app
        create-react-app my-app
        
#### react元素渲染
```
    let h = <h1>我是元素</h1>
    // 使用jsx的写法，创建元素
    【注意】jsx元素或者组件元素必须只能有一个根元素
```
#### react 的 jsx
```
优点：
    1. jsx执行更快，编译为js的时候会进行优化
    2. 类型更加安全，在编译的时候如果出错就不能编译成功，即使检查错误
    3.模板编写简介快速
    
注意：
    1.必须要有一个根节点
    2.正常的html元素要小写，如果是大写，就会默认为组件
```
 + ##### jsx表达式
```
1.由html构成
2.中间如果需要插入变量用{}括起来
3.{}中间可以使用表达式
4.{}中间表达式可以使用jsx对象
5.属性和html内容一样，都是用{}来插入内容

```
+ ##### jsx_style
```
1.class中不可以存在多个属性
    eg: <div class='abc' class={active}></div> 是不能够准备的
    
2.style样式中如果存在多个单词的属性组合，第二个单词首字母大写,或加引号
    eg: let style = {
        backgroundImage
        "background-image"
    }
    
3.多个类并存的时候
    <h1 className={'abc' + class1}></h1>
    或者在外部，用数组对象的方式定义，并用join（' '）合成字符串
    let class2 = [class,class1].join(' ')
    
4.注释
    在{}中写
        {/*这是注释*/}
    
```

 #### React组件
```
    1. 函数式组件
    
        // 创建一个函数式组件
        let Comp1 = function (props) {
          return (
            <div>
              这是一个函数式组件{props.param}
            </div>
          )
        }

        ReactDOM.render(<Comp1 param="这是参数" />, document.getElementById('root'));
```
```
    2.类组件
        // 创建一个类组件
            class Comp2 extends React.Component{
              render() {
                return  (
                  <div>
                    这是一个类组件--{this.props.param}
                  </div>
                )
              }
            }
            
            ReactDOM.render(<Comp2 param="这是参数" />, document.getElementById('root'));
```
```
    
    3. 复合组件，组件中由其他组件（类or函数式）嵌套
    
```
```
    【注意】：
        1.组件命名首字母必须大写
        2.ReactDOM.render()中第一个参数就是组件，<Comp1 /> or <Comp1 ></Comp1>
        
    【区别】：
        1. 函数式比较简单，一般用于静态没有交互式的组件，只涉及到传值，没有事件
        2.类组件又称为动态组件，一般存在交互或者数据的修改
        3.凡是函数式组件实现的功能，类组件都能够实现，但是类组件实现的功能，函数式组件不一定能够实现
    
```

 #### State (相当于vue中的data,但是有区别)
```
下面实现了一个数字时钟，其中介绍了
    1.state, setState,
    2.组件渲染完成的生命周期componentDidMount，
    3.事件的绑定，事件的传值，以及事件中this的绑定
```
```
// 实现一个数字时钟
class Clock extends React.Component {
    constructor(props) {
          super(props)
          // state 中饿数据就是我们页面中需要用到的数据，在此定义
          this.state = {
            time: new Date().toLocaleTimeString()
          }
    
          // 函数绑定this
          this.clickEvent = this.clickEvent.bind(this)
        }
        render () {
          return (
            <div>
              当前的时间：{this.state.time}
              <button data-index="1" onClick={this.clickEvent}>看点击事件</button>
            </div>
          )
        }
        // 点击事件
        clickEvent(e) {
          console.log("点击我了");
          // 在进行绑定前，打印的this：undefined ,要在构造函数中绑定this
          console.log(this);
          // 绑定事件传参和小程序一样
          console.log(e.target.dataset.index);
        }
        // 生命周期函数 componentDidMount 组件渲染完成时执行的周期函数 
        componentDidMount(){
          setInterval(() => {
            // 重新渲染页面中的数据要用到setState，
            //如果直接用this.state.time修改，修改后的值不会直接渲染到页面上
            //通过this.setState修改之后的数据，并不会立即修改Dom中的内容，
            //react会在这个函数中所有的设置状态都改变之后，统一对比虚拟Dom对象，然后进行统一修改，提升性能
            // 和小程序的setData
            this.setState({
              time: new Date().toLocaleTimeString()
            })
          },1000)
        }
    }

```

 #### props
```
    1.父组件给子组件传世，单向传递的，不能子传父
    props的值可以是任意类型 

    2.props是可以设置默认值的
        类组件.defaultProps = {
            name:'zll'
        }
    
    3.props可以传递函数 ，props可以传递父元素的函数，就可以修改父元素的state，从而达到传递数据给父元素
        
```
 ##### 父传子，父传子
```
// 传值  
// 父传子  button按钮控制子组件是否显示
// 子传父 通过传递函数实现

class ParentComp extends React.Component {
    constructor (props) {
      super (props)
      this.state = {
        isShow: true,
        chileData: null // 子元素传过来的数据
      }
      this.clickEvent = this.clickEvent.bind(this)
    }
    render () {
      return (
        <div>
            <button onClick={this.clickEvent}>按钮</button>
            {/** 可以向子组件传递数据，和方法，在子组件props
             *  接受，通过调用传过去的方法，可以给父元素传递数据，实现子传父
             */}
            <ChildComp isShow={this.state.isShow} getDatafromParent={this.getDatafromParent} />
            <div>这是子元素传过来的数据：<h2>{this.state.chileData}</h2></div>
            
        </div>
      )
    }
    clickEvent () {
      let isShow = !this.state.isShow
      this.setState({
        isShow:isShow
      })
    }
    // 子元素传递数据给父元素。子元素调用父元素的方法实现传递数据
    getDatafromParent = (data) => {
      console.log(data);
      this.setState({
        chileData:data
      })
    }
}


class ChildComp extends React.Component {
    constructor (props) {
      super (props)
    }
    render () {
      let classStr = this.props.isShow ? null : 'hide'
      console.log(classStr);
      return (
        <div className={classStr}>
          <h1>我是子组件</h1>  
          <button onClick={this.sendDataToParent}>点击向父元素传递数据</button>
        </div>
      )
    }
    // 点击button按钮可以实现向父元素传递数据，调用此方法
    sendDataToParent= () => {
      this.props.getDatafromParent('123')
    }
}

```
 #### react 事件
```
 1.传参问题 
    <button onClick={(e) => {this.parentEvent('参数1','参数2','...',e)}}></button>
    // 如果调用的函数没有绑定this
    <button onClick={(e) => {this.parentEvent('参数1','参数2','...',e)}.bind(this)}></button>
    
 2.阻止默认事件的触发，不能用return了
    e.preventDefault()
```

 #### 生命周期
  ###### 生命周期的三个状态
        Mounting: 将组件挂载的DOM中
        Updateing: 将数据更新到DOM中
        Unmounting: 将组件移除Dom中

```
    生命周期函数:
    
    ComponentWillMount: 组件将要渲染
    ComponentDidMount: 组件渲染完毕
    ComponentWillReceiveProps: 组件将要接收props数据
    ShouldComponentUpdate: 组件接收到新的state或者props,判断是否更新，返回布尔值
    ComponentWillUpdate: 组件将要更新
    ComponentDidUpdate: 组件已经更新
    ComponentWillUnmount: 组件将要卸载
```

