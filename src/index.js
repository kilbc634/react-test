import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.compact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import SplitPane from 'react-split-pane';
import { Container , Row } from 'react-bootstrap';
import Sidebar from './Sidebar';
import DashboardZone from './DashboardZone';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
    uri: 'http://127.0.0.1:5000/',
    cache: new InMemoryCache()
});

const styles = {
    background: '#000',
    width: '5px',
    cursor: 'col-resize',
    margin: '0 5px',
    height: '100%',
};

ReactDOM.render(
  <ApolloProvider client={client}>
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
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
