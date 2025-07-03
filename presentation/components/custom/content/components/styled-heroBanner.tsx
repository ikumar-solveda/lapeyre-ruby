import { styled } from '@mui/material/styles';
// import { palette } from "../../../../themes/color-palette";

export const StyledHeroBanner = styled('div')`
	${({ theme }) => `
    position: relative;

    /* .hero-banner-image {
      width: 100%;
      height: 616px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      ${theme.breakpoints.down('sm')} {
        padding-bottom: 100%;
        height: auto;

        img {
          position: absolute;
        }
      }
    } */

    ${theme.breakpoints.up('sm')} {
      .hero-banner-nav-slider {
        position: absolute;
        bottom: ${theme.spacing(4)};
        right: ${theme.spacing(4)};
        border-radius: 16px;
        padding: ${theme.spacing(0.5)} ${theme.spacing(2)};
        //min-width: 128px;

        .arrow.arrow--left {
          margin-right: ${theme.spacing(4)};
        }
        .arrow.arrow--right {
          margin-left: ${theme.spacing(4)};
        }
      }
    }

    .flex-basis {
      flex-basis: auto
    }

    .keen-slider {
      //height: 616px;
    }

    .fader__slide {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }

  `}
`;
