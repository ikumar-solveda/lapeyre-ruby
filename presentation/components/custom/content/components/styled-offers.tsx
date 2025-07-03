import { styled } from '@mui/material/styles';

export const StyledOffers = styled('div')`
	${({ theme }) => `
    background: ${'#F9F4EE'};
    padding: ${20} 0;
    overflow: hidden;

    ${theme.breakpoints.down('sm')} {
      padding: ${theme.spacing(15)} 0;
    }

    &.bg-white {
      background: ${'#252427'};
    }

    .offers-img-container {
      height: 162px;
      img {
        width: 100%;
        height: 100%;
        background-size: cover;
      }
    }

    .offers-push-promo-container {
        background-size: cover;
    }

    .keen-slider.overflow-visible {
      overflow: visible;
    }

  `}
`;
