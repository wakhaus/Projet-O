function toggleField(target){
  var paragraph = document.getElementById(target);

  if(paragraph.style.display == 'none')
    paragraph.style.display = 'initial';
    document.getElementById('ouvert').display="display"
    document.getElementById('ferme').display="none"
  else
    paragraph.style.display = 'none';
    document.getElementById('ouvert').display="display"
    document.getElementById('ferme').display="none"

}
