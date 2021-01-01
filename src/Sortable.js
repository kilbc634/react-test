import React, { Component } from 'react';
import sortablejs from 'sortablejs';
import { Table } from 'antd';

class Sortable extends Component {
    constructor(props) {
        super(props);
        this.dataSource = props.dataSource;
        this.columns = props.columns;
        this.ref = React.createRef();
    }
  
    componentDidMount() {
        var tableNode = this.ref.current.querySelector('.ant-table-tbody');
        sortablejs.create(tableNode, {
            group: {
                pull: 'clone',
                put: false
            },
            animation: 150,
            sort: true
        });
    }
  
    render() { return (
        <div ref={this.ref}>
            <Table
              dataSource={this.dataSource}
              columns={this.columns}
              bordered={true}
              pagination={false}
              showHeader={false}
            />
        </div>
    )};
};

export default Sortable;
