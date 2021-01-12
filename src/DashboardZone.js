import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import sortablejs from 'sortablejs';
import CanvasJSReact from './canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function generateDataPoints(noOfDps) {
  var xVal = 1, yVal = 100;
  var dps = [];
  for(var i = 0; i < noOfDps; i++) {
    yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
    dps.push({x: xVal,y: yVal});	
    xVal++;
  }
  return dps;
}

const options = {
  theme: "light2", // "light1", "dark1", "dark2"
  animationEnabled: true,
  zoomEnabled: true,
  title: {
    text: "Try Zooming and Panning"
  },
  data: [{
    type: "area",
    dataPoints: generateDataPoints(500)
  }]
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
                    let dataKey = evt.item.attributes['data-row-key'].value;
                    this.includePanel(dataKey);
                    evt.item.remove();
                }
            }
        });
    }

    includePanel = (dataKey) => {
        // GET panel data with dataKey
        
        this.setState((state) => {
            const nextPanelCount = state.panelCount + 1;
            const nextPanelList = [...state.panelList];
            nextPanelList.push(
              <Row key={nextPanelCount}>
                <CanvasJSChart options = {options} />
              </Row>
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
