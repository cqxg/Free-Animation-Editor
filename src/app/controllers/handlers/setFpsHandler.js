const setFpsHandler = (e, params) => {
    let { speed } = params;

    speed = 600 / e.target.value;
    return speed;
};

export default setFpsHandler;