import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "../Footer/FooterStyle";

const Footer = () => {
return (
	<Box>
	<h2 style={{ color: "white",
				textAlign: "center",
				marginTop: "-50px" }}>
		NATIONAL COVID-19 PREVENTION AND CONTROL TECHNOLOGY CENTER
	</h2>
	<Container>
		<Row>
		<Column>
			<Heading>About Us</Heading>
			<FooterLink href="#">Our Team</FooterLink>
			<FooterLink href="#">Our Vision</FooterLink>
		</Column>
		<Column>
			<Heading>Our Services</Heading>
			<FooterLink href="#">Mobile Vaccination</FooterLink>
			<FooterLink href="#"></FooterLink>
		</Column>
		<Column>
			<Heading>Contact Us</Heading>
            <FooterLink href="#">Hung Le</FooterLink>
			<FooterLink href="#">Huy Vo</FooterLink>
			<FooterLink href="#">Chau Huynh</FooterLink>
			<FooterLink href="#">Khang Truong</FooterLink>
            <FooterLink href="#">Nguyen Le</FooterLink>
		</Column>
		<Column>
			<Heading>Social Media</Heading>
			<FooterLink href="#">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				Twitter
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink>
		</Column>
		</Row>
	</Container>
	</Box>
);
};
export default Footer;
