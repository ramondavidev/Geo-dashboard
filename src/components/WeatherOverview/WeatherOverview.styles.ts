import styled from "styled-components";
import { motion } from "framer-motion";

export const WeatherOverviewContainer = styled(motion.div)`
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.gray200};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${(props) =>
      props.theme.shadows.md ||
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"};
    transform: translateY(-2px);
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TitleIcon = styled.span`
  font-size: 1.75rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.gray50};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 1.25rem;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.gray100};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${(props) => props.theme.colors.white};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: ${(props) => props.theme.colors.gray300};
  }
`;

export const StatIcon = styled.div<{ $color?: string }>`
  color: ${(props) => props.$color || props.theme.colors.primary};
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background: ${(props) => {
    const color = props.$color || props.theme.colors.primary;
    return `linear-gradient(135deg, ${color}20, ${color}10)`;
  }};
  border: 2px solid
    ${(props) => `${props.$color || props.theme.colors.primary}30`};
  border-radius: 50%;
  margin: 0 auto 0.75rem auto;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    padding: 2px;
    background: linear-gradient(
      135deg,
      ${(props) => props.$color || props.theme.colors.primary}40,
      transparent
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .stat-card:hover & {
    transform: scale(1.1);
    opacity: 1;
    box-shadow: 0 4px 20px
      ${(props) => `${props.$color || props.theme.colors.primary}25`};

    &::before {
      opacity: 1;
    }
  }
`;

export const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  line-height: 1.2;
  transition: color 0.3s ease;
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.3;
`;

export const ConditionsSection = styled.div`
  margin-top: 1.5rem;
`;

export const ConditionsTitle = styled.h3`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ConditionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ConditionItem = styled(motion.div)<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.gray200};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border-left: 4px solid ${(props) => props.$color};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.gray50};
    transform: translateX(4px);
  }
`;

export const ConditionIcon = styled.span`
  font-size: 1.25rem;
  min-width: 1.5rem;
  text-align: center;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
`;

export const ConditionInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ConditionName = styled.span`
  color: ${(props) => props.theme.colors.textPrimary};
  font-weight: 500;
  text-transform: capitalize;
`;

export const ConditionStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

export const ConditionCount = styled.span`
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: 500;
`;

export const ConditionPercentage = styled.span<{ $color: string }>`
  color: ${(props) => props.$color};
  font-weight: 600;
  background: ${(props) => props.$color}15;
  padding: 0.125rem 0.375rem;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: 0.75rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${(props) => props.theme.colors.textMuted};
`;

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

export const EmptyText = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;
