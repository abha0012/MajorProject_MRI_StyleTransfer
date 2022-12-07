import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import donto from '../../../Images/about-banner1.png';
import dontoAnimated from '../../../Images/cleaner.png';
import './About.css';

const About = () => {

    useEffect(() => {
        AOS.init({
                duration: 2000,
            });
        AOS.refresh();
      }, []);
    return (
        <section className="about-wrapper">
            <Container>
                <Row>
                    <Col md={12} lg={6}>
                        <div className="about-left">
                            <img src={donto} alt="donto" className="img-fluid donto" />
                            {/* <img src={dontoAnimated} alt="donto" className="img-fluid animated dontoAnim" /> */}
                        </div>
                    </Col>
                    <Col md={12} lg={6}>
                        <div className="about-right mt-5 mt-lg-0">
                            <div className="about-content text-start" data-aos="zoom-in">
                                <h1>Welcome to a Sustainable Solution</h1>
                                <p>Welcome to MRIfix. Are you in need of any brain MRI clarifying software? We got you covered. We provide you a solution for all axial brain MRI images, we not only clarify them, but we also convert the T1 images to T2 and vice versa. Just click on the upload button in the navigation bar!</p>
                                {/* <a href='/page/about'>About Us</a> */}
                            </div>
                            <div className="fun-fact-sec" data-aos="fade-right">
                                <div className="single-fun">
                                    <span>500</span>
                                    <span>+</span>
                                    <p>Datasets Trained</p>
                                </div>
                                <div className="single-fun sp-fun" data-aos="fade-right">
                                    <span>100</span>
                                    <span>+</span>
                                    <p>Images Clarified</p>
                                </div>
                                <div className="single-fun" data-aos="fade-left">
                                    <span>25</span>
                                    <span>+</span>
                                    <p>Solutions Provided</p>
                                </div>
                                <div className="single-fun sp-fun" data-aos="fade-left">
                                    <span>10</span>
                                    <span>+</span>
                                    <p>Patients Satisfied</p>
                                </div>
                                <span className="line"></span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default About;