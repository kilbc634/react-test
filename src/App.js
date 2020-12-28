import React, { Component } from 'react';

class App extends Component{
  constructor(props) {
    super(props);
    this.percent = "10%"
  }

  render(){
    return(
      <div>
        <div className="progress-back" style={{backgroundColor:"rgba(0,0,0,0.2)",width:"200px",height:"7px",borderRadius:"10px"}}>
          <div className="progress-bar" style={{backgroundColor:"#fe5196",width:this.percent,height:"100%",borderRadius:"10px"}}></div>
        </div>
      </div>
    );
}
}

export default App;
