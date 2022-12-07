import "@fontsource/josefin-sans";
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import doctorfinding from '../../../Images/doctorfinding.c2532ac3.png';
import heroTeeth from '../../../Images/hero-theeth.54c2c4e9.png';
import womanbrush from '../../../Images/woman-brush.c4158ac5.png';
import './Banner.css';



const Banner = () => {
    return (
            <section className="single-hero-slide text-white d-flex justify-content-center align-items-center">
                <Container>
                    <Row className="align-items-center">
                        <Col md={12} sm={12} lg={6}>
                            <div className="hero-slide-left justify-content-end align-items-center text-center text-lg-start">
                                {/* <h2>A trustworthy website that you can rely on for fixing complex MRIs with improved imaging.</h2> */}
                                <h1>Deliver accurate and timely healthcare</h1>
                                <p className="mb-xs-5">We are a team of software engineers that built and effcetive platform for doctors, who are confused while reading MRIs and find them difficult to diagnose. MRIfix will help you to, not only enhance the image, but also highlight the areas which reflect water. We transfer styles in MRI using Generative Adversarial Networks and convert the MRI into T1 weighted and T2 weighted images. </p>
                                <div className="banner-btn m-sm-auto">
                                    <Link to="/upload"><button className="theme-btn btn-fill">Upload</button></Link>
                                    <Link to="/"></Link><button className='theme-btn bth-blank'>Learn More</button>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} sm={12} lg={6} className="mt-sm-5">
                            <div className="hero-slide-right text-center text-lg-start mt-sm-5">
                                <div className="animate-img">
                                    {/* <img src={womanbrush} alt="" className="img-fluid aimg1" /> */}
                                    {/* <img src={doctorfinding} alt="" className="img-fluid aimg2" /> */}
                                </div>
                                <img src={heroTeeth} alt="" className="heroTeeth"/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
    );
};

export default Banner;