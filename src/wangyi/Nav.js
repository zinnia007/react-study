
import React from 'react'

import './style.css'

class Nav extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          barOptions:[
            '中国疫情',
            '世界疫情',
            '实时播报',
            '权威发布'
          ],
          activeIndex: 0,
          active:{  
            fontWeight:'700',
            color: 'red'  
          },
          bottomLine: {
            left: '7%'
          }
      }
    }
    render() {
      return (
        <div className="nav">
          {
            this.state.barOptions.map((item,index) => {
                let activeStyle = this.state.activeIndex == index ? this.state.active : {}
                return (
                  <div className="navItem" style={activeStyle} key={index} onClick={() => {this.changeBar(index)}}>
                    {item}
                  </div>
                 )
            }) 
          }
          <div className="line" style={this.state.bottomLine}></div>
        </div>
      )
    }
    // 切换bar事件
    changeBar = (index) => {
      this.setState({
        activeIndex: index,
        bottomLine: {
          left:`${(0.07 + 0.25*index)*100}%`
        }
      })  
    }
}

export default Nav