import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import App from './App';
import Login from './login/index';
import Home from './home/home';
import Admin from './admin';
import Teacher from './teacher';
import Info from './student/info';
import Compulsory from './student/course/compulsory';
import Elective from './student/course/elective';
import CompulsoryScore from './student/score/compulsoryScore';
import ElectiveScore from './student/score/electiveScore';
import AltCourse from './student/altCourse/altCourse';
import './style.less';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="login(/:msg)" component={Login}/>
      <Route path="home" component={Home}>
        <Route path="student/info" component={Info}/>
        <Route path="course/compulsory" component={Compulsory}/>
        <Route path="course/elective" component={Elective}/>
        <Route path="score/compulsory" component={CompulsoryScore}/>
        <Route path="score/elective" component={ElectiveScore}/>
        <Route path="altclass/course" component={AltCourse}/>
        <Route path="teacher" component={Teacher}/>
        <Route path="admin" component={Admin}/>
      </Route>
      <IndexRedirect to="login"/>
    </Route>
  </Router>
), document.getElementById('container'));
