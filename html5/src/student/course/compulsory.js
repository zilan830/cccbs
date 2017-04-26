import React, {Component} from "react";
import { Table, Icon } from 'antd';

export default class Compulsory extends Component {
  constructor(props) {
    super(props);
    this.state={
      columns : [
        {
          title: '必修课',
          dataIndex: 'compulsory_id',
          key: 'compulsory_id',
        },
        {
          title: '教师',
          dataIndex: 'teacher_id',
          key: 'teacher_id',
        },
        {
          title: '班级',
          dataIndex: 'class_id',
          key: 'class_id',
        },
        {
          title: '教室',
          dataIndex: 'classroom_id',
          key: 'classroom_id',
        },
        {
          title: '时间',
          dataIndex: 'time_id',
          key: 'time_id',
        }
      ]

    }
  }
  render(){
    return (
      <div className="rightContainer">
        <h2><span>必修课课表</span></h2>
        <Table columns={this.state.columns} dataSource={[]}/>
      </div>
    )
  }
}