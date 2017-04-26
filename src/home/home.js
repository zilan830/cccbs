import React, {Component} from "react";
import Side from './side';
import {isAuth} from 'util/Authority';
import './style.less';

let siderMenuData = [
  {
    key: '/student',
    title: '学生信息',
    authId: '1',
    sub: [
      {
        key: '/student/info',
        title: '基本信息',
        authId: '1',
        sub: []
      },
    ]
  },
  {
    key: '/course',
    title: '课表查询',
    authId: '1',
    sub: [
      {
        key: '/course/compulsory',
        title: '必修课课表',
        authId: '1',
        sub: []
      },
      {
        key: '/course/elective',
        title: '选修课课表',
        authId: '1',
        sub: []
      },
    ]
  },
  {
    key: '/score',
    title: '成绩查询',
    authId: '1',
    sub: [
      {
        key: '/score/compulsory',
        title: '必修课成绩',
        authId: '1',
        sub: []
      },
      {
        key: '/score/elective',
        title: '选修课成绩',
        authId: '1',
        sub: []
      },
    ]
  },
  {
    key: '/altclass',
    title: '选报查询',
    authId: '1',
    sub: [
      {
        key: '/altclass/course',
        title: '选报课程',
        authId: '1',
        sub: []
      },
    ]
  },
  {
    key: '/teacher',
    title: '老师系统',
    authId: '2',
    sub: []
  },
  {
    key: '/admin',
    title: '管理员系统',
    authId: '3',
    sub: []
  },
];


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siderMenuData: siderMenuData
    }
  }

  componentWillMount() {
    // 根据权限计算出菜单,只到2级菜单
    let menus = [];
    this.state.siderMenuData.map(menu => {
      if (isAuth(menu.authId)) {
        let subs = [];
        menu.sub.map((subMenu) => {
          if (isAuth(subMenu.authId)) {
            subs.push(subMenu)
          }
        });
        if (subs.length > 0) {
          menu.sub = subs
        } else {
          menu.sub = []
        }
        menus.push(menu);
      }
    });
    this.setState({
      siderMenuData: menus
    })
  }

  render() {
    return (
      <div className="container">
        <header>学校教务管理系统</header>
        <div className="innerContainer">
        <Side siderMenuData={this.state.siderMenuData}/>
        <div className="wrapper">
          {this.props.children}
        </div>
        </div>
      </div>
    )
  }
}