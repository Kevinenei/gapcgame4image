import React from 'react';
import {Helmet} from "react-helmet";
import Config from 'Config'
import HandleError from './handleerror'
import { BrowserRouter as Router, IndexRoute, Route, Link, Prompt, Switch} from 'react-router-dom'

var imageurl = 'client/app/css/images'
export default class landingpage extends React.Component {
	constructor(props) {
	    super(props); 
	}

  	render() {
	    return (
	      <div>
	      	<Helmet>
	          <title>React basic setup</title>
	          <meta name="description" content= "This is basic setup of react"/>
	          <meta itemprop="name" content="react basic setup" />
	          <meta itemprop="description" content="This is a project named react basic setup" />
	        </Helmet>
	        <h2 style={{textAlign: 'center'}}><img width="40px" src={imageurl+"/4-fotos-1-palabra.png"}></img></h2>
			<h2 style={{textAlign: 'center'}}></h2>
			
			{/*here render its child component*/}
				<div className="children">
	        		{this.props.children}
				</div>
	      </div>
	    );
  	}
}