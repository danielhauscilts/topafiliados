import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "yet-another-react-lightbox/styles.css";

import env from '../utils/env';

import './Produtos.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

import coex from '../assets/ce.png';

import { FaCopy } from "react-icons/fa6";
// import { AiFillPicture } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";
import { htmlToDOM } from 'html-react-parser';

const Produtos = () => {

    const [ searchParams ] = useSearchParams();

    const params:any = useParams();
    params.page = params.page || 1;

    const [produtos, setProdutos] = useState<any[]>([]);
    const [titulo, setTitulo] = useState<any>(null);
    const [link, setLink] = useState<any>(null);
    const [texto, setTexto] = useState<any>(null);
    const [ce, setCe] = useState<any>(false);
    const [categoria, setCategoria] = useState<any>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [categoriesAll, setCategoriesAll] = useState<any[]>([]);
    const [admin, setAdmin] = useState<boolean>(false);
    const [terms, setTerms] = useState<any>(null);
    const [sucesso, setSucesso] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
    const [bio, setBio] = useState<any>(null);

    const getBio = () => {
        const user = JSON.parse(window.localStorage.getItem('user') || '');
        axios(`${env}/api/bio/${user.id}`)
        .then(()=>{
            setBio(true);
        }).catch(()=>{
            setBio(false);
        })
    }

    useEffect(() => {
        getCategories();
        getProdutos();
        getCategoriesAll();
        getBio();

        setCategoria(params.categoria);

        const user:any = window.localStorage.getItem('user');
        const typeUser = JSON.parse(user).type;

        if (typeUser == 'a') {
            setAdmin(true);
        }
    }, [])

    useEffect(() => {
        getProdutos();
    }, [window.location.href])

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
                { categoria: categoryName },
                {
                    headers: {
                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                    }
                }
            ).then(()=>{
                getCategoriesAll();
            })
        }
    }

    const navigate = useNavigate();

    const changeCategory = (id:any) => {

        if (id) {
            navigate(`/produtos/${id}/1`);
        } else {
            navigate(`/produtos`);
        }
    }

    const getCategories = () => {
        axios.get(`${env}/api/categorias`)
        .then((e)=> {
            setCategories(e.data);
        })
    }

    const getCategoriesAll = () => {
        axios.get(`${env}/api/categorias/all`)
        .then((e)=> {
            setCategoriesAll(e.data);
        })
    }

    const [total, setTotal] = useState<number>(0);

    const getProdutos = () => {

        setLoadingProducts(true);

        axios.get(`${env}/api/produtos` + (params.categoria ? `/${params.categoria}` : '') + (searchParams.get('terms') || searchParams.get('ce') ? '?' : '') + (searchParams.get('terms') ? `terms=${searchParams.get('terms')}`: '') + (searchParams.get('terms') && searchParams.get('ce') ? '&' : '') + (searchParams.get('ce') ? `ce=${searchParams.get('ce')}` : '') + (params.page ? ((!searchParams.get('terms') && !searchParams.get('ce') ? '?' : '&') + `page=${(params.page-1)}`) : ''),
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                    'Content-Type': 'multipart/formdata'
                }
            })
            .then((e)=>{
                console.log('total: ', e.data.total);
                setTotal(e.data.total);
                setProdutos(e.data.items);
                setLoadingProducts(false);
            }).catch(()=>{
                setTotal(0);
                setProdutos([]);
                setLoadingProducts(false);
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

      setLoading(true);

      const formData = new FormData();
      selectedVideo.forEach((file) => {
        formData.append("video", file); // "files" is the key your backend expects
      });

      if (selectedCapa.length > 0) {
        selectedCapa.forEach((file) => {
            formData.append("capa", file); // "files" is the key your backend expects
        });
      }

      formData.append("produto", JSON.stringify({
                titulo: titulo,
                link: link,
                texto: texto,
                categoria: categoria,
                ce: ce ? '1' : '0'
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
            setSucesso(true);
            setTitulo(null);
            setTexto(null);
            setLink(null);
            setTitulo(null);
            setLoading(false);
            setTimeout(()=>{
                setSucesso(false);
            }, 5000);
        }).catch(()=>{
            setError(true);
            setLoading(false);
            setTimeout(()=>{
                setError(false);
            }, 5000);
        })
    };

    const setPosted = (id:any, el:any) => {

        const actualClass:string = document.getElementById(el)?.children[0].getAttribute('class') || '';

        if (actualClass.indexOf('posted') > -1) {
            document.getElementById(el)?.children[0].setAttribute('class', actualClass.replace(' posted', ''));
        } else {
            document.getElementById(el)?.children[0].setAttribute('class', actualClass+' posted');
        }

        let posted = JSON.parse(window.localStorage.getItem('posted') || "[]");
        const posIndex = posted.indexOf(id);
        if(posIndex === -1) {
            posted.push(id)
        } else {
            delete posted[posIndex];
        }
        window.localStorage.setItem('posted', JSON.stringify(posted));
    }

    const showBio = (id: any, link: any) => {

        if(confirm('Deseja incluir esse produto na Bio?')) {

            const user = JSON.parse(window.localStorage.getItem('user') || '');
    
            axios.post(`${env}/api/bio-produtos`,
                {
                    id_user: user?.id,
                    id_produto: id,
                    link: link
                }
            ).then(()=>{
                alert('Produto inserido na Bio');
            }).catch(()=>{
                alert('Houve um erro ao inserir produto');
            })
        }

    }

    return (
        <>
        <div className='produtos'>
            <div className="category" style={{backgroundColor: 'orangered'}}>
                <Container>
                    <Row>
                        <Col xs={3} className='text-right' style={{marginTop: '.5rem', color: '#FFF', fontWeight: 'bold'}}>
                            Categorias
                        </Col>
                        <Col xs={9}>
                            <select 
                                style={{width: '100%', borderRadius: '5px', border: 'none'}}
                                id="categories"
                                value={params.categoria}
                                onChange={(e)=>{changeCategory(e.target.value)}}>
                                <option value="" selected={!params.categoria ? true : false}>Mostrar todas</option>
                                {categories.length > 0 && categories.map((e, i) => (
                                    <option value={e.id} key={i}>{e.categoria}</option>
                                ))}
                            </select>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="filters">
                <Container>
                    <Row>
                        <Col><strong className='filter-title'>Filtros</strong></Col>
                    </Row>
                    <Row>
                        <Col xs={2}>Palavra:</Col>
                        <Col xs={10}><input type="text" id='terms' style={{width: '100%'}} value={terms || ''} onChange={(e)=>{setTerms(e.target.value)}} /></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={(e)=>{e.preventDefault(); navigate('/produtos' + (params.categoria ? '/' + params.categoria : '')  + (params.page ? '/' + params.page : '') + (terms ? '?terms=' + terms + (searchParams.get('ce') ? '&ce=true' : '') : searchParams.get('ce') ? '?ce=true' : ''))}} style={{width: '100%'}}>Buscar</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <strong style={{display: 'inline-block', marginRight: '1rem'}}>Comissão Extra?</strong>
                            {searchParams.get('ce') && (
                                <FaToggleOn style={{fontSize: '2rem', color: 'orangered'}} onClick={()=>{navigate('/produtos' + (params.categoria ? '/' + params.categoria : '')  + (params.page ? '/' + params.page : '') + (searchParams.get('terms') ? '?terms=' + searchParams.get('terms') : ''))}} />
                            )}
                            {!searchParams.get('ce') && (
                                <FaToggleOff style={{fontSize: '2rem', color: '#555'}} onClick={()=>{navigate('/produtos' + (params.categoria ? '/' + params.categoria : '')  + (params.page ? '/' + params.page : '') + (searchParams.get('terms') ? '?terms=' + searchParams.get('terms') + '&ce=true' : '?ce=true'))}} />
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
            {admin && (
                <div className='register-product'>
                    <Container style={{padding: "0 1rem"}}>
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
                                                        { categoriesAll.length > 0 && categoriesAll.map((e, i)=>(
                                                            <option value={e.id} key={i}>{e.categoria}</option>
                                                        ))}
                                                </select>
                                            </Col>
                                            <Col md={12}>
                                                <p className='form-title'><span style={{display: 'inline-block', marginRight: '1rem', marginTop: '1rem'}}>Comissão Extra?</span>
                                                {ce && (
                                                    <FaToggleOn style={{fontSize: '2rem', color: 'orangered'}} onClick={()=>{setCe(false)}} />
                                                )}
                                                {!ce && (
                                                    <FaToggleOff style={{fontSize: '2rem', color: '#555'}} onClick={()=>{setCe(true)}} />
                                                )}</p>
                                            </Col>
                                            <Col md={12}>
                                                <p className='form-title'>Link para Shopee Vídeos</p>
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
                                                <Button className='btn-primary' disabled={!titulo || !link || !texto || loading} onClick={(e)=>{e.preventDefault; cadastrar()}}>
                                                    {!loading ? 'Cadastrar': 'Cadastrando...'}
                                                </Button>
                                            </Col>
                                        </Row>
                                        {sucesso && (
                                            <Row>
                                            <Col style={{marginTop: '1rem'}}>
                                                Produto cadastrado com sucesso!
                                            </Col>
                                        </Row>
                                        )}
                                        {error && (
                                            <Row>
                                            <Col style={{marginTop: '1rem'}}>
                                                Houve uma falha ao cadastrar produto, contate o administrador
                                            </Col>
                                        </Row>
                                        )}
                                    </Container>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
            {total > 0 && (
                <p style={{color: '#FFF', textAlign: 'center', margin: '2rem 0 0', fontWeight: 'bold'}}>{total>10?'Mostrando 10 de ':''}{total} produto(s)</p>
            )}
            {total > 10 && (
                <Container className='pagination' style={{paddingTop: '2rem'}}>
                    <Row>
                        <Col>
                            <ul>
                                {Array.from({length: (total/10)+1}, (_, i) => (
                                    <li key={i} className={params.page == (i+1) ? 'active' : ''}>
                                        <Link to={'/produtos' + (params.categoria ? '/' + params.categoria : '') + '/' + (i+1) + (terms ? '?terms=' + terms : '')} target='_self'>{i+1}</Link>
                                    </li>
                                ))
                                }
                            </ul>
                        </Col>
                    </Row>
                </Container>
            )}
            <Container style={{padding: '1rem'}}>
                <Row>
                    {produtos && produtos.length > 0 && !loadingProducts && produtos.map((e, i) => (
                        <Col key={i} xs={12} sm={6} md={6} lg={4} id={`${i}_${e.id}`} style={{position: 'relative'}}>
                            <div className={JSON.parse(window.localStorage.getItem('posted') || '[]').indexOf(e.id) > -1 ? 'produto posted' : 'produto'}>
                                <div className='titulo'>{e.titulo}</div>
                                {/* <div className='text-left' style={{marginBottom: '1rem', fontSize: '.75rem'}}>Postado em {e.data ? e.data.split('-')[2]+'/'+e.data.split('-')[1]+'/'+e.data.split('-')[0]:''}</div> */}
                                <div className='midias'>
                                    {/* <div className='capa'>
                                        <img src={`${env.indexOf('localhost')>-1?env:'/api'}/${e.capa}`} width='100%' alt="Baixar" />
                                        <AiFillPicture />
                                    </div>
                                    */}
                                    <div className='video'>
                                        <video width="100%" controls  poster={e.capa ? `https://afilipro.com.br/api/${e.capa}` : ''}>
                                            <source src={`https://afilipro.com.br/api/${e.video}`} type="video/mp4"></source>
                                        </video>
                                        <FaVideo />
                                    </div>
                                </div>
                                <div className='texto' onClick={()=>{
                                        navigator.clipboard.writeText(e.titulo + " " + e.texto).then(() => {
                                            // Optional: Provide user feedback
                                            alert('#Hashtags copiadas com sucesso!');
                                        });
                                    }}>
                                    <span>{e.titulo} {e.texto}</span>
                                    <FaCopy />
                                </div>
                                <div className='downloads'>
                                    <a href={`${env.indexOf('localhost')>-1?env:'/api'}/${e.capa}`} title="Capa" download={e.capa} style={{marginBottom: '1rem'}}>
                                        Baixar Capa <FaFileDownload />
                                    </a>
                                    <a href={`${env.indexOf('localhost')>-1?env:'/api'}/${e.video}`} title="Vídeo" download={e.video}>
                                        Baixar Vídeo <FaFileDownload />
                                    </a>
                                    <a href={e.link} title="Shopee" target='_blank'>
                                        Ir para Shopee <FaFileDownload />
                                    </a>
                                    {e.link_rastreavel && (
                                        <a href="#" onClick={(u)=>{u.preventDefault();
                                                navigator.clipboard.writeText(e.link_rastreavel).then(() => {
                                                    alert('Link copiado com sucesso');
                                                })}}>Copiar link rastreável para Story<FaCopy />
                                        </a>
                                    )}
                                </div>
                                {bio && (
                                    <div onClick={()=>{showBio(e.id, e.link)}} style={{textAlign: 'center', cursor: 'pointer', margin: '1rem 0 0', color: '#555', fontWeight: 'bold'}}>
                                        <span>Incluir no seu Site</span>
                                    </div>
                                )}
                                {!bio && (
                                    <div onClick={()=>{navigate('/bio')}} style={{textAlign: 'center', cursor: 'pointer', margin: '1rem 0 0', color: '#555', fontWeight: 'bold'}}>
                                        <span>Registrar ID Shopee</span>
                                    </div>
                                )}
                                { JSON.parse(window.localStorage.getItem('posted') || '[]').indexOf(e.id) === -1 && 
                                    <div  onClick={()=>{setPosted(e.id, i+'_'+e.id)}} style={{textAlign: 'center', cursor: 'pointer', margin: '1rem 0 0', padding:'.5rem 0 0', color: '#ED1E79', fontWeight: 'bold'}}>
                                        <span>Marcar como postado</span>
                                    </div>
                                }
                                { JSON.parse(window.localStorage.getItem('posted') || '[]').indexOf(e.id) > -1 && 
                                    <div onClick={()=>{setPosted(e.id, i+'_'+e.id)}} style={{textAlign: 'center', cursor: 'pointer', margin: '1rem 0 0', color: '#555', fontWeight: 'bold'}}>
                                        <span>Desfazer marcação</span>
                                    </div>
                                }
                            </div>
                            {e.ce === '1' && (
                                <img src={coex} alt="Comissão Extra" className='ce' />
                            )}
                        </Col>
                        )
                    )}
                    {produtos && produtos.length === 0 && !loadingProducts && (
                        <Col className='text-center'>
                            <span style={{color:'#FFF'}}>Não existem produtos para essa pesquisa.</span>
                        </Col>
                    )}
                    {loadingProducts && (
                        <Col className='text-center'>
                            <span style={{color:'#FFF'}}>Carregando produtos.</span>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Produtos;