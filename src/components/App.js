import React, { Component } from "react";
import Top from "./TopPage";
import { Route, BrowserRouter } from "react-router-dom";
import Param from "./Param";
import Param2 from "./Param2";
import "./css/font-awesome-all.css";
import "./css/flaticon.css";
import "./css/bootstrap.css";
import "./css/jquery.fancybox.min.css";
import "./css/animate.css";
import "./css/imagebg.css";
import "./css/style.css";
import "./css/responsive.css";

class App extends React.Component {

  render() {
    return (
      <div>

        <div>
          <BrowserRouter>
            <Route exact path='/' component={Top} />
            <Route path='/view/:id' component={Param} />
            <Route path='/refer/:id' component={Param2} />
          </BrowserRouter>
        </div>

      </div>
    );
  }
}

export default App;
