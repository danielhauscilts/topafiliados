
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import env from '../utils/env';

function Boleto (props:any) {

    const user:any = window.localStorage.getItem('user');
    const token:any = window.localStorage.getItem('token');
    const Navigate = useNavigate();

    const changeStatus = (status:string) => {
        axios.put(`${env}api/boleto/${props.boleto.id}`,
            {
                status: status
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(()=>{
            props.boleto.status = status;
            Navigate(`/unidade/${props.unidade}`)
        }).catch((err)=>{
            console.log('error: ', err);
        })
    }

    return (
        <Container>
            <Row>
                <Col md={5} style={{alignContent: "center"}}><strong>Data: </strong>{`${props.boleto.data.split('-')[2]}/${props.boleto.data.split('-')[1]}/${props.boleto.data.split('-')[0]}`}</Col>
                {JSON.parse(user).type !== 'adm' && <Col md={5} style={{alignContent: "center"}}><strong>Situação: </strong>{props.boleto.status}</Col>}
                {JSON.parse(user).type === 'adm' && 
                    <>
                        <Col md={1} style={{alignContent: "center"}}><strong>Situação: </strong></Col>
                        <Col md={4}>
                            {JSON.parse(user).type === 'adm' ?
                                <Form.Select
                                    value={props.boleto.status}
                                    onChange={(e)=>{changeStatus(e.target.value)}}
                                    >
                                        <option value="pendente">Pendente</option>
                                        <option value="pago">Pago</option>
                                        <option value="cancelado">Cancelado</option>
                                </Form.Select>
                            : props.boleto.status }
                        </Col>
                    </>
                }
                <Col md={2} className='text-end'>
                    <Button onClick={(ev)=>{ev.preventDefault();window.open(`/resbellavista/api/${props.boleto.boleto}`, '_blank')}}>Ver boleto</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Boleto;