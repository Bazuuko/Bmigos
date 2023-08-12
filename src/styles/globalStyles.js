import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--primary);
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;


export const timer = styled.div`

  display: inline-block;
  text-align: center;
  width: 250px;
  `;

export const col3 = styled.div`

  width: 25%;
  float: left;
  `;

export const box = styled.div`
  border-right: dotted 1px rgba(255, 255, 255, 0.2); 
  font-weight: 10;
  padding: -10px;
  `;


// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`;

export const SpacerLargeX = styled.div`
  height: 100px;
  width: 100px;
`;

export const SpacerLargeXXX = styled.div`
  height: 200px;
  width: 200px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
`;


export const TextTitle = styled.p`
font-family: 'Silkscreen', cursive;
-webkit-font-smoothing : none;
letter-spacing: 2px;
font-weight: 1000;
  color: transparent; 
  color: var(--primary-text);
  font-size: 22px;
  line-height: 1.6;
  text-shadow: 0px 0px 2px white, 0 0 1em blue, 0 0 0.2em blue, 1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`;

export const TextTitle2 = styled.p`
font-family: "Inter", sans-serif;
-webkit-font-smoothing : none;
letter-spacing: 2px;
font-weight: 1000;
  color: transparent; 
  color: var(--primary-text);
  font-size: 22px;
  line-height: 1.6;
  text-shadow: 0px 0px 2px white, 0 0 1em blue, 0 0 0.2em blue, 1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`;

export const TextSubTitle = styled.p`
font-family: 'Silkscreen', cursive;
color: var(--accent-text);
line-height: 1.6;
letter-spacing: -2px;
text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
`;

export const TextDescription = styled.p`
font-family: 'Silkscreen', cursive;
font-size: small;
text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
letter-spacing: 2px;
  color: var(--primary-text);
  font-size: 25px;
  line-height: 1.6;
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;
