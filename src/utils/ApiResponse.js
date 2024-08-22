class ApiResponse{
    constructor(statusCode,data,message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;

    }
}

module.exports = ApiResponse;

/*
1.return res.status(200).json(new ApiResponse(200, user, "message"))
    2.return res.status(200)
        .json(new ApiResponse(200, {}, "message"))

*/