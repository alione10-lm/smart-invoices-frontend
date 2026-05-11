

// 200 ok
export const ok = (res, data= {}, message = "Success") => {
    return res.status(200).json({
        success: true,
        message,
        data
    })
}

// 201 Created
export const created = (res, data= {}, message= 'Resource created successfully') => {
    return res.status(201).json({
        success: true,
        message,
        data,
    })
}


// 403 Forbidden
export const forbidden = (res, message = 'Forbidden. You do not have access to this resource.') => {
    return  res.status(403).json({
        success: false,
        message,
    });
};


// 404 Not found
export const notFound = (res, message = 'Resource not Found') => {
    return  res.status(404).json({
        success: false,
        message,
    });
};

// 401 Unauthorized 
export const unauthorized = (res, message = 'Unauthorized. Please log in.') => {
    return res.status(401).json({
        success: false,
        message,
    })
}

// 500 Internal Server Error
export const serverError = (res, message = 'Internal server error') => {
    return res.status(500).json({
        success: false,
        message,
    })
}

