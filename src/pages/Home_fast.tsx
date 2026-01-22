import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import "yet-another-react-lightbox/styles.css";

import env from '../utils/env';

initMercadoPago('APP_USR-0dc798dc-56c5-4274-a39d-8029a47bec99');

import './Home_fast.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

//images
// import phone from '../assets/phone-image.webp';
// import whats from '../assets/whats.png';

import tutorial_video from "../assets/video/tutorial-video.mp4";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";


const Home = () => {

    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [confMail, setConfMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState<any>(null);
    const[sucesso, setSucesso] = useState<boolean>(false);

    const register = () => {

        if (password !== confirm) {
            alert('As senhas não conferem!');
            return;
        }

        let cleanPhone = '';
        
        if (phone.indexOf('55') === -1) {
            cleanPhone = '55' + phone.replace(/\D/g, '');
        } else {
            cleanPhone = phone.replace(/\D/g, '');
        }

        axios.post(`${env}/api/user`,
            {
                'name': name,
                'mail': mail,
                'phone': cleanPhone,
                'password': password
            }
        ).then(()=>{
            sendOtp();
        }).catch(()=>{
            setError('Telefone ou e-mail já cadastrado!');

            setTimeout(()=>{
                setError(null);
            }, 5000)
        })
    }

    const sendOtp = () => {
        axios.post(
            `${env}/api/login`,
            {
                "mail": mail,
                "password": password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(()=>{
            setSucesso(true);
        }).catch((error) => {
            if (error.status === 401) {
                setError('cadastro não encontrado');
            }
        })
    }

    const login = () => {
        // Implement login logic here

        axios.post(
            `${env}/api/validate-otp`,
            {
                "mail": mail,
                "otp": otp,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((e)=>{
            window.localStorage.setItem('user', JSON.stringify(e.data.user));
            window.localStorage.setItem('token', e.data.token);
            setStep(4)
        }).catch((error) => {
            console.log('Falha na validação do OTP', error.response.data);
            setError('Erro na validação, tente novamente!');
        })
    }

    const [otp, setOtp] = useState<any>();
    const [otpUm, setOtpUm] = useState<any>();
    const [otpDois, setOtpDois] = useState<any>();
    const [otpTres, setOtpTres] = useState<any>();
    const [otpQuatro, setOtpQuatro] = useState<any>();
    const [otpCinco, setOtpCinco] = useState<any>();
    const [otpSeis, setOtpSeis] = useState<any>();

    useEffect(()=>{
        setOtp(otpUm+''+otpDois+''+otpTres+''+otpQuatro+''+otpCinco+''+otpSeis);
    }, [otpUm, otpDois, otpTres, otpQuatro, otpCinco, otpSeis]);

    const userStorage:any = window.localStorage.getItem('user');

    const [pId, setPId] = useState<any>(null);

    const getPreferenceId = () => {
        axios.post(`${env}/api/pagamento`,
            {
                "user": JSON.parse(userStorage)?.id
            }
        ).then((e:any)=>{
            setPId(e.data.id);
        })
    }

    useEffect(()=>{
        if(step === 4) {
            getPreferenceId();
        }
    }, [step]);

    return (
        <>
        <div className='home'>
            <Container>
                <Row className='call'>
                    <Col md={step === 0 ? 6 : 12}>
                        {/* <p className='text-center' style={{margin: '1rem 0 2rem'}}><Button onClick={(e)=>{e.preventDefault(); Navigate('/cadastro')}}>Cadastre-se agora!</Button></p> */}
                        <Container className='glass-box form home-register'>
                            {step === 0 && (
                                <Row>
                                    <Col className='text-center' style={{padding: '1rem'}}>
                                        <h1 className='text-center'><strong style={{textShadow: '1px 1px 1px rgb(0,0,0)'}}>PARABÉNS!</strong></h1>
                                        <p style={{fontSize: '1rem', fontWeight: '1rem'}}><strong>Se você chegou até aqui, sabemos que você está buscando uma renda a mais e podemos te ajudar!</strong></p>
                                        <p style={{fontSize: '1rem'}}><strong>IMPORTANTE!</strong> Não somos um curso, somos uma plataforma que diariamente te guiará a ser um Afiliado de <span style={{color: 'orangered'}}>SUCESSO!</span></p>
                                        <p><Button onClick={()=>setStep(1)}>Vamos começar <FaArrowAltCircleRight /></Button></p>
                                    </Col>
                                </Row>
                            )}
                            {step === 1 && (
                                <Row>
                                    <Col xs={12} className='text-center'>
                                        <label style={{margin: '0 0 1rem'}}><span style={{color: 'orangered'}}>Para começar</span>, me diga seu nome.</label>
                                    </Col>
                                    <Col xs={8}>
                                        <input type="text" placeholder='Ex. João da Silva' onChange={(e)=>{setName(e.target.value)}} />
                                    </Col>
                                    <Col xs={4} className='text-end'>
                                        <Button className='next' disabled={name.length <= 3} onClick={()=>setStep(2)}>Próximo <FaArrowAltCircleRight /></Button>
                                    </Col>
                                </Row>
                            )}
                            {step === 2 && (
                                <Row>
                                    <Col xs={12} className='text-center'>
                                        <p style={{lineHeight: '1.5rem'}}><strong><span style={{color: 'orangered'}}>{name}</span>, a partir daqui você será guiado a ser um afiliado <span style={{color: 'orangered'}}>Shopee Vídeo</span>, gastando pouco tempo do seu dia e nos dias que você puder.</strong></p>
                                        <p style={{lineHeight: '1.5rem'}}>Agora realize seu cadastro como <strong>afiliado Shopee</strong> e volte para completarmos seu cadastro <strong>AfiliPRO</strong>, <a href="https://shopee.com.br/m/afiliados" target='_blank'>clicando aqui</a>, caso já seja afiliado apenas continue.</p>                                        
                                    </Col>
                                    <Col xs={12} className='text-end' style={{marginTop: '1rem'}}>
                                        <Button className='next' disabled={name.length <= 3} onClick={()=>setStep(3)}>Continuar cadastro <FaArrowAltCircleRight /></Button>
                                    </Col>
                                </Row>
                            )}
                            {step === 3 && !sucesso && (
                                <Row>
                                    <Col xs={12} className='text-left'>
                                        <label style={{margin: '0 0 1rem'}}><span style={{color: 'orangered'}}>{name}</span>, agora preciso 
                                        de seus dados</label>
                                    </Col>
                                    <Col xs={3} style={{fontSize: '1rem', lineHeight: '50px'}}>E-mail:</Col>
                                    <Col xs={9} style={{marginBottom: '1rem'}}>
                                        <input type="text" placeholder={`Ex. ${name.toLowerCase()}@mail.com.br`} onChange={(e)=>{setMail(e.target.value)}} />
                                    </Col>
                                    <Col xs={3} style={{fontSize: '1rem', lineHeight: '50px'}}>Confirme:</Col>
                                    <Col xs={9} style={{marginBottom: '1rem'}}>
                                        <input type="text" placeholder={`Ex. ${name.toLowerCase()}@mail.com.br`} onChange={(e)=>{setConfMail(e.target.value)}} />
                                    </Col>
                                    <Col xs={3} style={{fontSize: '1rem', lineHeight: '50px'}}>Celular:</Col>
                                    <Col xs={9}>
                                        <input type="text" placeholder={`Ex. (11) 9 4545-1212`} onChange={(e)=>{setPhone(e.target.value)}} />
                                    </Col>
                                    <Col xs={12} className='text-left'>
                                        <label style={{margin: '1rem 0', fontSize: '1rem', fontWeight: 'normal'}}><strong>e vamos criar uma senha.</strong></label>
                                    </Col>
                                    <Col xs={6}>
                                        <input type="password" placeholder='Senha' onChange={(e)=>{setPassword(e.target.value)}} />
                                    </Col>
                                    <Col xs={6}>
                                        <input type="password" placeholder='Confirme a Senha' onChange={(e)=>{setConfirm(e.target.value)}} />
                                    </Col>
                                    <Col xs={12} className='text-end' style={{marginTop: '1rem'}}>
                                        <Button className='next' disabled={password.length < 6 || password === '' || password !== confirm || mail !== confMail} onClick={()=>register()}>Cadastrar e verificar <FaArrowAltCircleRight /></Button>
                                    </Col>
                                    {(password.length >= 6 && password.length > 0 && password.length <= confirm.length && password !== confirm) && (
                                        <Col xs={12} style={{padding: '0', margin: '1rem 0 .5rem', fontSize: '.75rem', color: '#999'}} className='text-center'>
                                            As senhas não conferem!
                                        </Col>
                                    )}
                                    {(mail.length >= 6 && confMail.length > 0 && mail.length <= confMail.length && mail !== confMail) && (
                                        <Col xs={12} style={{padding: '0', margin: '1rem 0 .5rem', fontSize: '.75rem', color: '#999'}} className='text-center'>
                                            Os e-mails não conferem!
                                        </Col>
                                    )}
                                    { (password.length < 6) && (
                                        <Col xs={12} style={{padding: '0', margin: '1rem 0 .5rem', fontSize: '.75rem', color: '#999'}} className='text-center'>
                                            Crie uma senha com mais de 6 letras ou números
                                        </Col>
                                    )}
                                    {error && (
                                        <Col xs={12} style={{padding: '0', margin: '1rem 0 .5rem', fontSize: '.75rem', color: '#999'}} className='text-center'>
                                            O celular ou e-mail já estão cadastrados!
                                        </Col>
                                    )}
                                </Row>
                            )}
                            {step === 3 && sucesso && (
                                <Row>
                                    <Col xs={12} className='text-left'>
                                        <label style={{margin: '0 0 1rem', lineHeight: '1.75rem'}}>Digite abaixo o código que foi enviado para seu celular para confirmarmos seu cadastro <span style={{color: 'orangered'}}>{name}</span>.</label>
                                    </Col>
                                    <Col xs={12} style={{fontSize: '1rem', lineHeight: '50px'}}>
                                        <ul className='otp-code'>
                                            <li><input type="number" id='otp1' maxLength={1} autoFocus={true} onChange={(e)=>{if(e.target.value !== ''){ document.getElementById('otp2')?.focus(); setOtpUm(e.target.value) }}} /></li>
                                            <li><input type="number" id='otp2' maxLength={1} onChange={(e)=>{if(e.target.value !== ''){ document.getElementById('otp3')?.focus(); setOtpDois(e.target.value) }}} /></li>
                                            <li><input type="number" id='otp3' maxLength={1} onChange={(e)=>{if(e.target.value !== ''){ document.getElementById('otp4')?.focus(); setOtpTres(e.target.value) }}} /></li>
                                            <li><input type="number" id='otp4' maxLength={1} onChange={(e)=>{if(e.target.value !== ''){ document.getElementById('otp5')?.focus(); setOtpQuatro(e.target.value) }}} /></li>
                                            <li><input type="number" id='otp5' maxLength={1} onChange={(e)=>{if(e.target.value !== ''){ document.getElementById('otp6')?.focus(); setOtpCinco(e.target.value) }}} /></li>
                                            <li><input type="number" id='otp6' maxLength={1} onChange={(e)=>{if(e.target.value !== ''){ setOtpSeis(e.target.value) }}} /></li>
                                        </ul>
                                    </Col>
                                    {error && (
                                        <Col style={{margin: '0 0 1rem', textAlign: 'center', fontSize: '1rem'}}>
                                            {error || 'Não foi possível se verificar, tente novamente!'}
                                        </Col>
                                    )}
                                    <Col xs={12} className='text-end' style={{marginTop: '1rem'}}>
                                        <Button className='next' onClick={()=>login()}>Ir para pagamento <FaArrowAltCircleRight /></Button>
                                    </Col>
                                </Row>
                            )}
                            {step === 4 && (
                                <Row>
                                    <Col xs={12} className='text-center'>
                                        <h1 style={{textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold', color: 'orangered'}}>PARABÉNS {name}!</h1>
                                        <p><strong>Seu cadastro foi concluído e falta apenas um passo para começar seu caminho como afiliado.</strong></p>
                                        <p style={{fontSize: '1rem'}}>Habilite agora mesmo a assessoria de 30 dias por apenas R$ 20,00, clicando abaixo no icone do <strong style={{color: 'orange'}}>mercado pago</strong>.</p>
                                    </Col>
                                    <Col xs={12}>
                                        {pId && (
                                            <>
                                                <div className='extrato'>
                                                    <Container>
                                                        <Row className='title'>
                                                            <Col xs={7}>Produto:</Col>
                                                            <Col x={2}>Qtd.</Col>
                                                            <Col xs={3}>Valor</Col>
                                                        </Row>
                                                        <Row style={{padding: '.5rem 0'}}>
                                                            <Col xs={7}>Plano de assesoria 30 dias</Col>
                                                            <Col xs={2}>1</Col>
                                                            <Col xs={3}>R$ 20,00</Col>
                                                        </Row>
                                                        <Row className='total'>
                                                            <Col xs={9} className='text-end'>Total</Col>
                                                            <Col xs={3}>R$ 20,00</Col>
                                                        </Row>
                                                    </Container>
                                                </div>
                                                <p style={{fontSize: '1rem'}}>Pagar com:</p>
                                                <Wallet initialization={{ preferenceId: pId }} />
                                                <p style={{fontSize: '.75rem', marginTop: '2rem'}}>Pagamentos aceitos:<br /><img src="/images/payment.jpg?1" alt="Pague com:" /></p>
                                                <p className='text-center' style={{fontSize: '1rem'}}>Você poderá verificar seus extratos de pagamento e vigência de contratação, acessando <a href='/conta' target='_self'><strong>Minha Conta</strong></a> a qualquer momento.</p>
                                            </>
                                        )}
                                        <p style={{fontSize: '.75rem', backgroundColor: '#ededed', borderRadius: '5px', padding: '10px'}}>
                                            Lembre-se, esta cobrança não é recorrente e deve ser renovada no final da vigência de sua contratação atual que pode ser vista no <strong>Menu {'>'} Minha Conta</strong>.
                                        </p>
                                    </Col>
                                </Row>
                            )}
                            {step > 0 && (
                                <ul className='steps'>
                                    <li className={step === 1 ? 'active' : step > 1 ? 'done' : ''} onClick={()=>{if(step > 1) setStep(1);}}>1</li>
                                    <li className={step === 2 ? 'active' : step > 2 ? 'done' : ''} onClick={()=>{if(step > 2) setStep(2);}}>2</li>
                                    <li className={step === 3 ? 'active' : step > 3 ? 'done' : ''} onClick={()=>{if(step > 3) setStep(3);}}>3</li>
                                    <li className={step === 4 ? 'active' : step > 4 ? 'done' : ''} onClick={()=>{if(step > 4) setStep(4);}}>4</li>
                                    <li className={step === 5 ? 'active' : ''}><FaCheck /></li>
                                </ul>
                            )}
                        </Container>
                        <p style={{fontSize: '1rem'}} className='text-center'>O <strong>Assessoria Contínua</strong> da <strong>AfiliPRO</strong> custa apenas <strong>R$ 20,00</strong> para ser utilizada por <strong>30 dias</strong> e renovado quando você precisar, um investimento pago facilmente gastando <strong>apenas 30 minutos do seu dia</strong> gerando ganhos maiores em pouco tempo.</p>
                        <p style={{fontSize: '1rem', marginBottom: '1rem'}} className='text-center'><strong>Você não precisa nada a mais que a AfiliPRO para iniciar<br />no mundo dos Afiliados.</strong></p>
                    </Col>
                    {step === 0 && (
                        <Col md={6} className='text-center'>
                            <h1 className='text-center' style={{marginBottom: '2rem'}}><strong style={{color: '#FFF', textShadow: '1px 1px 3px rgb(0,0,0)'}}>Quer saber como <br /><strong>AfiliPRO</strong> funciona?</strong></h1>
                            <video height="720" controls style={{border: 'solid 10px #555', borderRadius: '10px'}}>
                                <source src={tutorial_video} type="video/mp4"></source>
                            </video>
                        </Col>
                    )}
                </Row>
                {step === 0 && (
                    <Row>
                        <Col xs={12}>
                            <p style={{borderBottom: 'dashed 1px #555', margin: '2rem 0 1em', paddingBottom: '.5rem', color: '#555'}}><strong>Informações legais</strong></p>
                            <p style={{fontSize: '1rem'}}>
                                <ul style={{listStyle: 'none', margin: '0', padding: '0'}}>
                                    <li className='glass-box' style={{marginBottom: '1rem'}}>A <strong>AfiliPRO</strong> garante privacidade e segurança de seus dados, assim todos as informações e cookies informados neste portal são de uso restrito à plataforma;</li>
                                    <li className='glass-box' style={{marginBottom: '1rem'}}>A <strong>AfiliPRO</strong> cobra um valor simbólico de R$ 20,00 pelo uso de 30 dias e renove seu acesso sempre que quiser sem nenhuma fidelidade.</li>
                                    <li className='glass-box' style={{marginBottom: '1rem'}}>A <strong>AfiliPRO</strong> substitui toda complexidade do afiliado em ter que editar videos, buscar pacotes, acompanhar Telegram ou outros meios, apenas siga nosso guia e promova no seu canal Shopee Vídeo, os produtos que disponibilizamos diariamente em poucos passos, gastando menos de 30 minutos do seu dia!</li>
                                </ul>
                            </p>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
        </>
    )
}

export default Home;