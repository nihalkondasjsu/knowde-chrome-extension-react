import React from 'react';
import Producer from './elements/Producer';
import Brand from './elements/Brand';
import Product from './elements/Product';
class SERP extends React.Component {
    
    state={
        data:{}
    }

    render() {
        console.log(this.props)
        console.log(this.state.data)
        
        const keywords = []

        for (const key of Object.keys(this.state.data)) {
            const keyword = this.state.data[key]
            keyword.score = keyword['font_sizes'].reduce(function(a, b){
                return a + b;
            }, 0);
            keywords.push(keyword)
        }

        keywords.sort(function(a,b){
            return parseFloat(b.score) - parseFloat(a.score);
        })

        const cards = []
        
        for (const keyword of keywords) {
            if(keyword["type"]==="C"){
                cards.push(<Producer value={keyword["str"]} key={keyword["str"]}/>)
            }else if(keyword["type"]==="B"){
                cards.push(<Brand value={keyword["str"]} key={keyword["str"]}/>)
            }else if(keyword["type"]==="P"){
                cards.push(<Product value={keyword["str"]} key={keyword["str"]}/>)
            }else {

            }
        }

        return (
            <div className="card-container">
                <img alt="Knowde" className="main-img" src="https://static.knowde.com/knowde-logo/main-logo-1.svg"/>
                <br/>
                {cards}
            </div>
            );
    }

    componentDidMount(){
        try {
            console.log('componentDidMount',window.location.search)
            this.setState({
                data:JSON.parse(window.atob(window.location.search.replace("?","")))
            })
        } catch (error) {
            console.log(error)
        }
        // this.bindEvent(window, 'message',this.msgHandler);
    }
}
export default SERP;


    /*
    bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        }
    }

    msgHandler(e) {
        console.log(e)
        if (!e.data) {
          // console.info(e.data.url);
          return;
        }
    
        this.setState({data:e.data})
      }
    */  