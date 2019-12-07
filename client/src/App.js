import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Descriptions, Card, Layout} from 'antd';

import { Input } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";

const { Search } = Input;

const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {apiResponse: null};
  }

  callAPI(tickr){
    let url = "http://localhost:9000/testAPI/" + tickr;
    fetch(url)
      .then(res=> res.text())
      .then(res => {console.log(res);this.setState({apiResponse: JSON.parse(res)});})
      .catch(err => err);
  }

   
  formatData(obj){
    //will always have name
    //obj = JSON.parse(obj);
    let arr = [];
    let keys = Object.keys(obj);
    console.log(keys);
    console.log((obj));
   
    for (var i = 0; i < keys.length; i++) {
      arr.push(<Descriptions.Item span={2} label={keys[i]}>{obj[keys[i]]} </Descriptions.Item>);
      
    }
    
    return arr;
  }
    dataView()
    {
      if(this.state.apiResponse == null){
              return(<div>Enter a valid TICKR of the company for which you need information. The data-fetch might take sometime. Please be patient.</div>)
            }
            else
            {
              return(
              <div>
              <div className="mb-4">Enter a valid TICKR of the company for which you need information. The data-fetch might take sometime. Please be patient.</div>
              <Descriptions title={"Company Information"} bordered>
              {(this.formatData(this.state.apiResponse))}
              </Descriptions>
              </div>
              )
            }
    }

  componentDidMount(){
    //this.callAPI();
  }



  render(){
    return (
      <div className="App" style = {{ marginBottom: "10px", paddingTop: "20px"}} >

      <Row>
      <Col span={4}>
      </Col>
      <Col span={4}>

      <Search
      placeholder="Input Tickr"
      onSearch={value => this.callAPI(value)}
      style={{ width: 200 }}
      />
      </Col>
      <Col span={4}>
      </Col>
      </Row>
   

        <Row className="mt-4">
          <Col span={4}></Col>
          <Col span={16}>
          {
            this.dataView()
          }
          </Col>
          <Col span={4}></Col>
        </Row>
       
        
      </div>
    );
  }
};

export default App;
