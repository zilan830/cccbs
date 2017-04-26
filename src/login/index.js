import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, Radio} from 'antd';
import {autobind} from 'core-decorators';
import System from 'api/system';
import './style.less';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    console.log(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        window.localStorage.setItem('auth', values.type);
        window.location.href = "#/home";
      }
    });
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login-container">
        <h1>教务管理系统</h1>
        <div className="login-input-container">
          <Form className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{required: true, message: '请输入用户名!'}],
              })(
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码!'}],
              })(
                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('type', {
                rules: [{required: true, message: '请选择类型'}],
                initialValue: 1
              })(
                <RadioGroup onChange={this.onChange}>
                  <Radio value={1}>学生</Radio>
                  <Radio value={2}>老师</Radio>
                  <Radio value={3}>管理员</Radio>
                </RadioGroup>
              )
              }
            </FormItem>
            <div>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
                Log in
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

Login = Form.create()(Login);

module.exports = Login;
