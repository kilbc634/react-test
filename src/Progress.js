// import React from 'react';

function Progress(props){
    return(
        <div>
        <div className="progress-back" style={{backgroundColor:"rgba(0,0,0,0.2)",width:"200px",height:"7px",borderRadius:"10px"}}>
          <div className="progress-bar" style={{backgroundColor:"#fe5196",width:`${props.val}%`,height:"100%",borderRadius:"10px"}}></div>
        </div>
      </div>
    );
}

export default Progress;