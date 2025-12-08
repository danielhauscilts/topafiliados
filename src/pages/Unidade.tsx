import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Boleto from '../components/Boleto';
import env from '../utils/env';

import './Unidade.scss';

const Unidade = () => {

    const { id_unidade } = useParams();
    const [unidade, setUnidade] = useState<any>({});
    const [data, setData] = useState<any>(null);
    const userType:any = window.localStorage.getItem('user');

    // Upload File
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event:any) => {
      setSelectedFiles(Array.from(event.target.files));
    };

    const registerBoleto = async () => {
      if (selectedFiles.length === 0) {
        alert("Please select files to upload.");
        return;
      }

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file); // "files" is the key your backend expects
      });

      formData.append("boleto", JSON.stringify({
                data: `${data.split('/')[2]}-${data.split('/')[1]}-${data.split('/')[0]}`,
                boleto: '',
                unidade: unidade.id
            }));

      await axios.post(`${env}api/boleto`,
            formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                    'Content-Type': 'multipart/formdata'
                }
            }
        ).then(()=>{
            getUnit();
        }).catch((err)=>{
            console.log(err);
        })
    };

    const getUnit = () => {
        axios.get(`${env}api/unit/${id_unidade}`)
            .then((e)=>{
                setUnidade(e.data);
            }).catch((err)=>{
                setUnidade({});
                console.log('Error: ', err);
            })
    }

    useEffect(() => {

        getUnit();

    }, []);

    return (
        <div className='unidade'>
            <Container style={{marginTop: '2rem'}}>
                <Row>
                    <Col md={12}><h3>Unidade {unidade?.unidade}</h3></Col>
                    <Col md={12}>
                        <div className='glass-box'>
                            <Container>
                                <Row>
                                    <Col md={8}><strong>Cliente:</strong> {unidade?.cliente_nome}</Col>
                                    <Col md={4} className='text-end'><strong>Telefone:</strong> {unidade?.cliente_telefone}</Col>
                                </Row>
                                <Row>
                                    <Col md={4}><strong>Corretor:</strong> {unidade?.corretor_nome}</Col>
                                    <Col md={4}><strong>Imobiliaria:</strong> {unidade?.corretor_imobiliaria}</Col>
                                    <Col md={4} className='text-end'><strong>Telefone:</strong> {unidade?.corretor_telefone}</Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    {
                        <Col md={12} className='user-list'>
                            <h3>Extrato financeiro</h3>
                            <ul>
                                {JSON.parse(userType).type === 'adm' && 
                                    <li className='glass-box' style={{marginBottom: '2rem'}}>
                                        <Container>
                                            <Row>
                                                <Col md={2} style={{alignContent: 'center'}}><strong>Cadastrar novo boleto</strong></Col>
                                                <Col md={1} style={{alignContent: 'center'}}>Data</Col>
                                                <Col md={2} style={{alignContent: 'center'}}>
                                                    <Form.Control 
                                                        type='text'
                                                        name='data'
                                                        placeholder='00/00/0000'
                                                        onChange={(e)=>{setData(e.target.value)}}/>
                                                </Col>
                                                <Col md={5} style={{alignContent: 'center'}}>
                                                        <strong>Boleto: </strong><input type="file" id='file' onChange={handleFileChange} multiple />
                                                </Col>
                                                <Col md={2} className='text-end' style={{alignContent: 'center'}}>
                                                    <Button onClick={(e)=>{e.preventDefault();registerBoleto()}}>Cadastrar</Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </li>
                                }
                                {unidade.boletos?.length > 0 &&unidade.boletos?.map((e:any, i:number) => (
                                        <li key={i} className='glass-box'>
                                            <Boleto boleto={e} unidade={unidade?.id} />
                                        </li>
                                    ))}
                            </ul>
                        </Col>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Unidade;