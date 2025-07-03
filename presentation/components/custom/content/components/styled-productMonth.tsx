import { styled } from '@mui/material/styles';
// import { palette } from "../../../../themes/color-palette";

export const StyledProductMonth = styled('div')`
	${({ theme }) => `
    background: ${'#F9F4EE'};
    padding: ${theme.spacing(20)} 0;
    width:100%;

    ${theme.breakpoints.down('sm')} {
      padding: ${theme.spacing(15)} 0;
    }

    .bg-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .left-image-container {
      padding-bottom: 100%;
      position: relative;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .left-image {
      height: auto;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      object-position: top;

      ${theme.breakpoints.down('sm')} {
        &.absolute {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100px;
          border-left: ${'#252427'} 1px solid;
          border-top: ${'#252427'} 1px solid;
        }
      }
    }

    .right-image {
      height: 620px;
      object-fit: cover;
      object-position: top;

      &.horizontal {
        height: 580px;

        ${theme.breakpoints.down('sm')} {
          height: 240px;
        }
      }

      &.h-600 {
        height: 600px;

        ${theme.breakpoints.down('sm')} {
          height: 480px;
        }
      }

      ${theme.breakpoints.down('sm')} {
        height: 480px;
      }
    }

  `}
`;
