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
    const [instagram, setInstagram] = useState<any>(null);
    const [shopee, setShopee] = useState<any>(null);
    const [tiktok, setTiktok] = useState<any>(null);
    const [grupoWhatsapp, setGrupoWhatsapp] = useState<any>(null);
    const [cor, setCor] = useState<any>(null);
    // const [thumb, setThumb] = useState<any>(null);

    const [success, setSuccess] = useState<any>(false);
    const [error, setError] = useState<any>('');

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
            setShopee(e.data.shopee);
            setInstagram(e.data.instagram);
            setTiktok(e.data.tiktok);
            setGrupoWhatsapp(e.data.grupo_whatsapp);
            setCor(e.data.cor);
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
                descricao: descricao,
                shopee: shopee,
                instagram: instagram,
                tiktok: tiktok,
                grupoWhatsapp: grupoWhatsapp,
                cor: cor
            }
        ).then(()=>{
            setSuccess(true);
            setTimeout(()=>{setSuccess(false);}, 3000);
            getBio();
        }).catch((err)=>{
            if(err.response.data.error === 'Page exist'){
                setError('O identificador da página escolhida já existe');
            } else {
                setError('Erro ao cadastrar');
            }
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
                descricao: descricao,
                shopee: shopee,
                instagram: instagram,
                tiktok: tiktok,
                grupoWhatsapp: grupoWhatsapp,
                cor: cor
            }
        ).then(()=>{
            setSuccess(true);
            setTimeout(()=>{setSuccess(false);}, 5000);
            getBio();
        }).catch(()=>{
            setError(true);
            setTimeout(()=>{setError(false);}, 5000);
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

    useEffect(()=>{
        if (name) {
            setNickname(name.replace(/ /gi, '').toLowerCase());
        }
    }, [name]);

    return (
        <>
        <div className='content bio'>
            <Container>
                <Row className='register' style={{alignItems: 'start'}}>
                    <Col md={12}><h1>Link da Bio</h1></Col>
                    {bio && (
                        <Col md={12}>
                            <p className='link-page'>
                                Link para a página: <a href={`https://link-sqb.shop/b/${bio.nickname}`} target='_blank'><strong></strong>https://link-sqb.shop/b/{bio.nickname}</a>
                            </p>
                        </Col>
                    )}
                    <Col md={4}>
                        <p><strong>Nome da loja</strong></p>
                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Nome da Loja' />
                    </Col>
                    <Col md={4}>
                        <p><strong>Identificador da Loja</strong></p>
                        <input type="text" disabled={true} value={nickname} onChange={(e)=>{setNickname(e.target.value)}} placeholder='Identificador: ex. nomedaloja' />
                    </Col>
                    <Col md={4}>
                        <p><strong>ID Afiliado Shopee</strong></p>
                        <input type="text" value={idAfiliado} onChange={(e)=>{setIdAfiliado(e.target.value)}} placeholder='ID Afiliado: ex. 123456789' />
                        {!how && (
                            <div  onClick={()=>{setHow(!how)}} style={{fontSize: '.75rem', fontWeight: 'normal', margin: '0 0 1rem', display: 'block'}}>Como pegar o ID Afiliado Shopee? <strong style={{color: 'orangered'}}>Clique aqui</strong></div>
                        )}
                    </Col>
                    {how && (
                        <>
                            <Col md={6}>
                                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                                    <p><strong>Como conseguir meu ID de Afiliado?</strong></p>
                                    <p>Acesse <a href="https://affiliate.shopee.com.br/account_setting" target='_blank'>seu painel Shopee</a> , com seu login da Shopee, copie e cole no campo ID Afiliado o número conforme exemplo na imagem.</p>
                                    <p><img src={idImage} alt="ID Afiliado" width="100%" /></p>
                                </div>
                            </Col>
                        </>
                    )}
                    <Col md={4}>
                        <p><strong>Nome Shopee<small></small></strong></p>
                        <input type="text" value={shopee} onChange={(e)=>{setShopee(e.target.value)}} placeholder='ex. /seunomenashopee' />
                    </Col>
                    <Col md={4}>
                        <p><strong>Instagram<small></small></strong></p>
                        <input type="text" value={instagram} onChange={(e)=>{setInstagram(e.target.value)}} placeholder='ex. @seuinstagram' />
                    </Col>
                    <Col md={4}>
                        <p><strong>TikTok<small></small></strong></p>
                        <input type="text" value={tiktok} onChange={(e)=>{setTiktok(e.target.value)}} placeholder='ex. @seutiktok' />
                    </Col>
                    <Col md={4}>
                        <p><strong>Grupo do Whatsapp<small></small></strong></p>
                        <input type="text" value={grupoWhatsapp} onChange={(e)=>{setGrupoWhatsapp(e.target.value)}} placeholder='ex. /codigodogrupowhatsapp' />
                    </Col>
                    <Col md={4}>
                        <p><strong>Selecione uma cor de tema</strong></p>
                        <ul className='cor'>
                            <li onClick={()=>{setCor('#ea9999')}} style={(cor === '#ea9999' || (bio && bio.cor === '#ea9999')) ? {border: 'solid 1px #555', backgroundColor: '#ea9999'} : {backgroundColor: '#ea9999'}}></li>
                            <li onClick={()=>{setCor('#e06666')}} style={(cor === '#e06666' || (bio && bio.cor === '#e06666')) ? {border: 'solid 4px #555', backgroundColor: '#e06666'} : {backgroundColor: '#e06666'}}></li>
                            <li onClick={()=>{setCor('#a64d79')}} style={(cor === '#a64d79' || (bio && bio.cor === '#a64d79')) ? {border: 'solid 4px #555', backgroundColor: '#a64d79'} : {backgroundColor: '#a64d79'}}></li>
                            <li onClick={()=>{setCor('#3d85c6')}} style={(cor === '#3d85c6' || (bio && bio.cor === '#3d85c6')) ? {border: 'solid 4px #555', backgroundColor: '#3d85c6'} : {backgroundColor: '#3d85c6'}}></li>
                            <li onClick={()=>{setCor('#45818e')}} style={(cor === '#45818e' || (bio && bio.cor === '#45818e')) ? {border: 'solid 4px #555', backgroundColor: '#45818e'} : {backgroundColor: '#45818e'}}></li>
                            <li onClick={()=>{setCor('#e69138')}} style={(cor === '#e69138' || (bio && bio.cor === '#e69138')) ? {border: 'solid 4px #555', backgroundColor: '#e69138'} : {backgroundColor: '#e69138'}}></li>
                            <li onClick={()=>{setCor('#999')}} style={(cor === '#999' || (bio && bio.cor === '#999')) ? {border: 'solid 4px #555', backgroundColor: '#999'} : {backgroundColor: '#999'}}></li>
                        </ul>
                    </Col>
                    <Col md={12}>
                        <p><strong>Descrição</strong></p>
                        <textarea value={descricao} onChange={(e)=>{setDescricao(e.target.value)}}></textarea>
                    </Col>
                    {(error || success) && (
                        <Col md={12}>
                            <p style={{textAlign: 'center'}}>
                                {error !== '' ? error : ''}
                                {success ? 'Alterações realizadas com sucesso':''}</p>
                        </Col>
                    )}
                    {!bio && (
                        <Col md={12}>
                            <Button onClick={(e)=>{e.preventDefault();regBio();}}>Cadastrar</Button>
                        </Col>
                    )}
                    {bio && (
                        <Col md={12}>
                            <Button onClick={(e)=>{e.preventDefault();altBio();}}>Alterar</Button>
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