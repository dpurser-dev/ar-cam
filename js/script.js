window.onload = () =>
{
    var activeRegion = ZingTouch.Region(document.body);
    var containerElement = document.getElementsByTagName('a-scene')[0];
    var ttt = document.getElementById('ttt');

    var myTapGesture = new ZingTouch.Distance();
    var gest = new ZingTouch.Gesture();
    activeRegion.bind(containerElement, myTapGesture, function (event)
    {

        console.log('Custom Distance gesture emitted: ', JSON.stringify(event.detail.change));
        console.log('Custom Distance gesture emitted: ', JSON.stringify(event.detail.distance));
        ttt.innerText = event.detail.change + ', ' + event.detail.distance;

    });
    activeRegion.bind(containerElement, gest, function (event)
    {

        ttt.innerText = event;

    });
}


function X()
{
    let el = document.querySelector("body > a-scene > a-marker > a-entity")
    let rotation = el.getAttribute('rotation')
    rotation.x += 90;
    el.object3D.rotation.set(
        THREE.Math.degToRad(rotation.x),
        THREE.Math.degToRad(rotation.y),
        THREE.Math.degToRad(rotation.z)
    );
}
function Y()
{
    let el = document.querySelector("body > a-scene > a-marker > a-entity")
    let rotation = el.getAttribute('rotation')
    rotation.y += 90;
    el.object3D.rotation.set(
        THREE.Math.degToRad(rotation.x),
        THREE.Math.degToRad(rotation.y),
        THREE.Math.degToRad(rotation.z)
    );
}
function Z()
{
    let el = document.querySelector("body > a-scene > a-marker > a-entity")
    let rotation = el.getAttribute('rotation')
    rotation.z += 90;
    el.object3D.rotation.set(
        THREE.Math.degToRad(rotation.x),
        THREE.Math.degToRad(rotation.y),
        THREE.Math.degToRad(rotation.z)
    );
}