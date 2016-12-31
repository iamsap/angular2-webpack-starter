var defaultConfigs = {
}

module.exports = {
    "development": Object.assign({"database": "brainpad_dev"}, defaultConfigs),
    "test": Object.assign({"database": "brainpad_test"}, defaultConfigs),
    "production": Object.assign({"database": "brainpad_production"}, defaultConfigs)
}
