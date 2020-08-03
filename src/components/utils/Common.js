import React from 'react';

class Common{
    static ellipsize(text,maxLength){
        if(!text)return ""
        text = text.trim()
        if(text.length<=maxLength)return text
        return text.substring(0,maxLength)+"..."
    }
    static conditionalRender(label,text,maxLength,newLine=false){
        let result = <noscript/>
        text = this.ellipsize(text,maxLength)
        if(text.length>0)
            result = (
                <div>
                    <b>{label}:&nbsp;</b>{text}{newLine?<br/>:<noscript/>}
                </div>
            )
        return result
    }
}
export default Common;