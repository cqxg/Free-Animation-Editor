const setFpsHandler = (e, speed) => {
    speed = 600 / e.target.value;
    return speed;
};

export default setFpsHandler;