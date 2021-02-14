import {CONSTANTS_CONFIG} from "../../../../config/constants.config";

export default {
    name: "not-found",
    props: [],
    data: function () {
        return {
            alert: {
                class: CONSTANTS_CONFIG.ERROR_CLASS,
                heading: CONSTANTS_CONFIG.ERROR_HEADING,
                text: CONSTANTS_CONFIG.NOT_FOUND,
                dismissible: false
            }
        };
    },
    created: function () {
    },
    methods: {},
    components: {}
};
