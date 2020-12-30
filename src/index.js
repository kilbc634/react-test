import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.compact.css';
import './index.css';
import SplitPane from 'react-split-pane';
import Sortable from './Sortable';
import { Collapse } from 'antd';
import reportWebVitals from './reportWebVitals';

const styles = {
  background: '#000',
  width: '5px',
  cursor: 'col-resize',
  margin: '0 5px',
  height: '100%',
};

const dataSource = [
  {
    key: '1',
    name: 'パワーI',
    effect: '打撃力(+10)'
  },
  {
    key: '1',
    name: 'シュートI',
    effect: '射撃力(+10)'
  },
];

const columns = [
  {
    title: '能力',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '効果',
    dataIndex: 'effect',
    key: 'effect'
  }
];

ReactDOM.render(
  <div>
    <SplitPane 
      split="vertical"
      minSize={300}
      defaultSize={500}
      resizerStyle={styles}
      maxSize={600}
    >
      <div>
        <Collapse>
          <Collapse.Panel header="ONE" key="0">
            <Sortable dataSource={dataSource} columns={columns}></Sortable>
          </Collapse.Panel>
          <Collapse.Panel header="TWO" key="1">
            <div className="list-group-item">Item 1</div>
            <div className="list-group-item">Item 2</div>
            <div className="list-group-item">Item 3</div>
            <div className="list-group-item">Item 4</div>
            <div className="list-group-item">Item 5</div>
          </Collapse.Panel>
        </Collapse>
      </div>
      <div>
        <h1>SplitPane main window</h1>
      </div>
    </SplitPane>
  </div>,
  document.getElementById('root')
);

reportWebVitals();
