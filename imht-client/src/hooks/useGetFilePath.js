const useGetFilePath = () =>{

    const getFilePath = (img) =>{
        if(img){
            return "http://localhost:1100/uploads/" + img
        }else{
            return "/noavatar.png"
        }
    }

    return {getFilePath}

}
export default useGetFilePath