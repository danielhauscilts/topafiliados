import { useState, useEffect } from 'react';
import axios from 'axios';

import './Bio.scss';

import env from '../utils/env';

const Validate = () => {

    const [links, setLinks] = useState<any[]>([]);
    let vl = new Array();

    const getLink = () => {
        axios.get(`${env}/api/links`,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }
        )
        .then((e)=>{
            setLinks(e.data);
            vl = [];
            e.data.map((a:any,i:any)=>{
                vl[i] = a;
            })
        }).catch(()=>{
            setLinks([]);
        })
    }

    useEffect(()=>{
        getLink();
    }, []);

    const update = (id:any, link:any) => {

        axios.put(`${env}/api/link`,
            {
                id: id,
                link: link
            }
        ).then(()=>{
            getLink();
        })
    }

    return (
        <>
            <table>
                {(links && links.length) > 0 && links.map((e,i)=>(
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.titulo}</td>
                        <td><a href={e.link} target='_blank'>{e.link}</a></td>
                        <td><input type="text" onChange={(e)=>{vl[i]=e.target.value}} id={`ipt${i}`} /></td>
                        <td><button onClick={()=>{update(e.id, vl[i])}}>Alt</button></td>
                    </tr>
                ))}
            </table>
            <ul style={{margin: '2rem 0'}}>
                
            </ul>
        </>
    )
}

export default Validate;