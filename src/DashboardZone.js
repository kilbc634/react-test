import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import sortablejs from 'sortablejs';
import PostPriceDataButton from './PostPriceData';
import CanvasJSReact from './canvasjs.react';
import { useQuery } from '@apollo/client';
import { GQL_getOptionData } from './gql_query/gql_optionData';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function generateDataPoints(datas, dataKey) {
    var dataPoints = datas.map(data => {
        return {
            x: Number(data['timestamp']),
            y: data[dataKey] || null
        }
    });
    return dataPoints;
}

function PanelComponent(props) {
    var dataCode = props.dataCode;
    const { loading, error, data, refetch } = useQuery(GQL_getOptionData, {
        variables: {
            "code": dataCode,
            "type": "weapon"
        }
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;
    var options = {};
    if (data['getOptionData']['priceDatas'].length == 0) {
        options = {
            theme: "dark2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: `${data['getOptionData']['code']} (${data['getOptionData']['type']})`
            },
            subtitles: [{
                text: "NO DATA",
                fontSize: 70,
                verticalAlign: 'center'
            }],
            data: [
                {
                    type: 'area',
                    dataPoints: null
                }
            ]
        }
    } else {
        options = {
            theme: 'dark1', // "light1", "light2", "dark1", "dark2"
            animationEnabled: true,
            zoomEnabled: true,
            title: {
                text: `${data['getOptionData']['code']} (${data['getOptionData']['type']})`
            },
            legend: {
                horizontalAlign: 'center',
                verticalAlign: 'top'
            },
            data: [
                {
                    type: 'area',
                    //fillOpacity: 1,
                    legendText: "S8",
                    showInLegend: true,
                    xValueType: 'dateTime',
                    dataPoints: generateDataPoints(data['getOptionData']['priceDatas'], 's8')
                },
                {
                    type: 'area',
                    //fillOpacity: 1,
                    legendText: "S7",
                    showInLegend: true,
                    xValueType: 'dateTime',
                    dataPoints: generateDataPoints(data['getOptionData']['priceDatas'], 's7')
                },
                {
                    type: 'area',
                    //fillOpacity: 1,
                    legendText: "S6",
                    showInLegend: true,
                    xValueType: 'dateTime',
                    dataPoints: generateDataPoints(data['getOptionData']['priceDatas'], 's6')
                }
            ]
        }
    }
    return (
      <Row>
        <PostPriceDataButton
          itemCode={data['getOptionData']['code']}
          itemType={data['getOptionData']['type']}
          onPosted={refetch}
        />
        <CanvasJSChart options={options}/>
      </Row>
    );
}

class DashboardZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelCount: 0,
            panelList: [],
            codeList: []
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
                    if (!this.state.codeList.includes(dataCode)) {
                        this.includePanel(dataCode);
                    }
                    evt.item.remove();
                }
            }
        });
    }

    includePanel = (dataCode) => {
        this.setState((state) => {
            const nextPanelCount = state.panelCount + 1;
            const nextCodeList = [...state.codeList];
            nextCodeList.push(dataCode);
            const nextPanelList = [...state.panelList];
            nextPanelList.push(
                <PanelComponent dataCode={dataCode} key={state.panelCount}/>
            );
            return {
                panelCount: nextPanelCount,
                panelList: nextPanelList,
                codeList: nextCodeList
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
