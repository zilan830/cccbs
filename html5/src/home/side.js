import React, {Component} from "react";
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;


class Side extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
      openKeys: [],
      siderFixed: false,
    }
    this.scrollHandel = this.scrollHandel.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  handleClick(e) {
    window.location.href = '#/home' + e.key;
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1)
    });
  }

  onToggle(openKeys) {
    const latestOpenKey = openKeys.find(key => !(this.state.openKeys.indexOf(key) > -1));
    this.setState({openKeys: [].concat(latestOpenKey)});
  }

  componentWillMount() {
    this.menuKeys = this.getKeys(this.props.siderMenuData)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandel);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandel);
  }

  scrollHandel() {
    let dom = document.body.scrollTop;
    if (dom >= 30) {
      this.setState({
        siderFixed: true,
      });
    } else {
      this.setState({
        siderFixed: false,
      });
    }
  }

  getKeys(menus) {
    let keys = []
    for (let i = 0; i < menus.length; i++) {
      keys.push(menus[i].key)
      if (menus[i].sub) {
        let nextKeys = this.getKeys(menus[i].sub)
        keys = keys.concat(nextKeys)
      }
    }
    return keys
  }

  getCurrentRoute() {
    return window.location.href.split('#')[1].split('?')[0].split('/home')[1]
  }

  render() {
    const fontSize = {'fontSize': '14px'};
    let currentRoute = this.getCurrentRoute()
    let selectedKeys = this.menuKeys.filter((key) => {
      return key === currentRoute
    });
    // console.log('%c' + selectedKeys, 'background: #222; color: #bada55');

    return (
      <div className="ant-menu-inline" style={{"height":"100%"}}>
        <div>
          <div>
            <Menu onClick={this.handleClick}
                  openKeys={this.state.openKeys}
                  onOpenChange={this.onToggle}
                  selectedKeys={selectedKeys}
                  mode="inline"
                  style={{'minWidth': '240px'}}>
              {
                this.props.siderMenuData.map((menu) => {
                  if (menu.sub.length > 0) {
                    let list = [];
                    menu.sub.map((sub) => {
                      list.push(
                        <Menu.Item key={sub.key}>
                          <span style={fontSize}>{sub.title}</span>
                        </Menu.Item>
                      );
                    });
                    return (
                      <SubMenu key={menu.key} title={<span><h4 style={fontSize}>{menu.title}</h4></span>}>
                        {list}
                      </SubMenu>
                    )
                  } else {
                    return (
                      <Menu.Item key={menu.key}>
                        <span style={fontSize}>{menu.title}</span>
                      </Menu.Item>
                    );
                  }
                })
              }
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Side;