import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SelectFeed from "./SelectFeed";
import SubmitFeed from "./SubmitFeed";

function AddStory() {
const [files, setFiles] = useState([]);
const [imageURLs, setImageURLs] = useState([]);
const [imgname, setImgname] =useState([])
const [imgtype, setImgtype] = useState([])
const [onSelected, setOnselected] = useState(false);


//어려웠따 1.
return (
    !onSelected
    ?<SelectFeed setImgtype ={setImgtype} setImgname={setImgname} setOnselected={setOnselected} files={files} setFiles={setFiles} imageURLs={imageURLs} setImageURLs={setImageURLs}/>
    :<SubmitFeed setFiles={setFiles} setImageURLs={setImageURLs} setImgtype={setImgtype} imgname={imgname} imgtype={imgtype} imageURLs={imageURLs} setOnselected={setOnselected}/>
    );  
}

export default AddStory;
