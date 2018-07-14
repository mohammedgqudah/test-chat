const ErrorBase = {
    next: false
};
const InvalidBody = {
    ...ErrorBase,
    code: 'InvalidBody'
};
const ServerError = {
    ...ErrorBase,
    code: 'ServerError'
};
const ErrorCode = 404;
export { ServerError };
export { ErrorCode };
export { InvalidBody };
