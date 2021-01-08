import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.compact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import data from './data/params.json'
import SplitPane from 'react-split-pane';
import { Navbar } from 'react-bootstrap';
import { Input } from 'antd';
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

function formatAbilityList(abilityList, filter='') {
    var dataList = [];
    for (let ability of abilityList) {
        if (filter && !ability['name'].includes(filter)) {
            continue;
        }
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

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.updateColumnWidth = this.updateColumnWidth.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.state = {
            columns: [
                {
                  title: () => {
                      return (
                        <Input.Search
                          addonBefore="能力"
                          placeholder="input search text"
                          allowClear
                          enterButton
                          size="large"
                          onSearch={this.onSearch}
                        />
                      )
                  },
                  dataIndex: 'name',
                  width: 400,
                  minWidth: 300
                },
                {
                  title: '効果',
                  dataIndex: 'effect'
                }
            ],
            searchText: ''
        }
    }

    updateColumnWidth = (index, width) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            if (width >= columns[index].minWidth)
                nextColumns[index] = {
                  ...nextColumns[index],
                  width: width,
                };
            return { columns: nextColumns }
        });
    }

    onSearch = (text) => {
        this.setState(() => {
            return { searchText: text }
        });
    }
    

    render() {
        return (
          <div>
            <Navbar sticky="top" bg="dark" variant="dark" className="p-0">
              <AbilityMenuHeader onUpdateHeader={this.updateColumnWidth} columns={this.state.columns}/>
            </Navbar>
            <AbilityMenuRender abilityMenu={formatAbilityList(abilityList, this.state.searchText)} columns={this.state.columns}/>
          </div>
        )
    }
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
      <Sidebar/>
      <div>
        <h1>SplitPane main window</h1>
      </div>
    </SplitPane>
  </div>,
  document.getElementById('root')
);

reportWebVitals();
