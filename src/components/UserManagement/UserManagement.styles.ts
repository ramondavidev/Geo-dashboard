import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 400px;
  }
`;

export const UsersSection = styled.div`
  min-width: 0; /* Prevent grid blowout */
`;

export const MapSection = styled.div`
  @media (max-width: 1199px) {
    order: -1; /* Show map first on mobile */
  }
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

export const TimeZonesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray100};
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    #667eea
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary},
      #667eea
    );
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;

    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const HeaderButton = styled.button`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
  }
`;

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const UserCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.gray200};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const UserName = styled.h3`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

export const UserDetail = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LocationInfo = styled.div`
  background: ${(props) => props.theme.colors.gray50};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: 0.75rem;
  margin: 1rem 0;
`;

export const CoordinateText = styled.span`
  font-family: "Monaco", "Menlo", monospace;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textMuted};
`;

export const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const ErrorMessage = styled.div`
  background: ${(props) => props.theme.colors.gray50};
  color: ${(props) => props.theme.colors.danger};
  border: 1px solid ${(props) => props.theme.colors.gray200};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const ButtonWithMargin = styled.button`
  margin-top: 1rem;
`;
