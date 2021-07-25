let moveMode = false;
let rotateMode = false;

let moveButton = undefined;
let rotateButton = undefined;

let loadingOverlay = undefined;
let fullscreenOverlay = undefined;
let rotateOverlay = undefined;

let entity = undefined;

// var log;

window.onload = () =>
{
    // log = document.getElementById('log');
    entity = document.getElementById("theModel")
    moveButton = document.getElementById('move-button');
    rotateButton = document.getElementById('rotate-button');

    loadingOverlay = document.getElementById('loading-overlay')
    fullscreenOverlay = document.getElementById('fullscreen-overlay')
    rotateOverlay = document.getElementById('rotate-overlay')

    handleOrientation()
    handleFullScreen()

    entity.addEventListener("model-loaded", () => { makeOverlay('loading', 'hide') })
    window.addEventListener("orientationchange", handleOrientation)
    window.addEventListener("fullscreenchange", handleFullScreen, false)
    window.addEventListener('resize', () =>
    {
        let newHeight = window.innerHeight + 'px';
        loadingOverlay.style.height = newHeight;
        fullscreenOverlay.style.height = newHeight;
        rotateOverlay.style.height = newHeight;
    }, true);

    let activeRegion = ZingTouch.Region(document.body, false, false);
    let containerElement = document.getElementsByTagName('a-scene')[0];
    let pinch = new ZingTouch.Distance();
    activeRegion.bind(containerElement, pinch, function (event)
    {
        if (rotateMode || moveMode) return;

        let factor = event.detail.change / 500.0;
        let scale = entity.getAttribute('scale').x;
        if ((scale > 5 && factor > 0) || (scale < 0.05 && factor < 0)) return;
        scale += factor;
        entity.object3D.scale.set(scale, scale, scale)
        // log.innerText = factor;
    });
    let swipe = new ZingTouch.Pan({
        numInputs: 1,
        threshold: 5
    })
    activeRegion.bind(containerElement, swipe, function (event)
    {
        if (moveMode)
        {
            let position = entity.getAttribute('position');
            let direction = calculateDirection(event.detail.data[0].currentDirection);

            if (!direction) return;

            switch (direction)
            {
                case 'up': position.y += 0.025; break;
                case 'left': position.x -= 0.025; break;
                case 'down': position.y -= 0.025; break;
                case 'right': position.x += 0.025; break;
            }

            entity.object3D.position.set(position.x, position.y, position.z);
        }
        else if (rotateMode)
        {
            let rotation = entity.getAttribute('rotation');
            let direction = calculateDirection(event.detail.data[0].currentDirection);

            if (!direction) return;

            switch (direction)
            {
                case 'up': rotation.x -= 1.5; break;
                case 'down': rotation.x += 1.5; break;
                case 'left': rotation.y -= 1.5; break;
                case 'right': rotation.y += 1.5; break;
            }

            entity.object3D.rotation.set(
                THREE.Math.degToRad(rotation.x),
                THREE.Math.degToRad(rotation.y),
                THREE.Math.degToRad(rotation.z)
            );
        }
    });
}
