import React from "react";
import { LayoutProps } from "./Layout.types";
import { EarthIcon } from "../EarthIcon";
import {
  Container,
  Header,
  HeaderContent,
  Title,
  Subtitle,
  Main,
  Footer,
  FooterContent,
} from "./Layout.styles";

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Geo-CRUD",
}) => {
  return (
    <Container>
      <Header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <HeaderContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <EarthIcon size={38} />
            <div>
              <Title>{title} 123</Title>
              <Subtitle>Modern geo-location user management</Subtitle>
            </div>
          </div>
        </HeaderContent>
      </Header>

      <Main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        {children}
      </Main>

      <Footer>
        <FooterContent>
          <p>Built with Next.js, TypeScript, Styled Components & Firebase</p>
          <p>Powered by OpenWeatherMap API for real-time geo-location data</p>
        </FooterContent>
      </Footer>
    </Container>
  );
};
