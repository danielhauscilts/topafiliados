import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import { FaTrashAlt } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";

import './Bio.scss';

import env from '../utils/env';

import idImage from '../assets/id_afiliado.png';

const Bio = () => {

    const [bio, setBio] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);

    const [name, setName] = useState<any>(null);
    const [nickname, setNickname] = useState<any>(null);
    const [idAfiliado, setIdAfiliado] = useState<any>(null);
    const [descricao, setDescricao] = useState<any>(null);

    const [success, setSuccess] = useState<any>(false);
    const [error, setError] = useState<any>(false);

    const user = JSON.parse(window.localStorage.getItem('user') || '');

    const getBio = () => {
        axios.get(`${env}/api/bio/${user?.id}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }
        )
        .then((e)=>{
            setBio(e.data);
            setName(e.data.name);
            setNickname(e.data.nickname);
            setProducts(e.data.produtos);
            setIdAfiliado(e.data.id_afiliado);
            setDescricao(e.data.descricao);

            console.log('produtos', e.data.produtos);
        }).catch(()=>{
            setBio(null);
            setProducts([]);
        })
    }

    useEffect(()=>{
        getBio();
    }, []);

    const regBio = () => {
        axios.post(`${env}/api/bio`,
            {
                name: name,
                nickname: nickname,
                id_user: user.id,
                id_afiliado: idAfiliado,
                descricao: descricao
            }
        ).then(()=>{
            setSuccess(true);
            setTimeout(()=>{setSuccess(false);}, 3000);
            getBio();
        }).catch(()=>{
            setError(true);
            setTimeout(()=>{setError(false);}, 3000);
        })
    }

    const altBio = () => {
        axios.put(`${env}/api/bio`,
            {
                id: bio.id,
                name: name,
                nickname: nickname,
                id_user: user.id,
                id_afiliado: idAfiliado,
                descricao: descricao
            }
        ).then(()=>{
            setSuccess(true);
            setTimeout(()=>{setSuccess(false);}, 3000);
            getBio();
        }).catch(()=>{
            setError(true);
            setTimeout(()=>{setError(false);}, 3000);
        })
    }

    const delProduct = (idP: any) => {
        if(confirm('Deseja realmente remover este produto?')) {
            axios.delete(`${env}/api/bio-produtos/${idP}`
                ).then(()=>{
                    getBio();
                }).catch(()=>{
                    getBio();
                })
        }
    }

    const [how, setHow] = useState<boolean>(false);

    return (
        <>
        <div className='content bio'>
            <Container>
                <Row className='register' style={{alignItems: 'start'}}>
                    <Col md={12}><h1>Link da Bio</h1></Col>
                    {bio && (
                        <Col md={12}>
                            <p className='link-page'>
                                Link para a página: <a href={`https://afilipro.com.br/b/${bio.nickname}`} target='_blank'><strong></strong>https://afilipro.com.br/b/{bio.nickname}</a>
                            </p>
                        </Col>
                    )}
                    {!bio && (
                        <>
                            <Col md={4}>
                                <p><strong>Nome da loja</strong></p>
                                <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder='Nome da Loja' />
                            </Col>
                            <Col md={4}>
                                <p><strong>Identificador da Loja</strong></p>
                                <input type="text" onChange={(e)=>{setNickname(e.target.value)}} placeholder='Identificador: ex. nomedaloja' />
                            </Col>
                            <Col md={4}>
                                <p><strong>ID Afiliado Shopee <small></small></strong></p>
                                <input type="text" onChange={(e)=>{setIdAfiliado(e.target.value)}} placeholder='ID Afiliado: ex. 123456789' />
                            </Col>
                            <Col md={12}>
                                <p><strong>Descrição</strong></p>
                                <textarea onChange={(e)=>{setDescricao(e.target.value)}}></textarea>
                            </Col>
                            <Col md={12}>
                                <Button onClick={(e)=>{e.preventDefault();regBio();}}>Cadastrar</Button>
                            </Col>
                            <Col md={6}>
                                <div style={{textAlign: 'center', margin: '2rem 0'}}>
                                    <p><strong>Como conseguir meu ID de Afiliado?</strong></p>
                                    <p>Acesse <a href="https://affiliate.shopee.com.br/account_setting" target='_blank'>seu painel Shopee</a> , com seu login da Shopee, copie e cole no campo ID Afiliado o número conforme exemplo na imagem.</p>
                                </div>
                            </Col>
                            <Col md={12} onClick={()=>{setHow(!how)}} style={{textAlign: 'center', padding: '.5rem', borderTop: 'solid 1px orangered', marginTop: '1rem', cursor: 'pointer'}}>
                                <strong>Como pegar o ID Afiliado Shopee? Clique aqui</strong>
                            </Col>
                            {how && (
                                <>
                                    <Col md={6}>
                                        <div style={{textAlign: 'center', margin: '2rem 0'}}>
                                            <p><strong>Como conseguir meu ID de Afiliado?</strong></p>
                                            <p>Acesse <a href="https://affiliate.shopee.com.br/account_setting" target='_blank'>seu painel Shopee</a> , com seu login da Shopee, copie e cole no campo ID Afiliado o número conforme exemplo na imagem.</p>
                                        </div>
                                    </Col>
                                    <Col md={6} style={{marginTop: '2rem'}}>
                                        <p><img src={idImage} alt="ID Afiliado" width="100%" /></p>
                                    </Col>
                                </>
                            )}
                        </>
                    )}
                    {bio && (
                        <>
                            <Col md={4}>
                                <p><strong>Nome da loja</strong></p>
                                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Nome da Loja' />
                            </Col>
                            <Col md={4}>
                                <p><strong>Identificador da Loja</strong></p>
                                <input type="text" value={nickname} onChange={(e)=>{setNickname(e.target.value)}} placeholder='Identificador: ex. nomedaloja' />
                            </Col>
                            <Col md={4}>
                                <p><strong>ID Afiliado Shopee</strong></p>
                                <input type="text" value={idAfiliado} onChange={(e)=>{setIdAfiliado(e.target.value)}} placeholder='ID Afiliado: ex. 123456789' />
                            </Col>
                            <Col md={12}>
                                <p><strong>Descrição</strong></p>
                                <textarea value={descricao} onChange={(e)=>{setDescricao(e.target.value)}}></textarea>
                            </Col>
                            <Col md={12}>
                                <Button onClick={(e)=>{e.preventDefault();altBio();}}>Alterar</Button>
                            </Col>
                            <Col md={12} onClick={()=>{setHow(!how)}} style={{textAlign: 'center', padding: '.5rem', borderTop: 'solid 1px orangered', marginTop: '1rem', cursor: 'pointer'}}>
                                <strong>Como pegar o ID Afiliado Shopee? Clique aqui</strong>
                            </Col>
                            {how && (
                                <>
                                    <Col md={6}>
                                        <div style={{textAlign: 'center', margin: '2rem 0'}}>
                                            <p><strong>Como conseguir meu ID de Afiliado?</strong></p>
                                            <p>Acesse <a href="https://affiliate.shopee.com.br/account_setting" target='_blank'>seu painel Shopee</a> , com seu login da Shopee, copie e cole no campo ID Afiliado o número conforme exemplo na imagem.</p>
                                        </div>
                                    </Col>
                                    <Col md={6} style={{marginTop: '2rem'}}>
                                        <p><img src={idImage} alt="ID Afiliado" width="100%" /></p>
                                    </Col>
                                </>
                            )}
                        </>
                    )}
                    {(error || success) && (
                        <Col md={12}>
                            <p>{error ? 'Houve um erro ao cadastrar' : ''}{success ? 'Bio cadastrado com sucesso':''}</p>
                        </Col>
                    )}
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1>Produtos</h1>
                    </Col>
                </Row>
                <Row>
                    {products.length > 0 && products.map((e, i) => (
                        <Col md={6} key={i}>
                            <div className='produto_detail'>
                                <div style={{textAlign: 'center'}}>
                                    <img src={`https://afilipro.com.br/api/${e.capa}`} alt={e.titulo} height={70} /><br />
                                    <a href={`${env.indexOf('localhost')>-1?env:'/api'}/${e.capa}`} title="ImageName" download={e.capa} style={{display: 'block', textWrap: 'nowrap', marginTop: '1rem'}}>
                                        Baixar Capa <FaFileDownload />
                                    </a>
                                </div>
                                <div style={{padding: '0 1rem'}}>
                                    <p>{e.titulo}</p>
                                    <Button onClick={(el)=>{
                                        el.preventDefault();
                                        navigator.clipboard.writeText(e.link).then(() => {
                                            // Optional: Provide user feedback
                                            alert('Link copiado');
                                        });
                                    }}>Copiar link rastreável</Button>
                                </div>
                                <div onClick={()=>{delProduct(e.id)}}><FaTrashAlt /></div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Bio;