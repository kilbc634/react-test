import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Input } from 'antd';
import { AbilityMenuRender, AbilityMenuHeader } from './AbilityMenuRender'
import data from './data/params.json'

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

export default Sidebar
