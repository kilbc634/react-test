import React, { Component } from 'react';
import $ from 'jquery';
import sortablejs from 'sortablejs';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';

const ResizableHeader = (props) => {
    const { onResize, width, ...restProps } = props;
    if (!width) {
        return <th {...restProps} />;
    }

    return (
      <Resizable
        width={width}
        height={0}
        handle={
          <span
            className="react-resizable-handle"
            onClick={ e => {
              e.stopPropagation();
            }}
          />
        }
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
};

const droppableClass = 'droppable';
function droppable_highLight() {
    $('.panelArea.addPanel').addClass(droppableClass);
}
function droppable_unLight() {
    $(`.${droppableClass}`).removeClass(droppableClass);
}

class SidebarTable extends Component {
    constructor(props) {
        super(props);
        this.columns = props.columns;
        this.headerMaster = props.headerMaster || false;
        this.onUpdateHeader = props.onUpdateHeader;
        this.dataSource = props.dataSource;
        this.ref = React.createRef();
    }

    handleResize = index => (e, { size }) => {
        e.stopImmediatePropagation();
        this.onUpdateHeader(index, size.width);
    };
  
    componentDidMount() {
        var tableNode = this.ref.current.querySelector('.ant-table-tbody');
        if (this.headerMaster) {
            tableNode.style.display = "none";
        } else {
            sortablejs.create(tableNode, {
                group: {
                    pull: 'clone',
                    put: false
                },
                animation: 150,
                sort: false,
                onStart: (evt) => {
                    droppable_highLight();
                },
                onMove: () => {
                    return -1;
                },
                onEnd: (evt) => {
                    droppable_unLight();
                }
            });
        } 
    }

    shouldComponentUpdate(nextProps) {
        this.columns = nextProps.columns;
        this.dataSource = nextProps.dataSource;
        return true;
    }
  
    render() {
        if (this.headerMaster) {
            const columns = this.columns.map((col, index) => ({
                ...col,
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: this.handleResize(index),
                }),
            }));
            const componentsResize = {
                header: {
                    cell: ResizableHeader,
                },
            };
            return (
                <div ref={this.ref}>
                  <Table
                    columns={columns}
                    components={componentsResize}
                    bordered={true}
                    pagination={false}
                    showHeader={true}
                  />
                </div>
            )
        } else {
            return (
                <div ref={this.ref}>
                  <Table
                    dataSource={this.dataSource}
                    columns={this.columns}
                    bordered={true}
                    pagination={false}
                    showHeader={false}
                  />
                </div>
            )
        }   
    }
}

export default SidebarTable;
