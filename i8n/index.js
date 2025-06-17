const fs=require("fs")
const getmessage=(data)=>{
    const temp=(message)=>{
        return data[message]
    }
    return  temp
}
const getlang=(lang)=>{
    if(fs.existsSync(`./lang/${lang}.json`)){
        return getmessage(require(`./lang/${lang}.json`))
    }
}
console.log(getlang("fr")("test"))