import React from "react";
import styled from "styled-components/macro";

import SHOES from "../../data";
import ShoeCard from "../ShoeCard";

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <CardWrapper key={shoe.slug}>
          <ShoeCard {...shoe} />
        </CardWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
`;

const CardWrapper = styled.div`
  flex: 1;
  min-width: 275px;

  &:last-of-type & {
    max-width: unset;
  }
`;

export default ShoeGrid;
