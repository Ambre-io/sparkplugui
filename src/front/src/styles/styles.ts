import {stylesType} from "../utils/types";

export const styles: stylesType = {
    // ******************************************
    // * COMMON
    // ******************************************
    ambreCard: {
        flexGrow: 1,
        boxShadow: '0px 0px 3px 0px #B7B7B7',
        borderRadius: 1,
        padding: 3,
        background: '#FFFFFF',
        margin: 2,
    },
    alignCenter: {
        textAlign: 'center'
    },
    width100: {
        width: '100%'
    },
    marginTop2: {
        marginTop: 2
    },
    marginBottom2: {
        marginBottom: 2
    },
    // ******************************************
    // * SPECIFIC
    // ******************************************
    softCard: {
        width: 190,
        padding: 2
    },
    softLogo: {
        width: 150,
    },
    softTitle: {
        fontSize: 30,
        marginTop: -15
    },
    softSubTitle: {
        fontSize: 12,
        color: '#a5a5a5',
    },
    subtitle: {
        marginLeft: 10,
        marginTop: 4,
        marginBottom: 0,
        fontWeight: 800,
        fontSize: 20,
        textTransform: 'uppercase',
    },
    formControl: {
        marginBottom: 1
    },
    mqttMessages: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: 1,
        marginBottom: 1,
        padding: 1
    }
    // tree: {
    //     flexGrow: 1,
    //     maxHeight: 650,
    //     overflow: 'scroll',
    //     padding: 3,
    //     marginBottom: 2,
    //     boxShadow: '0px 0px 3px 0px #B7B7B7',
    //     borderRadius: 1,
    //     background: '#FFFFFF',
    //     userSelect: 'none'
    // },
}
