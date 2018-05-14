function toggleField(target){
  var paragraph = document.getElementById(target);

  if(paragraph.style.display == 'none')
    paragraph.style.display = 'initial';
  else paragraph.style.display = 'none';
}
