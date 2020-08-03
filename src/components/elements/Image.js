import React from 'react';
class Image extends React.Component {

    render(){
        return (
            <img alt="" className={this.props.className} src={this.props.src}  
                onError={(e)=>{e.target.onerror = null; e.target.src="https://www.transparenttextures.com/patterns/asfalt-light.png"}}
            />
        )
    }
}
export default Image;