import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import sortablejs from 'sortablejs';
import CanvasJSReact from './canvasjs.react';
import { useQuery } from '@apollo/client';
import { GQL_getOptionData } from './gql_query/gql_optionData';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PanelComponent(props) {
    var dataCode = props.dataCode;
    const { loading, error, data } = useQuery(GQL_getOptionData, {
        variables: {
            "code": dataCode,
            "type": "weapon"
        }
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;
    const options = {
        theme: "light2", // "light1", "dark1", "dark2"
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: `${data['getOptionData']['code']} (${data['getOptionData']['type']})`
        },
        data: [{
          type: "area",
          dataPoints: generateDataPoints(data['getOptionData']['priceDatas'], 's6')
        }]
    }
    return (
      <Row>
        <CanvasJSChart options = {options} />
      </Row>
    );
}

function generateDataPoints(datas, dataKey) {
    var dataPoints = datas.map(data => {
        return {
            x: Number(data['timestamp']),
            y: data[dataKey]
        }
    });
    return dataPoints;
}

class DashboardZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelCount: 0,
            panelList: []
        }
        this.newPanelAreaRef = React.createRef();
    }

    componentDidMount() {
        this.initPanelArea();
    }

    componentDidUpdate() {
        this.initPanelArea();
    }

    initPanelArea = () => {
        var panelAreaNode = this.newPanelAreaRef.current;
        sortablejs.create(panelAreaNode, {
            group: {
                pull: false,
                put: (to) => {
                    return to.el.children.length <= 1;
                }
            },
            animation: 150,
            sort: false,
            ghostClass: 'sortable-ghost-hide',
            onAdd: (evt) => {
                evt.item.style.display = 'none';
                if (evt.from.classList.contains('ant-table-tbody')) {
                    let dataCode = evt.item.attributes['data-row-key'].value;
                    this.includePanel(dataCode);
                    evt.item.remove();
                }
            }
        });
    }

    includePanel = (dataCode) => {
        this.setState((state) => {
            const nextPanelCount = state.panelCount + 1;
            const nextPanelList = [...state.panelList];
            nextPanelList.push(
                <PanelComponent dataCode="AA0204" key={nextPanelCount}/>
            )
            return {
                panelCount: nextPanelCount,
                panelList: nextPanelList
            }
        });
    }

    render() {
        return (
          <div className="panel-list">
            {this.state.panelList}
            <Row ref={this.newPanelAreaRef} className="panelArea addPanel">
              <Row className="panelArea justify-content-center align-items-center">
                <div>Please Drag and Drop element for this Area</div>
              </Row>
            </Row>
          </div>
        )
    }
}

export default DashboardZone;
