import React, { Component } from 'react';
import sortablejs from 'sortablejs';
import { Table } from 'antd';

class Sortable extends Component {
    constructor(props) {
        super(props);
        this.dataSource = props.dataSource;
        this.columns = props.columns;
        this.sortableContainer = React.createRef();
    }
  
    componentDidMount() {
        var tableNode = document.querySelector('.tableClass .ant-table-tbody');
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
        <div className="tableClass">
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
