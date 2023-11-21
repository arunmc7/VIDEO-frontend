import { BASE_URL } from "./baseurl";
import { commonRequest } from "./commonrequest";

//to add video

export const addVideo=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/videos`,body)
}

//to get video from server

export const getVideo=async()=>{
    return await commonRequest("GET",`${BASE_URL}/videos`,"")
}

//to delete video

export const deleteVideo=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}

//add categories

export const addCategory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/categories`,body)
}

//get all categories

export const getallCategories=async()=>{
    return await commonRequest("GET",`${BASE_URL}/categories`,"")
}

//delete categories

export const deleteCategory=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/categories/${id}`,{},)
}

// get history

 export  const gethistory=async()=>{
    return await commonRequest("GET",`${BASE_URL}/watchhistory`,"")
   }


//add history

export const Addhistory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/watchhistory`,body)
}

//get single card features for drag and drop

export const getVideos=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/videos/${id}`,"")
}


//to update card details in category section------crud operation to update is "PUT"

export const updateCategory=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/categories/${id}`,body)
}




