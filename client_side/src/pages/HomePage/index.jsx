import React, { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.css';
import Axios from 'axios';
import CardCad from '../../components/cards/cardCad';
import Card from 'react-bootstrap/Card';
import { Button, Col, Container, Row } from 'react-bootstrap';
import useSound from 'use-sound';
import ring from '../../assets/audio/ding.mp3';
import logo from '../../assets/image/vcolor.png';
import video1 from '../../assets/video/video1.mp4';
import video2 from '../../assets/video/video2.mp4';
import video3 from '../../assets/video/video3.mp4';
import video4 from '../../assets/video/video4.mp4';
import video5 from '../../assets/video/video5.mp4';
import video6 from '../../assets/video/video6.mp4';
import video7 from '../../assets/video/video7.mp4';
import video8 from '../../assets/video/video8.mp4';
import video9 from '../../assets/video/video9.mp4';
import video10 from '../../assets/video/video10.mp4';
import video11 from '../../assets/video/video11.mp4';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [listCad, setListCad] = useState([]);
    const [listTec, setListTec] = useState([]);
    const [now, setNow] = useState([]);
    const { speak, voices } = useSpeechSynthesis();
    const [nomeTempCad, setNomeTempCad] = useState();
    const [nomeTempTec, setNomeTempTec] = useState();
    var nomeNow = null;
    const [cadNow, setCadNow] = useState();
    const [tecNow, setTecNow] = useState();
    const [play, { stop }] = useSound(ring);
    const [isVisible, setIsVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
  
    const videoIntro = "https://www.w3schools.com/tags/movie.mp4";
    const videoLoop = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
  
    
  
    const [vidIndex, setVidIndex] = useState(0);
    const ref = useRef(null);
  
    const vidArray = [
      video1, video2, video3, video4, video5, video6, video7, video8, video9, video10, video11
    ];
  
    const vidLength = vidArray.length;
  
    const nomeVideo = vidArray[vidIndex];
  
    useEffect(() => {
      if (vidIndex === 0 && ref.current) {
        ref.current.play();
      }
     
    }, [ref, vidIndex]);
    //console.log(vidIndex);
    const handleVisibility = () => {
      // 👇️ toggle visibility
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, "10000");
    };
  
    
    const mutedHandler = () => {
      setIsMuted(true);
      setTimeout(() => {
        setIsMuted(false);
      }, "11000");
    }
  
    function chamaNome(nome) {
      
      
     
      play();
      setTimeout(() => {
        speak({
          default: true,
          text: nome,
          lang: "pt-BR",
          voice: voices[0],
          repeat: false
        })
      }, "4000");
      setTimeout(() => {
        speak({
          default: true,
          text: nome,
          lang: "pt-BR",
          voice: voices[0],
          repeat: false
        })
      }, "4000");
      
    }
  
    function click(id) {
      let element = document.getElementById(id);
      if (element.click)
        element.click();
      else if (document.createEvent) {
        let eventObj = document.createEvent('MouseEvents');
        eventObj.initEvent('click', true, true);
        element.dispatchEvent(eventObj);
      }
    }
  
  
    async function getNow() {
      await Axios.get("http://localhost:3001/getNow").then((response) => {
        if (response.data.length >= 1) {
          setNow(response.data.slice(0, 1)['0']);
          nomeNow = response.data.slice(0, 1)['0']['nome'];
        }
      });
  
      await Axios.get("http://localhost:3001/getCad").then((response) => {
        if (response.data.length >= 1) {
          setListCad(response.data.slice(0, 1)['0']);
          setNomeTempCad(response.data.slice(0, 1)['0']['nome']);
          
        }
      });
  
      await Axios.get("http://localhost:3001/getTec").then((response) => {
        if (response.data.length >= 1) {
          setListTec(response.data.slice(0, 1)['0']);
          setNomeTempTec(response.data.slice(0, 1)['0']['nome']);
        }
  
  
      });
  
  
      verificaUltimo();
      //console.log(nomeTempCad + ' CAD');
  
      //console.log(tecNow == now.nome);
  
      //console.log(nomeTempTec + ' CADEEE');
    }
  
    //console.log(now.nome + ' TEC#######');
  
    const verificaUltimo = () => {
      if (tecNow !== now.nome && cadNow !== now.nome) {
  
        //console.log(nomeTempCad + ' CAD111');
  
        //console.log(nomeTempTec + ' TEC111');
  
        setCadNow(nomeTempCad);
        setTecNow(nomeTempTec);
        handleVisibility();
  
  
        //console.log("Nome diferente!");
        //console.log(cadNow !== nomeNow);
  
  
        //chamaNome();
  
      }
  
    }
  
    const verificaVidNum = () => {
      setVidIndex((idx) => idx + 1)
      if(vidIndex == vidArray.length -1){
        setVidIndex((idx) => idx = 0);
      }
    }
  
  
    useEffect(() => {
      getNow();
      
    });
  
    useEffect(() => {
      mutedHandler();
      chamaNome(nomeTempCad);
      
    }, [nomeTempCad]);
  
    useEffect(() => {
      mutedHandler();
      chamaNome(nomeTempTec);
     
    }, [nomeTempTec]);
    



    return (<div className='app--container'>
    <div className="chamada" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      <div className="chamada--container container" >
        <div className='chamada--nome mt-1'>
          <h1>{now.nome}</h1>
        </div>
        <div className='chamada--info mt-2'>
          <h2 > {now.perfil_atendimento} - {now.prioridade} </h2>
          <h1> <strong>{now.horario}</strong></h1>
        </div>
      </div>
    </div>
    <Row className='principal'>
      <Col className='col-video' md={6}>
        {/* https://player.jmvstream.com/avj/fut4x2uu9cx01mZ7Mb2pm7RXeDRW38 */}

        {/* <iframe id="video" width="100%" height="560" src="https://tv.appmj.xyz/tv.php?canal=viva"
          title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen></iframe> */}

        {/*<iframe width="100%" height="515" src="https://www.youtube.com/embed/OxMAupCG1SI" title="YouTube video player"
          frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>*/}

        {/* <video className="m-5 mb-0" width="97%" autoPlay loop muted>
          <source src={video2} type="video/mp4" />

          Your browser does not support the video tag.
        </video>  */}

        <video
          className="video"
          src={nomeVideo}
          autoPlay
          //muted={isMuted}
          muted
          ref={ref}
          onEnded={() => verificaVidNum() }
        />
        {/*console.log(vidIndex)*/}
      </Col>
      <Col md={6}>
        <div className="logo--container container" >

          <img src={logo} alt="Logo" width="450" height="550" />

        </div>
      </Col>
    </Row>
    <div className='row--label--ultimos bg-warning'>

      <p><strong>ÚLTIMOS CHAMADOS</strong></p>

    </div>
    <Button id='toque' hidden>
      Ding Dong
    </Button>
    <Button id='nome' onClick={() => speak({
        default: true,
        text: now,
        lang: "pt-BR",
        voice: voices[16],
        repeat: false
      })} hidden>
      Chama Nome
    </Button>
    

    

    <div className='ultimos--container'>
      {listCad && <Card className="card--container bg-secondary">
        <div className="card--titulo">
          <h1 className="card--tipo text-warning"><strong>CADASTRO ÚNICO</strong></h1>
        </div>
        <Card.Body>
          <div className="card--body">
            <div className="div--card--nome">
              <h3 className="card--nome">{listCad.nome}</h3>
            </div>

            <div className="div--card--tipo ">
              <h3 className="card--prioridade">{listCad.horario} - {listCad.prioridade}</h3>

            </div>
          </div>


        </Card.Body>
      </Card>
      }

      {listTec && <Card className="card--container bg-secondary">
        <div className="card--titulo">
          <h1 className="card--tipo text-warning"><strong>ATENDIMENTO TÉCNICO</strong></h1>
        </div>
        <Card.Body>
          <div className="card--body">
            <div className="div--card--nome">
              <h3 className="card--nome">{listTec.nome}</h3>
            </div>

            <div className="div--card--tipo ">
              <h3 className="card--prioridade">{listTec.horario} - {listTec.prioridade}</h3>

            </div>
          </div>


        </Card.Body>
      </Card>
      }

      {/* {listCad && listCad.map((value) => {
        return <CardCad

          key={value.id}
          listCard={listCad}
          setListCard={setListCad}
          id={value.id}
          nome={value.nome}
          horario={value.horario}
          prioridade={value.prioridade}
          tipo={value.perfil_atendimento}
        ></CardCad>
      })}


      {listTec && listTec.map((value) => {
        return <CardCad

          key={value.id}
          listCard={listCad}
          setListCard={setListCad}
          id={value.id}
          nome={value.nome}
          horario={value.horario}
          prioridade={value.prioridade}
          tipo={value.perfil_atendimento}
        ></CardCad>
      })}
  */}
    </div>

  </div>)
}

export default HomePage;