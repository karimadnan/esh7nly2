import React, { Component } from 'react';
import '../Mycss.css';

import Navbar from './navbar';


class testPage extends Component {

    state ={
        defaultImage: '',
        colors: [],
        options: [],
        kos: '',
        tempKos: ''
    }

    updateInput(key, value) {
        this.setState({ [key]: value });
    }

    pushInput(key, value){
        let temp = this.state.colors
        temp.push({label: this.state.kos, value: this.state.tempKos})
    }

    render(){
        return(
            <div>
                <input type='file' id='single' onChange={e => this.updateInput("defaultImage", e.target.files[0])}/> 
                <Navbar />
                <div>
                    
                    <input type='file' id='single' onChange={e => this.updateInput("tempKos", e.target.files[0])}/> 
                    <input class="form-control" type="text" onChange={e => this.updateInput("kos", e.target.value)} required></input>
                </div>
            </div>
        )
    }
}

export default testPage;
