import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import "yet-another-react-lightbox/styles.css";

import env from '../utils/env';

import './Produtos.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

import { FaCopy } from "react-icons/fa6";
import { AiFillPicture } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";


const Produtos = () => {

    const [produtos, setProdutos] = useState<any[]>([]);
    const [titulo, setTitulo] = useState<any>(null);
    const [link, setLink] = useState<any>(null);
    const [texto, setTexto] = useState<any>(null);
    const [categoria, setCategoria] = useState<any>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [admin, setAdmin] = useState<boolean>(false);
    const [terms, setTerms] = useState<any>(null);
    const [today, setToday] = useState<any>(false);

    useEffect(() => {
        getProdutos();
        getCategories();

        const user:any = window.localStorage.getItem('user');
        const typeUser = JSON.parse(user).type;

        if (typeUser == 'a') {
            setAdmin(true);
        }
    }, [])

    const changedCategoria = (e:any) => {
        if (e.target.value == 'new') {
            novaCategoria();
        } else {
            setCategoria(e.target.value)
        }
    }

    const novaCategoria = () => {

        const categoryName = prompt('Digite um nome para a categoria');

        if(categoryName !== null && categoryName !== '') {
            axios.post(`${env}/api/categoria`,
                {
                    categoria: categoryName
                }
            ).then(()=>{
                getCategories();
            })
        }
    }

    const changeCategory = (id:any) => {

        if (id) {
            setCategoria(id);
        } else {
            setCategoria(null);
        }

        axios.get(`${env}/api/produtos` + (id !== '' ? '/' + id : '') + (terms || today ? '?' : '') + (terms ? 'terms=' + terms : '') +  (terms && today ? '&' : '') + (today ? 'today=' + today : ''))
            .then((e)=>{
                setProdutos(e.data);
            }).catch(()=>{
                setProdutos([]);
            })
    }

    const getCategories = () => {
        axios.get(`${env}/api/categorias`)
        .then((e)=> {
            setCategories(e.data);
        })
    }

    const getProdutos = () => {

        console.log('categoria', categoria);

        axios.get(`${env}/api/produtos` + (categoria ? `/${categoria}` : '') + (terms || today ? '?' : '') + (terms ? `terms=${terms}`: '') + (terms && today ? '&' : '') + (today ? `today=${today}` : ''))
            .then((e)=>{
                setProdutos(e.data);
            }).catch(()=>{
                setProdutos([]);
            })
    }

    // Upload File
    const [selectedVideo, setSelectedVideo] = useState([]);
    const [selectedCapa, setSelectedCapa] = useState([]);

    const handleVideoChange = (event:any) => {
      setSelectedVideo(Array.from(event.target.files));
    };

    const handleCapaChange = (event:any) => {
      setSelectedCapa(Array.from(event.target.files));
    };

    const cadastrar = async () => {
      if (selectedVideo.length === 0) {
        alert("Please select video to upload.");
        return;
      }

      if (selectedCapa.length === 0) {
        alert("Please select capa to upload.");
        return;
      }

      const formData = new FormData();
      selectedVideo.forEach((file) => {
        formData.append("video", file); // "files" is the key your backend expects
      });

      selectedCapa.forEach((file) => {
        formData.append("capa", file); // "files" is the key your backend expects
      });

      formData.append("produto", JSON.stringify({
                titulo: titulo,
                link: link,
                texto: texto,
                categoria: categoria
            }));

      await axios.post(`${env}/api/produto`,
            formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                    'Content-Type': 'multipart/formdata'
                }
            }
        ).then(()=>{
            getProdutos();
        }).catch((err)=>{
            console.log(err);
        })
    };

    return (
        <>
        <div className='produtos'>
            <div className="filters">
                <Container>
                    <Row>
                        <Col><strong className='filter-title'>Filtros</strong></Col>
                    </Row>
                    <Row>
                        <Col xs={2}>Palavra:</Col>
                        <Col xs={10}><input type="text" id='terms' style={{width: '100%'}} onChange={(e)=>{e.preventDefault();setTerms(e.target.value)}} /></Col>
                    </Row>
                    <Row>
                        <Col xs={10}>Somente produtos de hoje?</Col>
                        <Col xs={2}><input type="checkbox" onChange={(e)=>{e.preventDefault;setToday(e.target.checked)}} checked={today} /></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={(e)=>{e.preventDefault(); getProdutos()}} style={{width: '100%'}}>Buscar</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="category">
                <Container>
                    <Row>
                        <Col className='text-center text-md-right'>
                            Categorias &nbsp;
                            <select 
                                id="categories"
                                onChange={(e)=>{changeCategory(e.target.value)}}>
                                <option value="">Mostrar todas</option>
                                {categories.length > 0 && categories.map((e, i) => (
                                    <option value={e.id} key={i}>{e.categoria}</option>
                                ))}
                            </select> &nbsp;
                        </Col>
                    </Row>
                </Container>
            </div>
            {admin && (
                <Container style={{padding: "0 2rem"}}>
                    <Row>
                        <Col>
                            <div className='form-produto'>
                                <Container>
                                    <Row>
                                        <Col>
                                            <h3 className='text-center' style={{borderBottom: 'solid 1px #ccc', paddingBottom: '.5rem', color: 'orangered'}}>Cadastrar produtos</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <p className='form-title'>Titulo</p>
                                            <input type="text" id='titulo' placeholder='Titulo' onChange={(e)=>{setTitulo(e.target.value)}} />
                                        </Col>
                                        <Col md={6}>
                                            <p className='form-title'>Categoria</p>
                                            <select id='categoria' 
                                                onChange={(e)=>{changedCategoria(e)}}>
                                                    <option value="">Selecione</option>
                                                    {admin && (
                                                        <option value="new">-- Nova categoria --</option>
                                                    )}
                                                    { categories.length > 0 && categories.map((e, i)=>(
                                                        <option value={e.id} key={i}>{e.categoria}</option>
                                                    ))}
                                            </select>
                                        </Col>
                                        <Col md={12}>
                                            <p className='form-title'>Link</p>
                                            <input type="text" id='link' placeholder='Link' onChange={(e)=>{setLink(e.target.value)}} />
                                        </Col>
                                        <Col md={12}>
                                            <p className='form-title'>texto</p>
                                            <textarea rows={5} id='texto' placeholder='Texto' onChange={(e)=>{setTexto(e.target.value)}}></textarea>
                                        </Col>
                                        <Col md={6}>
                                            <p className='form-title'>Video</p>
                                            <input type="file" id='video' onChange={handleVideoChange} multiple />
                                        </Col>
                                        <Col md={6}>
                                            <p className='form-title'>Capa</p>
                                            <input type="file" id='capa' onChange={handleCapaChange} multiple />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{marginTop: '1rem'}}>
                                            <Button onClick={(e)=>{e.preventDefault; cadastrar()}}>Cadastrar</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
            <Container style={{padding: '2rem'}}>
                <Row>
                    {produtos && produtos.length > 0 && produtos.map((e, i) => (
                        <Col key={i} xs={12} sm={6} md={6} lg={3}>
                            <div className='produto'>
                                <div className='text-left' style={{marginBottom: '1rem', fontSize: '.75rem'}}>Postado em {e.data ? e.data.split('-')[2]+'/'+e.data.split('-')[1]+'/'+e.data.split('-')[0]:''}</div>
                                <div className='midias'>
                                    <div className='capa'>
                                        <img src={`${env.indexOf('localhost')>-1?env:'/api'}/${e.capa}`} width='100%' alt="Baixar" />
                                        <AiFillPicture />
                                    </div>
                                    <div className='video'>
                                        <video width="100%" controls>
                                            <source src={`${env.indexOf('localhost')>-1?env:'/api'}/${e.video}`} type="video/mp4"></source>
                                        </video>
                                        <FaVideo />
                                    </div>
                                </div>
                                <div className='titulo'>{e.titulo}</div>
                                <div className='downloads'>
                                    <a href={`${env.indexOf('localhost')>-1?env:'/api'}/${e.capa}`} title="ImageName" download={e.capa}>
                                        Baixar Capa <FaFileDownload />
                                    </a>
                                    <a href={`${env.indexOf('localhost')>-1?env:'/api'}/${e.video}`} title="ImageName" download={e.video}>
                                        Baixar Vídeo <FaFileDownload />
                                    </a>
                                </div>
                                <div className='link' onClick={()=>{
                                        navigator.clipboard.writeText(e.link).then(() => {
                                            // Optional: Provide user feedback
                                            alert('Link copiado com sucesso!');
                                        });
                                    }}>
                                    <p>Copiar link Shopee</p>
                                    <span>{e.link}</span>
                                    <FaCopy />
                                </div>
                                <div className='texto' onClick={()=>{
                                        navigator.clipboard.writeText(e.texto).then(() => {
                                            // Optional: Provide user feedback
                                            alert('#Hashtags copiadas com sucesso!');
                                        });
                                    }}>
                                    <p>Copiar #hashtags</p>
                                    <span>{e.texto}</span>
                                    <FaCopy />
                                </div>
                            </div>
                        </Col>
                        )
                    )}
                    {produtos && produtos.length === 0 && (
                        <Col className='text-center'>
                            <span style={{color:'#FFF'}}>Não existem produtos para essa pesquisa.</span>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Produtos;