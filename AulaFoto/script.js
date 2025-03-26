const video = document.getElementById("camera");
const button = document.getElementById("capturar");
const button_pb = document.getElementById("foto_pb");
const canva = document.getElementById("foto");
const ligar_camera = document.getElementById("ligar_camera");
const desligar_camera = document.getElementById("desligar_camera");

let mediaStream = null; 
let fotoIndex = 0;  

async function startCamera() {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = mediaStream;
        video.style.display = 'block';  
    } catch (erro) {
        alert('Erro ao abrir a câmera');
    }
}

function stopCamera() {
    if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop());  
        video.srcObject = null;  
        video.style.display = 'none';  
    }
}

function adicionarFoto(foto) {
    if (fotoIndex < 8) {  
        const fotoElemento = document.getElementById(`foto${fotoIndex + 1}`);
        fotoElemento.src = foto;
        fotoElemento.style.display = 'block';  
        fotoIndex++;  
    }
}

button.addEventListener('click', function() {
    const contexto = canva.getContext('2d');
    canva.width = video.videoWidth;
    canva.height = video.videoHeight;
    contexto.drawImage(video, 0, 0, canva.width, canva.height);
    canva.style.display = 'block';

    
    const fotoURL = canva.toDataURL(); 
    adicionarFoto(fotoURL);
});


button_pb.addEventListener('click', function() {
    const contexto = canva.getContext('2d');
    canva.width = video.videoWidth;
    canva.height = video.videoHeight;
    contexto.filter = 'grayscale(100%)';
    contexto.drawImage(video, 0, 0, canva.width, canva.height);
    canva.style.display = 'block';


    const fotoURL = canva.toDataURL(); 
    adicionarFoto(fotoURL);
});

ligar_camera.addEventListener('click', function() {
    startCamera();
});

desligar_camera.addEventListener('click', function() {
    stopCamera();
});
