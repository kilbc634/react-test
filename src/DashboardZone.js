import React, { Component, useState } from 'react';
import { Row } from 'react-bootstrap';
import { Space } from 'antd'
import sortablejs from 'sortablejs';
import PostPriceDataButton from './PostPriceData';
import ChangePriceDataButton from './ChangePriceData';
import CanvasJSReact from './canvasjs.react';
import { useQuery } from '@apollo/client';
import { GQL_getOptionData } from './gql_query/gql_optionData';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function generateDataPoints(datas, dataKey) {
    var noData = true;
    var dataPoints = datas.map(data => {
        if (noData && data[dataKey]) {
            noData = false;
        }
        return {
            x: Number(data['timestamp']),
            y: data[dataKey] || null
        }
    });
    if (noData) {
        return [];
    } else {
        return dataPoints;
    }
}

function generateDataSetting(datas, dataKey, type='area') {
    var dataPoints = generateDataPoints(datas, dataKey.toLowerCase())
    var setting = {
        type: type,
        //fillOpacity: 1,
        legendText: dataKey.toUpperCase(),
        showInLegend: true,
        xValueType: 'dateTime',
        dataPoints: dataPoints
    }
    return setting;
}

function PanelComponent(props) {
    const dataCode = props.dataCode;
    const [dataType, setDataType] = useState('unit');
    const updateDataType = (type) => {
        if (['weapon', 'unit'].includes(type)) {
            setDataType(type);
        }
    }
    const [socketShow, setSocketShow] = useState(['s6', 's7', 's8']);
    const updateSocketShow = (socketList) => {
        let newSocketList = socketList.map((socket) => {
            let lowerCase = socket.toLowerCase();
            if (['any', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'].includes(lowerCase)) {
                return lowerCase;
            }
        });
        setSocketShow(newSocketList);
    }
    const { loading, error, data, refetch } = useQuery(GQL_getOptionData, {
        variables: {
            "code": dataCode,
            "type": dataType
        }
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;
    var options = {};
    if (data['getOptionData']['priceDatas'].length == 0) {
        options = {
            theme: "dark1", // "light1", "light2", "dark1", "dark2"
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
        const dataKeys = socketShow.sort().reverse();
        const dataSettings = dataKeys.map((dataKey) => {
            return generateDataSetting(data['getOptionData']['priceDatas'], dataKey);
        });
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
            data: dataSettings
        }
    }
    return (
      <Row>
        <Space>
          <PostPriceDataButton
            itemCode={data['getOptionData']['code']}
            itemType={data['getOptionData']['type']}
            refetch={refetch}
          />
          <ChangePriceDataButton
            defaultItemType={data['getOptionData']['type']}
            defaultScoketShow={socketShow}
            toChange={updateDataType}
          />
        </Space>
        
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
