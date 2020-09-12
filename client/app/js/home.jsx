import React from 'react';
import Config from 'Config'
import HandleError from './handleerror'
import {Helmet} from "react-helmet";
import Slider from "react-slick"
import { BrowserRouter as Router, Route, Link, Prompt, Switch} from 'react-router-dom'
var retry = true;
var imageurl = 'client/app/css/images'

export default class home extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
      {
        'errortext':'',
        datajson: []
      };
    this.showhintbox = this.showhintbox.bind(this)
    this.addletterhandler = this.addletterhandler.bind(this)
    this.removeallselecthandler = this.removeallselecthandler.bind(this)
  }

  componentDidMount() {
    var datajson= [
      {
        images: [imageurl+'/brain1.png', imageurl+'/brain2.png', imageurl+'/brain3.png', imageurl+'/brain4.jpg'],
        hint: 'pensar',
        noOfLetters: 6,
        selectedletters: [],
        alphabets: ['e','p','s','a','r','n'],
        result: false
      },
      {
        images: [imageurl+'/money1.png', imageurl+'/money2.jpg', imageurl+'/money3.png', imageurl+'/money4.jpg'],
        hint: 'plata',
        noOfLetters: 5,
        selectedletters: [],
        alphabets: ['d','l', 'a', 'p', 'a', 't', 'a'],
        result: false
      },
      {
        images: [imageurl+'/hornear.jpeg',imageurl+'/hornear2.jpeg',imageurl+'/hornear3.jpeg'],
        hint: 'hornear',
        noOfLetters: 7,
        selectedletters: [],
        alphabets: ['r', 'o', 'h', 'n', 'e', 'n','x','r','a'],
        result: false
      },
      {
        images: [imageurl+'/hernan.jpg'],
        hint: 'hernan',
        noOfLetters: 6,
        selectedletters: [],
        alphabets: ['n', 'h', 'r', 'a', 'e', 'n','x'],
        result: false
      },
      {
        images: [imageurl+'/campa1.jpeg',imageurl+'/campa2.jpeg'],
        hint: 'campamento',
        noOfLetters: 10,
        selectedletters: [],
        alphabets: ['a', 'm', 'h','c','n', 'e', 'o','t','p'],
        result: false
      },
      {
        images: [imageurl+'/jony1.jpeg',imageurl+'/jony2.jpeg'],
        hint: 'jony',
        noOfLetters: 4,
        selectedletters: [],
        alphabets: ['a', 'o', 'j','c','n', 'y', 'o','z','u'],
        result: false
      },
      {
        images: [imageurl+'/tor1.jpeg',imageurl+'/tor2.jpeg'],
        hint: 'torneo',
        noOfLetters: 6,
        selectedletters: [],
        alphabets: ['o', 'e', 'n','r','t'],
        result: false
      },
      {
        images: [imageurl+'/ale1.jpeg',imageurl+'/ale2.jpeg'],
        hint: 'alergia',
        noOfLetters: 7,
        selectedletters: [],
        alphabets: ['g', 'i', 'l','r','g','a','e'],
        result: false
      },
      {
        images: [imageurl+'/fiaca.jpeg',imageurl+'/fiaca1.jpeg'],
        hint: 'fiaca',
        noOfLetters: 5,
        selectedletters: [],
        alphabets: ['d','o','a', 'c','a','f','i','e'],
        result: false
      },
      {
        images: [imageurl+'/prueba.jpeg',imageurl+'/prueba1.jpeg'],
        hint: 'prueba',
        noOfLetters: 6,
        selectedletters: [],
        alphabets: ['e','b','a','c','r','u','b','e','p'],
        result: false
      },
      {
        images: [imageurl+'/cebar.jpeg'],
        hint: 'cebar',
        noOfLetters: 5,
        selectedletters: [],
        alphabets: ['e', 'c', 'a','b','r'],
        result: false
      },
    ]
    this.setState({
      datajson: datajson
    })
  }

  showhintbox(event) {
    var id = event.target.id.split('_')[1]
    var hintboxid = 'hint_'+id
    console.log("id and hintboxid", id, hintboxid)
    $('#'+hintboxid).show();
  }

  addletterhandler(event) {
    var text = event.target.innerHTML
    var data = event.target.getAttribute('data-index')
    console.log(event);
    var datajson = this.state.datajson
    console.log("innerhtml of button", text, data)
    var updatedjson = datajson.map(function(i, index) {
    
      if(index == data) {
        i.selectedletters.push(text);
      }
      if(i.selectedletters.length == i.noOfLetters) {

        var word=""
        i.selectedletters.map(function(j) {
          word = word+j;
        })
        if(word == i.hint){
          i.result = true;
        }
        else {
          $('#'+index).find('.button').attr('disabled', true);
          $('#'+index).find('.wrongguess').show();
        }
      }
      return(i);
    })
    this.setState({datajson: updatedjson})
  }

  removeallselecthandler(event) {
    var data = event.target.getAttribute('data-index')
    var datajson = this.state.datajson
    console.log("innerhtml of button", data)
    var updatedjson = datajson.map(function(i, index) {
      if(index == data) {
        i.selectedletters = [];
        $('#'+index).find('.button').attr('disabled', false);
        $('#'+index).find('.wrongguess').hide();
      }
      return(i);
    })
    this.setState({datajson: updatedjson})
  }

  render() {
    var settings = {
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    var data
    if(this.state.datajson.length>0) {
      data = this.state.datajson.map(function(i, index) {
        if(i.result == false) {
          var images = i.images.map(function(j, imageindex) {
            return (
              <div key={imageindex} className="image">
                <img src={j} width="150" height="150"/>
              </div>
            );
          })
          var ansboxes=[]
          for(var k=0; k<i.noOfLetters; k++) {
            var box= <div className="ansbox" key={k} >{i.selectedletters[k] ? i.selectedletters[k] : ''}</div>
            ansboxes.push(box)
          }
          var filteredalphabets = i.alphabets.filter(function(a) {
                return(a);
          })
          return (
            <div key={index} id={index}>
              <div className="imagewraper">
                {images}
              </div>
              <div className="ansboxeswrapper">
                {ansboxes.map(function(l) {
                  return(l);
                })}
                <button className="hintbutton" type="button" onClick={this.removeallselecthandler} data-index={index}> Limpiar </button>
              </div>
              <div className="wrongguess" style={{display: 'none'}}>Casi pero no, Por favor, Limpia con el Boton y vuelva a intentar maquinola.</div>
              <div className="alphabetbuttons">
                {filteredalphabets.map(function(l, lindex) {
                    return(<button key={lindex} className="button" type="button" data-index={index} onClick={this.addletterhandler}>{l}</button>);
                }, this)}
              </div>
              <div className="hintbox">
                <button className="hintbutton" type="button" id={"hintbuton_"+index} onClick={this.showhintbox}>Hint</button>
                <div className="hint" id={"hint_"+index}>{i.hint}</div>
              </div>
            </div>
          );
        }
        else {
          return(
            <div className="successdiv" key={index}>
              <img src={imageurl+'/success.png'} width="150" height="150" />
              <span style={{color:"green",fontSize:"40px"}}>Excelente Maquinola!!! </span>
            </div>
          );
        }
      },this)
    }
    var apierr
    if(this.state.retryBtn){
        apierr = this.state.retryBtn
    }
    else{
        apierr = ""
    }
    var networkerror
    if(this.state.errortext)
      networkerror=<HandleError errortext={this.state.errortext} />
    return (
      <div>
        <Helmet>
          <title>4 Fotos Gap C</title>
          <meta name="description" content= "This is main page of basic setup of react using routing"/>
          <meta itemprop="name" content="React setup" />
          <meta itemprop="description" content="This is a project named React basic setup" />
        </Helmet>
        <div>
          {networkerror}
          <div id="apierror"></div>
          {apierr}
          <div>
            <Slider {...settings}>
              {data}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}