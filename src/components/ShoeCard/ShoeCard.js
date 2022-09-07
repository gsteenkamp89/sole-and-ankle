import React from "react";
import styled, { css } from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const VARIANTS = {
    "new-release": {
      color: COLORS.secondary,
      label: "Just Released!",
    },
    "on-sale": {
      color: COLORS.primary,
      label: "Sale",
    },
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant !== "default" && (
          <Tag color={VARIANTS[variant].color}>{VARIANTS[variant].label}</Tag>
        )}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 16px 16px 4px 4px;
  margin: 0;
`;

const Image = styled.img`
  width: 100%;
  padding: 0;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(p) => p.variant === "on-sale" && "line-through"};
  color: ${(p) => p.variant === "on-sale" && COLORS.gray[700]};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  font-weight: ${WEIGHTS.medium};
`;

const SalePrice = styled(Price)`
  color: ${COLORS.primary};
  font-weight: 600;
`;

const Tag = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.white};
  background-color: ${(p) => p.color};
  position: absolute;
  top: 18px;
  right: -4px;
  padding: 7px 9px;
  border-radius: 2px;
`;

export default ShoeCard;
