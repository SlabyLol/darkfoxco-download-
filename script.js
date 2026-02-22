const ADMIN_PASSWORD = "DarkFox123"; // Passwort ändern
const adminPanel = document.getElementById("adminPanel");
const dropZone = document.getElementById('dropZone');
const fileList = document.getElementById('fileList');
const publicList = document.getElementById('publicList');

function checkAdmin(){
  const pass = prompt("Admin-Passwort eingeben:");
  if(pass === ADMIN_PASSWORD){
    adminPanel.style.display = "block";
    alert("Admin-Zugang gewährt");
  } else {
    alert("Zugriff verweigert!");
  }
}

dropZone.addEventListener('dragover', e => e.preventDefault());
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  const url = e.dataTransfer.getData('text');
  if(url) addFile(url);
});

function addFileFromInput(){
  const url = document.getElementById('fileInput').value.trim();
  if(url) addFile(url);
  document.getElementById('fileInput').value = '';
}

function addFile(url){
  const fileName = url.split('/').pop();
  
  const liAdmin = document.createElement('li');
  liAdmin.textContent = fileName + " (" + url + ")";
  fileList.appendChild(liAdmin);

  const li = document.createElement('li');
  li.innerHTML = `<a href="${url}" target="_blank" download>${fileName}</a>`;
  publicList.appendChild(li);
}

// Dateien automatisch aus filelist.json laden
fetch('filelist.json')
  .then(res => res.json())
  .then(files => {
    files.forEach(f => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="files/${f}" download>${f}</a>`;
      publicList.appendChild(li);
    });
  });
