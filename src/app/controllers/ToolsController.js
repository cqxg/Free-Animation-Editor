const controller = () => {
    const tools = document.querySelector('.tools');

    const state = {
        currentTool: '',
        currentColor: '',
    };

    const toolIdentifier = (e) => {
        state.currentTool = e.target.className;
        switch (state.currentTool) {
            case 'pen':
                console.log('u want pen')
                break;
            case 'line':
                console.log('u want line')
                break;
            case 'bucket':
                console.log('u want bucket')
                break;
            case 'eraser':
                console.log('u erase')
                break;
            case 'circle':
                console.log('u want circle')
                break;
            case 'rect':
                console.log('u want rect')
                break;
            case 'dropper':
                console.log('u want dropper')
                break;
            case 'mover':
                console.log('u want mover')
                break;
        }
    };

    tools.addEventListener('click', (e) => toolIdentifier(e))
};

document.addEventListener('DOMContentLoaded', controller);