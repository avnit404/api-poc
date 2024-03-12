import React, { useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const DisplayData = () => {
    const [postData, setPostData] = useState([]);
    const [showErrorAlert, setShowErrorAlert] = useState(false);


    const fetchData = async () => {
        setShowErrorAlert(false);

        try {
            const fetchedData = [];

            for (let postId = 1; postId <= 20; postId++) {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                fetchedData.push(response.data);
                setPostData([...fetchedData]);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataWithError = async () => {
        setPostData([]);
        if (!showErrorAlert) {
            try {
                const fetchedData = [];
                for (let postId = 1; postId <= 20; postId++) {
                    if (postId === 10) {
                        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/2000');
                        fetchedData.push(response.data);
                        setPostData([...fetchedData]);
                    }

                    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                    fetchedData.push(response.data);
                    setPostData([...fetchedData]);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setShowErrorAlert(true);
            }
        }
    };

    return (
        <Container className='mt-5 mb-3'>
            <div className='button-class mt-2 mb-2'>
                <Button variant='danger' onClick={fetchDataWithError}>Api With Error</Button>
                <Button variant='success' className='button-success' onClick={fetchData}>Normal Api</Button>
            </div>
            {showErrorAlert && (
                <Alert variant='danger' onClose={() => setShowErrorAlert(false)} dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>An error occurred while fetching data. Further API calls have been stopped.</p>
                </Alert>
            )}
            {<Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {postData.map(post => (
                    <Col key={post.id}>
                        <Card className='card-width'>
                            <Card.Body >
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                    {post.body}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
        </Container>
    );

}

export default DisplayData