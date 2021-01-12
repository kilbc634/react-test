import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.compact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import SplitPane from 'react-split-pane';
import { Container , Row } from 'react-bootstrap';
import Sidebar from './Sidebar';
import DashboardZone from './DashboardZone';
import reportWebVitals from './reportWebVitals';

const styles = {
    background: '#000',
    width: '5px',
    cursor: 'col-resize',
    margin: '0 5px',
    height: '100%',
};

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
      <Container fluid>
        <Row className="titleHeader">
          <h1>titleHeader</h1>
        </Row>
        <DashboardZone/>
      </Container>
    </SplitPane>
  </div>,
  document.getElementById('root')
);

reportWebVitals();
