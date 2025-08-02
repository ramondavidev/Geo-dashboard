import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}10 0%,
    ${({ theme }) => theme.colors.secondary}10 100%
  );
`;

const Header = styled(motion.header)`
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => `0 ${theme.spacing.lg}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => `${theme.spacing.sm} 0 0 0`};
`;

const Main = styled(motion.main)`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing["2xl"]} ${theme.spacing.lg}`};
  flex: 1;
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => `0 ${theme.spacing.lg}`};
`;

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
          <div>
            <Title>🌍 {title}</Title>
            <Subtitle>Modern geo-location user management</Subtitle>
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
