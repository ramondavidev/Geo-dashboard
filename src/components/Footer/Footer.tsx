import React from "react";
import { FooterProps } from "./Footer.types";
import {
  FooterContainer,
  FooterContent,
  FooterInner,
  FooterText,
  CreatedByText,
  AuthorLink,
  Separator,
  PassionSection,
  StarIcon,
  PassionText,
} from "./Footer.styles";

export const Footer: React.FC<FooterProps> = ({ show = true, userCount = 0 }) => {
  // Only show footer if explicitly set to show and there are users
  if (!show || userCount === 0) {
    return null;
  }

  return (
    <FooterContainer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <FooterContent>
        <FooterInner>
          <FooterText>
            <CreatedByText>Created by</CreatedByText>
            <AuthorLink
              href="https://ramondavi.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ramon
            </AuthorLink>
            <Separator>•</Separator>
            <PassionSection>
              <StarIcon>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </StarIcon>
              <PassionText>Built with passion</PassionText>
            </PassionSection>
          </FooterText>
        </FooterInner>
      </FooterContent>
    </FooterContainer>
  );
};
