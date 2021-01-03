import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.compact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import data from './data/params.json'
import SplitPane from 'react-split-pane';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { AbilityMenuRender, AbilityMenuHeader } from './AbilityMenuRender'
import reportWebVitals from './reportWebVitals';

const styles = {
    background: '#000',
    width: '5px',
    cursor: 'col-resize',
    margin: '0 5px',
    height: '100%',
};

var abilityList = data.abilityList.map((item) => {
    return({
        code: item['code'],
        gid: item['gid'],
        name: item['name'],
        effect: item['effect']
    });
});

function formatAbilityList(abilityList) {
    var dataList = [];
    for (let ability of abilityList) {
        let newGroup = true;
        for (let data of dataList) {
            if (data['gid'] === ability['gid']) {
                data['content'].push({
                    key: ability['code'],
                    name: ability['name'],
                    effect: ability['effect']
                });
                newGroup = false;
                break;
            }
        }
        if (newGroup) {
            dataList.push({
                gid: ability['gid'],
                content: [{
                    key: ability['code'],
                    name: ability['name'],
                    effect: ability['effect']
                }]
            });
        }
    }
    return dataList;
}

ReactDOM.render(
  <div>
    <SplitPane 
      split="vertical"
      minSize={250}
      defaultSize={600}
      resizerStyle={styles}
      maxSize={900}
    >
      <div>
        <Navbar sticky="top" bg="dark" variant="dark" className="p-0">
          <div className="col p-0">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
            <AbilityMenuHeader/>
          </div>
        </Navbar>
        <AbilityMenuRender abilityMenu={formatAbilityList(abilityList)} />
      </div>
      <div>
        <h1>SplitPane main window</h1>
      </div>
    </SplitPane>
  </div>,
  document.getElementById('root')
);

reportWebVitals();
