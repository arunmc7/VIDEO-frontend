//import axios library

import axios from "axios";

//axios used : no need of seperate api calling which will make the process slow

//function definition commonrequest

export const commonRequest=async(method,url,body)=>{

    //request configuration---given in object format

    let reqConfig={
        url,
        method,
        //data to be uploaded---to post mainly---to get not required
        data:body,
        //header not compulsory
        headers:{
            //if no file involved ---application/json--------if file to be uploaded then the contenttype will be multipart/form data
            "content-type":"application/json"

        }


    }

    //api call using axios library

    return await axios(reqConfig).then((response)=>{
        return response

    }).catch((error)=>{
        return error
    })




}