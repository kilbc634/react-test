import React, { Component } from 'react';
import { Collapse } from 'antd';
import Sortable from './Sortable';

const _columns = [
    {
      title: '能力',
      dataIndex: 'name'
    },
    {
      title: '効果',
      dataIndex: 'effect'
    }
];

const getHeaderName = (groupId) => {
    if(groupId==="A"){return"ステータス"}
    else{if(groupId==="A+"){return"ステータス(特殊)"}
    else{if(groupId==="A++"){return"フレイズ・センテンス"}
    else{if(groupId==="AB"){return"S級特殊能力(武器)"}
    else{if(groupId==="AB+"){return"S級特殊能力(ユニット)"}
    else{if(groupId==="B"){return"カタリスト・特殊系"}
    else{if(groupId==="C"){return"レセプター"}
    else{if(groupId==="D"){return"ソール"}
    else{if(groupId==="D+"){return"フィーバー"}
    else{if(groupId==="E"){return"レジスト"}
    else{if(groupId==="E+"){return"状態異常付与"}
    else{if(groupId==="E++"){return"倍率特効"}
    else{if(groupId==="E+++"){return"ブースト"}
    }}}}}}}}}}}}return"その他"};

class AbilityMenuRender extends Component {
    constructor(props) {
        super(props);
        this.abilityMenu = props.abilityMenu;
    }

    render() {
        var panels = [];
        for (let menu of this.abilityMenu) {
            panels.push(
              <Collapse.Panel header={getHeaderName(menu['gid'])} key={menu['gid']}>
                <Sortable dataSource={menu['content']} columns={_columns}></Sortable>
              </Collapse.Panel>
            )
        }
        return (
        <Collapse>
          {panels}
        </Collapse>
        )
    };
}

export default AbilityMenuRender;
