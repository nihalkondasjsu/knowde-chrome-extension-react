import React from 'react';
import Image from './Image';
import Common from '../utils/Common';
class Product extends React.Component {

    state = {
        loaded:false,
        title:"",
        seo_url:"",
        incis:[],
        categories:[],
        logo:"https://www.transparenttextures.com/patterns/asfalt-light.png",
        picture:"https://www.transparenttextures.com/patterns/asfalt-light.png"
    }

    loadContent(json){
        try {
            if(!json["total_count"])return
            if(json["total_count"]===0)return
            json = json["data"]["hits"]["hits"][0]
            const source = json["_source"]
            
            console.log(source)

            const id = source["id"]
            
            const title = source["full_name"]
            const seo_url = source["seo_url"]
            
            const inci_tags = source["inci_tags"]
            const incis = []
            for (const inci of inci_tags) {
                incis.push(inci["name"])
            }
            
            const category_tags = source["category_tags"]
            const categories = []
            for (const category of category_tags) {
                categories.push(category["name"])
            }

            const logo = "https://res.cloudinary.com/deb7dco1z/image/upload/w_128/v1595957116648/production/Product/"+id+"/logo/image.webp"
            const picture = "https://res.cloudinary.com/deb7dco1z/image/upload/w_512/v1595957116648/production/Product/"+id+"/card_banner/image.webp"

            this.setState({
                id,title,seo_url,incis,categories,logo,picture,
                loaded:true
            })

            console.log(this.state)

        } catch (error) {
            console.log(error)
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
                "panel_filter": "all_products",
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
            link:'https://www.knowde.com/products/'+this.state.seo_url
        }, '*');
    }

    render(){
            
        return (
            <div className="card" onClick={this.openSeoUrl}>
                <div className="header">
                    <Image className="header-img" src={this.state.picture}/>
                </div>
                <div className="body">
                    <Image className="logo-img" src={this.state.logo}/>
                    <p className="title">{this.state.title}</p>
                    <p className="text">
                        {Common.conditionalRender("INCIs",this.state.incis.join(', '),70,true)}
                        {Common.conditionalRender("Categories",this.state.categories.join(', '),70)}
                    </p>
                </div>
            </div>
        )
    }
}
export default Product;