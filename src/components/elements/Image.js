import React from 'react';
class Image extends React.Component {

    render(){
        return (
            <img alt="" className={this.props.className} src={this.props.src}  
                onError={(e)=>{e.target.onerror = null; e.target.src="https://www.umass.edu/art/sites/default/files/store/img/cfm/plain-white-background_1.jpg"}}
            />
        )
    }
}
export default Image;