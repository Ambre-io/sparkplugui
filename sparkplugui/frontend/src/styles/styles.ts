import {stylesType} from "../utils/types.ts";
import {
    ambreCardBoxGrey,
    muiMiddleGrey,
    primaryDark, primaryDarkLight,
    primaryLight,
    primaryMain,
    primaryMainDark, primaryMainSupraLight, white
} from "./muiTheme.ts";

const ambreCardBoxShadow = `0px 0px 3px 0px ${ambreCardBoxGrey}`;

const ambreBorder = (color: string, size = 1, radius = 1) => ({
    border: `${size}px solid ${color}`,
    borderRadius: radius,
});

export const styles: stylesType = {
    // ******************************************
    // * COMMON
    // ******************************************
    ambreCard: {
        boxShadow: ambreCardBoxShadow,
        borderRadius: 3,
        background: primaryDarkLight,
        height: '100%',
    },
    ambreCardTitle: {
        fontFamily: 'TitilliumWebBold',
        fontSize: 18,
        fontWeight: 800,
        textTransform: 'uppercase',
    },
    ambreCardContentContainer: {
        ...ambreBorder(ambreCardBoxGrey, 1, 1),
        background: primaryMainSupraLight,
        height: 'calc(100% - 32px)',
        overflow: 'auto',
    },
    ambreCardContent:{
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
    },
    color: (color: string) => ({
        color: color
    }),
    padding: (p: number) => ({
        padding: p
    }),
    width100: {
        width: '100%'
    },
    marginBottom1: {
        marginBottom: 1
    },
    marginBottom2: {
        marginBottom: 2
    },
    jsonView: {  // https://uiwjs.github.io/react-json-view/#online-editing-theme
        '--w-rjv-key-string': primaryDark,

        '--w-rjv-curlybraces-color': primaryDark,
        '--w-rjv-colon-color': primaryDark,
        '--w-rjv-brackets-color': primaryDark,
        '--w-rjv-quotes-color': primaryDark,
        '--w-rjv-quotes-string-color': primaryDark,

        '--w-rjv-color': primaryDark,
        '--w-rjv-info-color': primaryLight,
        '--w-rjv-arrow-color': primaryDark,
        '--w-rjv-update-color': primaryLight,
        '--w-rjv-copied-color': primaryMainDark,
        '--w-rjv-copied-success-color': primaryDark
    },
    // ******************************************
    // * SPECIFIC
    // ******************************************
    softContainer: {
        textAlign: 'center',
        paddingLeft: 1,
        paddingRight: 3
    },
    softLogo: {
        width: 100,
        filter: 'invert(78%) sepia(95%) saturate(1004%) hue-rotate(339deg) brightness(101%) contrast(101%)'
    },
    softTitle: {
        fontFamily: 'TitilliumWebBold',
        fontSize: 26,
        marginTop: -20,
        color: primaryMain,
    },
    softSubTitle: {
        fontFamily: 'TitilliumWebBold',
        fontSize: 11,
        color: primaryLight,
        marginTop: -7
    },
    formCardFirstInput: {
        marginBottom: 1,
        paddingTop: 1
    },
    mqttMessages: {
        ...ambreBorder(primaryLight),
        marginBottom: 1,
        paddingLeft: 1,
        paddingRight: 1
    },
    messageDateTime: {
        color: muiMiddleGrey,
        paddingLeft: 1,
        fontSize: 12
    },
    mqttTopic: {
        color: primaryMain,
        fontFamily: 'TitilliumWebBold'
    },
    tree: {
        userSelect: 'none',
        paddingRight: 3
    },
    // ******************************************
    // * OTHER
    // ******************************************
    spinOnClick: {
        padding: '6px',
        minWidth: '20px',
        '&:active': {
            '& .MuiSvgIcon-root': {
                animation: "spin 1s linear",
                "@keyframes spin": {
                    "0%": {
                        transform: "rotate(360deg)",
                    },
                    "100%": {
                        transform: "rotate(0deg)",
                    }
                }
            }
        }
    }
}
