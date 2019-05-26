if (process.env.NODE_ENV === 'production0') {
    module.exports = {
        mongoURI: 'mongodb://admin:admin123@ds261626.mlab.com:61626/vidjot-prod'
    }
}
else {
    module.exports = {
        mongoURI: 'mongodb://localhost/vidjot_DB'
    }
}