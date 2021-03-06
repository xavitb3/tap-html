import React from 'react';

import Assertion from './assertion';
import { parseName } from './util';

class Plan extends React.Component {
  getTotalTests(tests) {
    return tests.map((test) => test['tests'] ? this.getTotalTests(test) : 1).reduce((a, b) => a + b, 0);
  }
  getTotalAssertions(tests) {
    return tests.map((test) => test['tests'] ? this.getTotalAssertions(test) : test['assertions'].length).reduce((a, b) => a + b, 0);
  }
  render() {
    const { start, end, tests, name, type, assertions, show } = this.props;

    const style = {};

    if(!assertions) {
      style['marginTop'] = '50px';
      style['paddingTop'] = '50px';
      style['paddingRight'] = '15px';
      style['paddingLeft'] = '15px';
      style['paddingBottom'] = '25px';
    } else {
      style['marginTop'] = '60px';
      style['paddingBottom'] = '10px';
    }

    return (
      <div style={ style }>
        <div style={{ padding: '10px' }}>
          { !assertions ?
            <h1>[{ type }]&nbsp;{ parseName(name) }</h1>
          :
            <h3>[{ type }]&nbsp;{ parseName(name) }</h3>
          }
          <br/>
          <small>
            <i className="fa fa-clock-o"/>&nbsp;{ end - start }ms &nbsp;
          </small>
          { !assertions ?
            <small>
              { this.getTotalTests(tests) } tests &nbsp;
              { this.getTotalAssertions(tests)  } assertions
              <hr/>
            </small>
          : '' }
        </div>
        { assertions ?
          <ul className="list">
            { assertions.filter(({ ok }) => 
              show === "all"
                ? true
                : show === "success"
                  ? ok === true
                  : ok === false
            ).map((assertion) => {
              return <Assertion {...assertion}/>
            })}
          </ul>
        : '' }
        { tests && tests.map((test) => {
          test.show = show
          return <Plan {...test}/>
        })}
      </div>
    )
  }
}

export default Plan;
