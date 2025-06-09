export const ERROR_CODES = {
    PROFILE_NOT_FOUND: {
        code: 'GB001',
        message: 'PROFILE_NOT_FOUND',
        status: 404,
    },
    CEP_NOT_FOUND: {
        code: 'GB002',
        message: 'CEP_NOT_FOUND',
        status: 404,
    },
    ADDRESS_NOT_FOUND: {
        code: 'GB003',
        message: 'ADDRESS_NOT_FOUND',
        status: 404,
    },
    INTERNAL_ERROR: {
        code: 'GI001',
        message: 'INTERNAL_SERVER_ERROR',
        status: 500,
    },
    JPA_EXCEPTION: {
        code: 'GI002',
        message: 'JPA_EXCEPTION',
        status: 502,
    },
    CONVERT_TO_OBJECT_ERROR: {
        code: 'GI003',
        message: 'CONVERT_TO_OBJECT_ERROR',
        status: 500,
    },
};
