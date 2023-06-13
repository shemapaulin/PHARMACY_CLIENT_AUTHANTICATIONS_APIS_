const reportJoiError = (validatedObj, res) => {
    const errors = validatedObj.error.details.map((error) => {
        return {
            field: error.context.key,
            message: error.message.replace(/["]/g, ''),
        }
    });
    res.json({ errors });
}

export default reportJoiError;