import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import './Review.scss';

import env from '../utils/env';

const Review = () => {

    const [users, setUsers] = useState<any[]>([]);
    const [plano20, setPlano20] = useState(0);
    const [plano120, setPlano120] = useState(0);
    const [total, setTotal] = useState(0);

    const reset = () => {
        axios.get(`${env}/api/review/${new Date().getFullYear()+'-'+(new Date().getMonth() < 10 ? '0' : '')+((new Date().getMonth())+1)+'-'+new Date().getDate()}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }
        )
        .then((e)=>{
            setUsers(e.data);

            let plain20 = 0;
            let plain120 = 0;
            let totalSite = 0;

            e.data.map((a:any) => {
                if(a.button == 'cadastro_plano_20') {
                    plain20 = plain20 + Number(a.contagem)
                }
                if(a.button == 'cadastro_plano_120') {
                    plain120 = plain120 + Number(a.contagem)
                }
                if(a.button == 'acesso_home' || a.button == 'acesso_home_mae') {
                    totalSite = totalSite + Number(a.contagem)
                }
            })

            setPlano20(plain20);
            setPlano120(plain120);
            setTotal(totalSite);
        })
    }

    useEffect(()=>{
        reset();
    }, [])

    return (
        <>
        <div className='content count'>
            <Container>
                <Row>
                    <Col>
                        <h1>Acessos totais</h1>
                        <p style={{fontSize: '3rem', fontWeight: 'bold'}}>{total}</p>
                    </Col>
                </Row>
                <Row>
                    <Col><h1>Cliques nos planos</h1></Col>
                </Row>
                <Row style={{textAlign: 'center'}}>
                    <Col xs={6}>
                        <div style={{padding: '.5rem .5rem .15rem', backgroundColor: '#ededed', borderRadius: '5px'}}>
                            <div style={{fontWeight: 'bold'}}>Plano Mensal</div>
                            <p><span style={{color: '#000'}}>{plano20}</span></p>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div style={{padding: '.5rem .5rem .15rem', backgroundColor: '#ededed', borderRadius: '5px'}}>
                            <div style={{fontWeight: 'bold'}}>Plano Anual</div>
                            <p><span style={{color: '#000'}}>{plano120}</span></p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col><h1>Eventos</h1></Col>
                </Row>
                {users && users.length > 0 && users.map((e, i) => (
                    <>
                        <Row key={i} style={{borderBottom: 'solid 1px #CCC', margin: '.5rem .25rem', padding: '0 0 .5rem'}}>
                            <Col xs={12} sm={4} md={4} lg={4}><strong>{e.page}</strong></Col>
                            <Col xs={6} sm={4} md={4} lg={4}>{e.button}</Col>
                            <Col xs={6} sm={4} md={4} lg={4} style={{textAlign: 'right'}}>{e.contagem}</Col>
                        </Row>
                    </>
                ))}
            </Container>
        </div>
        </>
    )
}

export default Review;