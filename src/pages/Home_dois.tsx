import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "yet-another-react-lightbox/styles.css";

import './Home_dois.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

//images
// import phone from '../assets/phone-image.webp';
// import whats from '../assets/whats.png';

import tutorial_video from "../assets/video/tutorial-video.mp4";

const Home = () => {

    const Navigate = useNavigate();

    return (
        <>
        <div className='home'>
            <Container>
                <Row className='call'>
                    <Col md={6}>
                        <p className='text-center' style={{margin: '1rem 0 2rem'}}><Button onClick={(e)=>{e.preventDefault(); Navigate('/cadastro')}}>Cadastre-se agora!</Button></p>
                        <h1><strong>O QUE É SER UM AFILIADO?</strong></h1>
                        <p>Como qualquer trabalho de vendas você recebe uma comissão por representar produtos de outros Produtores ou Lojistas, porém de <strong>ONDE QUISER</strong> e na <strong>HORA QUE QUISER</strong> na seu canal <a href="https://shopee.com.br/m/afiliados" target='_blank' style={{color: 'orangered'}}>Shopee Vídeo</a>!</p>                        
                        <h1><strong>QUAL A VANTAGEM DE SER AFILIPRO?</strong></h1>
                        <p>Diferente de Packs de Produtos ou Grupos de Telegram, a AfiliPRO disponibiliza produtos que foram analisados por consultores diáriamente, contando com um sistema de busca e categorias de segmentos, além da opção de bloquear um produto que você já publicou, trazendo melhor controle, velocidade e organização de suas publicaçoes, ou seja, você acessa a plataforma e publica os produtos de forma rápida, sem precisar se preocupar com mais nada e nem outros meios. Tudo em um lugar só!</p>
                        <h1><strong>TENHO ALGUM VÍNCULO COM A AFILIPRO?</strong></h1>
                        <p>Não, a AfiliPRO te auxilia a ser um Afiliado, representando esses produtos de forma mais rápida seguindo nosso passo-a-passo com produtos de maior chance de vendas e comissões, gastando pouco tempo para fazer isso!</p>
                        <h1><strong>TENHO QUE SEGUIR UMA ROTINA?</strong></h1>
                        <p>Não, realize as postagens dos produtos em seu canal Shopee Vídeo quando quiser, porém postagens periódicas e diárias, tentem a ser recompensados com volumes maiores de vendas!</p>
                        <p className='text-center' style={{margin: '2rem 0'}}><Button onClick={(e)=>{e.preventDefault(); Navigate('/cadastro')}}>Cadastre-se agora!</Button></p>
                        <h1><strong>QUANTO TEMPO GASTO POSTANDO OS VÍDEOS?</strong></h1>
                        <p>Você gasta aproximadamente 1 minuto por vídeo, sendo que postar aproximadamente 30 vídeos diários garantem melhores resultados e comissões, sendo assim gastando <strong>30 minutos do seu dia!</strong></p>
                        <h1><strong>QUANTO GANHO COMO AFILIADO?</strong></h1>
                        <p>As comissões vão de 1% à 4% ou mais em ofertas especiais dependendo do vendedor e tipo de produto, as receitas seguindo uma rotina e segmentação de representação podem passar de <strong>R$ 20,00 à R$ 100,00</strong> por dia em poucos meses.</p>
                        <h1><strong>QUANTO TEMPO GASTO POSTANDO OS VÍDEOS?</strong></h1>
                        <p>Você gasta aproximadamente 1 minuto por vídeo, sendo que postar aproximadamente 30 vídeos diários garantem melhores resultados e comissões, sendo assim gastando <strong>30 minutos do seu dia!</strong></p>
                        <h1><strong>QUANTO CUSTA SER ASSESSORADO PELA AFILIPRO?</strong></h1>
                        <p>Apenas <strong>R$ 20,00</strong> mensais, para ter acesso a mais de 30 produtos por dia, editados e em alta qualidade, com título e hashtag para melhor performance nas buscas da Shopee Vídeo.</p>
                        <p className='text-center' style={{margin: '2rem 0'}}><Button onClick={(e)=>{e.preventDefault(); Navigate('/cadastro')}}>Cadastre-se agora!</Button></p>
                    </Col>
                    <Col md={6} className='text-center'>
                        <p className='text-left'><strong>Assista como cadastrar produtos em<br />menos de <strong>1 minuto</strong> com <strong style={{color: 'orangered'}}>AfiliPRO</strong>.</strong></p>
                        <video height="720" controls style={{border: 'solid 10px #555', borderRadius: '10px'}}>
                            <source src={tutorial_video} type="video/mp4"></source>
                        </video>
                    </Col>
                    <Col md={12}>
                        <h2 style={{marginTop: '1rem'}}>Como ser um Afiliado na Shopee?</h2>
                        <p>Sigas os passos em  <a href="https://shopee.com.br/m/afiliados" target='_blank' style={{color: 'orangered'}}>Afiliados Shopee</a></p>
                        <h2 style={{marginTop: '1rem'}}>Como posso pagar a AfiliPRO?</h2>
                        <p>O pagamento é realizado através do Mercado Pago, possibilitando o pagamento por PIX, Cartão de Débito ou Crédito e não se preocupe, não precisa ter uma conta Mercado Pago para realizar o pagamento.</p>
                        <h2>Como me cadastro?</h2>
                        <ol className='feature-list'>
                            <li><span onClick={(e)=>{e.preventDefault();Navigate('/cadastro')}}>Cadastre-se <strong style={{color: 'orangered'}}>aqui!</strong></span></li>
                            <li><span>A AfiliPRO tem um valor único de R$ 20,00 para ser usado por 30 dias, depois renove se quiser!</span></li>
                            <li><span>Acesse a área de Produtos diáriamente, veja os produtos indicados do dia ou busque os produtos que deseja publicar em sua Shopee Vídeo</span></li>
                            <li><span>Acompanhe a performance de suas vendas na sua central de Afiliados</span></li>
                        </ol>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Home;