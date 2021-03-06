import React from 'react';
import Image from './Image';
import Common from '../utils/Common';

class Producer extends React.Component {

    state = {
        loaded:false,
        title:"",
        seo_url:"",
        brands_count:"",
        products_count:"",
        hq:"",
        logo:"https://www.transparenttextures.com/patterns/asfalt-light.png",
        picture:"https://www.transparenttextures.com/patterns/asfalt-light.png",
        display:'inline-block'
    }

    loadContent(json){
        try {
            if(!json["total_count"])throw new Error('NotFound')
            if(json["total_count"]===0)throw new Error('NotFound')
            json = json["data"]["hits"]["hits"][0]
            const source = json["_source"]
            
            console.log(source)

            const id = source["id"]
            
            const title = source["full_name"]
            const seo_url = source["seo_url"]
            const products_count = source["products_count"]
            const brands_count = source["brands_count"]
            const hq = source["hq_country"]

            const logo = "https://res.cloudinary.com/deb7dco1z/image/upload/w_128/v1595957116648/production/Company/"+id+"/logo/image.webp"
            const picture = "https://res.cloudinary.com/deb7dco1z/image/upload/w_512/v1595957116648/production/Company/"+id+"/card_banner/image.webp"

            this.setState({
                id,title,seo_url,products_count,brands_count,hq,logo,picture,
                loaded:true
            })

            console.log(this.state)

        } catch (error) {
            console.log(error)
            this.setState({
                display:'none'
            })
        }
    }

    componentDidMount(){
        fetch("https://cors-anywhere.herokuapp.com/https://be.knowde.com/api/v2/dynamic_search",{
            method: 'post',
            headers: {
                'mode': 'no-cors',
                'sec-fetch-mode': 'no-cors',
                // 'sec-fetch-site': 'same-site',
                // 'origin': 'https://www.knowde.com',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "search_term": this.props.value,
                "page": "1",
                "per_page": "1",
                "filters": {},
                "any_match": true,
                "sort_by": "",
                "order_by": "",
                "only_naturals": "false",
                "extend_search": false,
                "document_type": "all_documents",
                "panel_filter": "producers",
                "group_filter": "ungrouped",
                "hide_blends": "false"
            })
        }).then((response)=>{
            response.json().then((json)=>{
                console.log(json)
                this.loadContent(json)
            })
        })
    }

    openSeoUrl = () =>{
        if(this.state.loaded === false)
            return
        window.parent.postMessage({
            type:'open_page',
            link:'https://www.knowde.com/companies/'+this.state.seo_url
        }, '*');
    }

    render(){
        return (
            <div className="card" style={{display:this.state.display}} onClick={this.openSeoUrl}>
                <div className="header">
                    <Image className="header-img" src={this.state.picture}/>
                </div>
                <div className="body">
                    <Image className="logo-img" src={this.state.logo}/>
                    <p className="title">{this.state.title}</p>
                    <p className="text">
                        {Common.conditionalRender("Brands",this.state.brands_count.toString(),70,true)}
                        {Common.conditionalRender("Products",this.state.products_count.toString(),70,true)}
                        {Common.conditionalRender("HQ",this.state.hq.toString(),70)}
                    </p>
                </div>
            </div>
        )
    }
}
export default Producer;