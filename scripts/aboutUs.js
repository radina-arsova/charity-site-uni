function openVideo(){
    document.getElementById('button-video').classList.add('invisible');
    document.getElementById('video').classList.remove('invisible');
    document.getElementById('video').play()
}

function onVideoEnd(){
    document.getElementById('button-video').classList.remove('invisible');
    document.getElementById('video').classList.add('invisible');
}