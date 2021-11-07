import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme {}
}

const colors = {
  palette: {
    primary: {
      main: '#0d8340',
    },
    error: {
      main: '#ed1c24',
    },
    success: {
      main: '#00a371',
    },
    warning: {
      main: '#ffaf26',
    },
    grey: {
      200: '#626e72',
      300: '#ebf0f3',
      400: '#d6dfe4',
      800: '#2c3537',
    },
    text: {
      primary: '#2c3537',
      disabled: '#a7b1b6',
      secondary: '#2c3537',
    },
    action: {
      disabled: '#d6dfe4',
    },
  },
};

const fontSystem = {
  fontFamily: "'-apple-system', BlinkMacSystemFont, Segoe UI, Roboto",
};

const fontSarabun = {
  fontFamily: "'Sarabun', sans-serif",
};

const theme = createTheme({
  ...colors,
  spacing: 4,
  typography: {
    fontFamily: "'Kanit', sans-serif",
    fontSize: 15,
    h3: {
      fontSize: 22,
      fontWeight: 500,
    },
    h4: {
      fontSize: 20,
      fontWeight: 500,
    },
    h5: {
      fontSize: 18,
      fontWeight: 500,
    },
    h6: {
      fontSize: 16,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 15,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontWeight: 400,
      fontSize: 15,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: 13,
    },
    caption: {
      ...fontSystem,
      fontSize: 12,
      color: colors.palette.grey[200],
    },
  },
  components: {
    MuiOutlinedInput: {
      defaultProps: {
        notched: false,
      },
      styleOverrides: {
        notchedOutline: {
          borderColor: colors.palette.grey[400],
        },
        root: {
          borderRadius: '8px',
          borderWidth: '1px !important',
          borderColor: colors.palette.grey[400],
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.palette.grey[400],
          },
          '& input:valid:focus + fieldset': {
            borderWidth: 1,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.palette.grey[400],
          },
          '&.Mui-error fieldset': {
            borderColor: '#ed1c24 !important',
          },
        },
        input: {
          ...fontSystem,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 12,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          padding: 6,
        },
        text: {
          fontSize: 15,
          color: 'white',
        },
        contained: {
          boxShadow: '0',
          '&:hover': {
            boxShadow: 0,
          },
          '&.Mui-disabled': {
            backgroundColor: '#e9eff1',
            color: '#a2acb3',
          },
        },
        outlined: {
          borderColor: '#d6dfe4',
          color: colors.palette.grey[800],
          padding: 10,
        },
        sizeSmall: {
          minWidth: 115,
        },
        sizeLarge: {
          paddingLeft: 12,
          paddingRight: 12,
          height: 44,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: 12,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 44,
          '&.Mui-disabled': {
            background: colors.palette.grey[300],
          },
          '&.Mui-disabled .MuiIcon-root': {
            color: grey[900],
          },
        },
        input: {
          '&::placeholder': {
            fontSize: '12px',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '& .MuiIcon-root': {
            fontSize: 18,
            width: 30,
            display: 'flex',
            justifyContent: 'center',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          opacity: 0,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: colors.palette.text.disabled,
          borderColor: colors.palette.grey[400],
          borderRadius: '8px !important',
          backgroundColor: 'transparent !important',
          '&.Mui-selected': {
            borderColor: colors.palette.success.main,
            backgroundColor: 'transparent',
            '& .MuiIcon-root': {
              color: colors.palette.success.main,
            },
            '& .MuiTypography-caption': {
              color: colors.palette.text.primary,
            },
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          display: 'flex',
          '& .MuiToggleButton-root': {
            '&:first-of-type': {
              marginRight: '6px',
            },
            '&:not(:first-of-type)': {
              marginLeft: '6px',
            },
          },
        },
        grouped: {
          flexGrow: 1,
        },
        groupedHorizontal: {
          '&:not(:first-of-type)': {
            borderColor: colors.palette.grey[400],
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'start',
        },
        label: {
          ...fontSarabun,
          fontSize: 12,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 2,
          border: '1px solid #a7b1b6',
          borderRadius: 4,
          width: 16,
          height: 16,
          marginTop: 2,
          marginRight: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&.Mui-checked': {
            background: colors.palette.success.main,
            borderColor: colors.palette.success.main,
          },
          '&.Mui-checked .MuiIcon-root': {
            color: '#fff',
            fontSize: 12,
          },
        },
        colorPrimary: {
          color: colors.palette.text.disabled,
          '&.Mui-checked': {
            color: colors.palette.success.main,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#e9eff1',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          '& .MuiTabs-flexContainer': {
            justifyContent: 'flex-start',
            flexWrap: 'nowrap',
          },
          '& button': {
            color: '#a2acb3',
            fontSize: 13,
            fontWeight: 400,
            textTransform: 'capitalize',
            opacity: 1,
            padding: 0,
            borderBottom: 0,
            minWidth: '20%',
            flex: '0 0 20%',
            flexDirection: 'column',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'flex',
              width: '50%',
              height: 3,
              borderRadius: 2,
              position: 'absolute',
              bottom: '-100%',
              backgroundColor: 'transparent',
              transition: 'bottom 0.3s',
            },
            '&.Mui-selected': {
              color: colors.palette.primary.main,
              '&::after': {
                backgroundColor: colors.palette.primary.main,
                bottom: '0',
              },
              '& img': {
                filter: 'grayscale(0)',
                opacity: '1',
              },
            },
            '& img': {
              width: 26,
              height: 26,
              filter: 'grayscale(100%)',
              opacity: '0.5',
            },
          },
          '& .MuiTabs-indicator': {
            display: 'none',
          },
          '& .MuiTabs-scroller': {
            overflowX: 'auto !important',
          },
        },
      },
    },
  },
  mixins: {},
});

export default theme;
