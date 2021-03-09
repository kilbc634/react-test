import React, { Component } from 'react';
import { Button, Dropdown, Menu, Radio, Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';

class ChangePriceData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultItemType: props.defaultItemType,
            defaultScoketShow: props.defaultScoketShow,
            itemType: props.defaultItemType,
            scoketShow: props.defaultScoketShow,
            toChange: props.toChange,
            dropDownShow: false
        }
        this.onVisibleChange = this.onVisibleChange.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeSocket = this.onChangeSocket.bind(this);
    }

    onVisibleChange = (visible) => {
        this.setState(() => {
            return {dropDownShow: visible}
        });
        if (visible) {
            this.setState(({ defaultItemType, defaultScoketShow }) => {
                return {
                    itemType: defaultItemType,
                    scoketShow: defaultScoketShow
                }
            });
        }
    }

    onChangeType = (e) => {
        this.setState(() => {
            return {itemType: e.target.value}
        });
    }

    onChangeSocket = (valueList) => {
        this.setState(() => {
            return {scoketShow: valueList}
        });
    }

    render() {
        const checkboxOptions = [
            { label: 'ANY', value: 'any' },
            { label: 'S1', value: 's1' },
            { label: 'S2', value: 's2' },
            { label: 'S3', value: 's3' },
            { label: 'S4', value: 's4' },
            { label: 'S5', value: 's5' },
            { label: 'S6', value: 's6' },
            { label: 'S7', value: 's7' },
            { label: 'S8', value: 's8' }
        ]
        const menu = (
          <Menu>
            <Menu.Item key="type">
              <Radio.Group value={this.state.itemType} onChange={this.onChangeType} buttonStyle="solid">
                <Radio.Button value="weapon">Weapon</Radio.Button>
                <Radio.Button value="unit">Unit</Radio.Button>
              </Radio.Group>
            </Menu.Item>
            <Menu.Item key="socket">
              <Checkbox.Group options={checkboxOptions} value={this.state.scoketShow} onChange={this.onChangeSocket}/>
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={['click']} visible={this.state.dropDownShow} onVisibleChange={this.onVisibleChange}>
            <Button type="primary">
              Button <DownOutlined/>
            </Button>
          </Dropdown>
        )
    }
}

export default ChangePriceData;
