import React, { Component } from 'react';
import { Menu } from 'element-react';
import Fetch from '../utils/fetch'
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom'
class home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuList: []
    }
  }
  login() {
    Fetch({method: 'post', url: '/api/Security/Login/'}).then(res =>{
      Cookies.set('access_token', res.data.access_token);
    }).then(_ => {
      this.getMenuList()
    })
  }
  getMenuList() {
    Fetch({method:'get', url: '/api/Security/Menu/'}).then(res => {
      let menuList = []
      res.data.Data.forEach(item => {
        if (item.ParentId==='') {
          item.secondMenu = []
          menuList.push(item)
          res.data.Data.forEach(ele => {
            if (item.MenuId === ele.ParentId) {
              item.secondMenu.push(ele)
            }
          });
        }
      })
      this.setState({menuList: menuList})
    })
  }
  selectMenu(index) {
    console.log(index);
    this.props.history.push(index)
    let a = {...this.state}
    let b = this.state
    console.log(a,b);
  }
  componentDidMount() {
    this.login()
  }
  render() {
    return (
      <div>
        <Menu defaultActive="2" className="el-menu-vertical-demo" onSelect={this.selectMenu.bind(this)}  theme="dark">
          {
            this.state.menuList.map((item, index)=> {
              return  <Menu.SubMenu key={item.MenuId} index={item.MenuId} title={<span>{item.MenuTitle}</span>}>
                {item.secondMenu.map(ele => {
                  return <Menu.Item key={ele.MenuId} index={ele.LinkUrl}>{ele.MenuTitle}</Menu.Item>
                })}
              </Menu.SubMenu>
            } )
          }
        </Menu>
      </div>
    )
  }
}
export default withRouter(home)