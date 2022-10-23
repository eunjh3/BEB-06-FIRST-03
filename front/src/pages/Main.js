import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// TODO - 메인 페이지를 작성합니다.
export default function Main () {
  const [assets, setAssets] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(()=> {
    callImage();
  },[])

  const callImage = () => {
    const options = {
      method: 'GET',
      url: 'https://testnets-api.opensea.io/api/v1/assets?order_by=sale_count&order_direction=desc&offset=0&limit=20&include_orders=false'
    }
    setloading(true);
    axios.request(options)
      .then((res) => {
        setAssets(res.data.assets);
        setloading(false);
      })
      .catch((e) =>  console.error(e));
  }

  const navigate = useNavigate();
  
  return (
    <Container>
      <Row>
        {loading?<>로딩중</>:assets.map((asset,idx)=>
        <Card style={{ width: '18rem' }} key ={idx}>
        <Card.Img variant="top" src={asset.image_url} />
        <Card.Body>
          <Card.Title>{asset.name}</Card.Title>
        </Card.Body>
        </Card>)}
      </Row>
    </Container>
  );
}
