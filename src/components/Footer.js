import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquarePlus, faUser} from "@fortawesome/free-regular-svg-icons"
import { faHouse, faMagnifyingGlass,faFilm} from "@fortawesome/free-solid-svg-icons"
import { useNavigate,Link } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
    const addStory= ()=>{
      navigate('/addFeed')
    }
    const toProfile = ()=>{
        navigate("/profile")
    }
    const toHome = ()=>{
        navigate("/")
    }
    const toSearch=()=>{
        navigate('/searchUser')
    }
    return (
    <footer className="Footer">
                <table>
                    <tbody>
                    <tr>
                        <td onClick={toHome}>
                            <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff"}} />
                        </td>
                        <td onClick={toSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ffffff"}} />
                        </td>
                        <td>
                            <FontAwesomeIcon icon={faSquarePlus} onClick={addStory} style={{color: "#ffffff"}} />
                        </td>
                        <td>
                            <FontAwesomeIcon icon={faFilm} style={{color: "#ffffff"}} />
                        </td>
                        <td onClick={toProfile}>
                            <FontAwesomeIcon icon={faUser} style={{color: "#ffffff"}} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </footer>
  )
}

export default Footer