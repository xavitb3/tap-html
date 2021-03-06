import "psychic-ui/dist/psychic-min.css";
import "font-awesome/css/font-awesome.css";
import "./style.css";

import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";

import Plan from "./plan";
import Navigation from "./navigation";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: "all" };
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow(show) {
    this.setState({ show });
  }

  render() {
    const { tests } = this.props;
    const { show } = this.state;

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <Navigation {...this.props} toggleShow={this.toggleShow} />
        <div>
          <div style={{ width: "550px", margin: "0 auto" }}>
            {tests.map(test => {
              test.show = show;              
              return <Plan {...test} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  tests: PropTypes.array,
  count: PropTypes.number,
  pass: PropTypes.number,
  fail: PropTypes.number,
  skip: PropTypes.number,
  time: PropTypes.string,
  todo: PropTypes.number
};

render(<Main {...report} />, document.getElementById("root"));
