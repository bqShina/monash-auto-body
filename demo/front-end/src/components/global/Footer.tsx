import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export const Footer = () => {
  const deadLink = "#";
  return (
    <>
      {/* <div className="wrapper d-flex flex-column justify-content-between"> */}
      <footer className="footer-container">
        <div className="copyright-area">
          <Container>
            <Row>
              <Col md={12}>
                <div className="copyright-inner-container">
                  <ul>
                    <li>
                      <a href={deadLink}>Privacy & Cookies</a>
                    </li>
                    <li>
                      <a href={deadLink}>Terms & Conditions</a>
                    </li>
                    <li>
                      <a href={deadLink}>Legal Disclaimer</a>
                    </li>
                    <li>
                      <a href={deadLink}>Community</a>
                    </li>
                  </ul>
                  <div className="copyright-end">
                    Copyright 2023. Shina Qin. All rights reserved
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
      {/* </div> */}
    </>
  );
};
