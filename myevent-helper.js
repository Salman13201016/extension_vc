function openTab(evt, id, tccn, tlcn) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName(tccn);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName(tlcn);
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(id).style.display = "block";
  evt.currentTarget.className += " active";
}



function openNote(group) {
  console.log('toggling note');
  let toggler = document.getElementById(group + '-notetoggler');
  let notebody = document.getElementById(group + '-notebody');
  if (notebody.style.maxHeight) {
    notebody.style.maxHeight = null;
    // notebody.style.padding = null;
  } else {
    notebody.style.maxHeight = notebody.scrollHeight + 'px';
    // notebody.style.padding = '4px';
  }
}



function openMainView() {
  document.getElementById('searchView').style.display = 'none';
  document.getElementById('mainView').style.display = 'block';
}
function openSearchView() {
  document.getElementById('mainView').style.display = 'none';
  document.getElementById('searchView').style.display = 'block';
}

$(document).ready(function() {
  $('#toolbarToggler').click(() => {
    $('#toolbar').toggleClass('noshow');
  });
  
  $('#mycatbtn button').click(function() {
    $('#myagbtn').show();
    $(this).addClass('active').siblings().removeClass('active');
  });
  $('#myagbtn button').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  $('#areasContainer button').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
  });

  $('#myagbtn').hide();
  $('#many-filewindow').hide();
  $('#single-filewindow').hide();
  $('#file-mynavigator').hide();
  $('#filenotice-totaltocollect').hide();
  $('#filenotice-totalfloated').hide();
  $('#filenotice-totalptp').hide();

  Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });

  let deftab = document.getElementsByClassName('defaultOpen');
  for (var i = 0; i < deftab.length; i++) {
    deftab[i].click();
  }

  $('input[name*="teamSelect"]').on('change', function() {
    let profile = Setting.give('profile');
    profile.team = $(this).attr('value');
    Setting.patch('profile', profile);
    Snackbar.show('Change to team ' + $(this).attr('value').toUpperCase());
    setTimeout(() => {
      location.reload();
    }, 1500);
  });

  $('.viewmorebtn').each(function() {
      $(this).click(function() {
        // console.log($(this).text());
        let group = $(this).attr('group');
        if ($(this).text() === 'view more') {
          $(this).text('view less');
          $(`#${group}-myfiletable tr.optional`).addClass('show');
        } else {
          $(this).text('view more');
          $(`#${group}-myfiletable tr.optional`).removeClass('show');
        }
      });
  });

  $('.tdcancelfile').each(function() {
    $(this).change(function() {
      console.log(this.checked);
      let group = $(this).attr('group');
      let sid = $(`#${group}-tdsaleid`).text();
      let data = CMFile.give(sid);
      if (this.checked) {
        data.removed = true;
        $(`#${group}-filenotice-cancel`).show();
      }
      else {
        data.removed = false;
        $(`#${group}-filenotice-cancel`).hide();
      }
      CMFile.update(sid, data);
      Snackbar.show('Cancellation status updated');
    })
  });

  $('#vptr').change(function() {
    console.log(this.checked);
    if (this.checked) {
      let toolbar = Setting.give('toolbar');
      toolbar.placetoright = true;
      Setting.patch('toolbar', toolbar);
      $('#toolbar').addClass('right');
    } else {
      let toolbar = Setting.give('toolbar');
      toolbar.placetoright = false;
      Setting.patch('toolbar', toolbar);
      $('#toolbar').removeClass('right');
    }
  });

  $('#vast').change(function() {
    console.log(this.checked);
    if (this.checked) {
      let toolbar = Setting.give('toolbar');
      toolbar.alwaysshow = true;
      Setting.patch('toolbar', toolbar);
    } else {
      let toolbar = Setting.give('toolbar');
      toolbar.alwaysshow = false;
      Setting.patch('toolbar', toolbar);
    }
  });

});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("mymodal-close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function autocomplete(inp, datas) {
  let focus;

  inp.addEventListener('input', function(e) {
    let a, b, i, txt, max, counter, val = this.value;
    max = 3;
    counter = 1;
    closeAllLists();
    if (!val) { return false; }
    focus = -1;
    a = createEl({el: 'div'});
    a.setAttribute('id', this.id + 'myautocomplete-list');
    a.setAttribute('class', 'myautocomplete-items');
    this.parentNode.appendChild(a);
    // For each item in the array
    for (i = 0; i < datas.length; i++) {
      datas[i];
      let keys = ['saleid', 'name', 'nric'];
      for (var k = 0; k < keys.length; k++) {
        keys[k];
        if (datas[i][keys[k]].includes(val.toUpperCase())) {
          if (counter > max) break;
          b = createEl({el: 'div', callback: {type: 'click', handler: myhand }});
          keys.forEach((key) => {
            if (key === keys[k]) {
              let mytext = datas[i][key].substr(0, datas[i][key].indexOf(val.toUpperCase())) +
                          '<strong>' + datas[i][key].substr(datas[i][key].indexOf(val.toUpperCase()), val.length) + '</strong>' +
                          datas[i][key].substr(datas[i][key].indexOf(val.toUpperCase()) + val.length, datas[i][key].length)
              b.appendChild(createEl({el: 'p', innerHTML: mytext, styles: 'margin:.5rem 0'}));
            } else {
              b.appendChild(createEl({el: 'p', innerHTML: datas[i][key], styles: 'margin:.5rem 0'}));
            }
            b.appendChild(createEl({el: 'input', type: 'hidden', styles: 'display:none', value: datas[i].saleid}));
          });
          a.appendChild(b);
          counter++;
        }
      }
    }
    function myhand(e) {
      // insert the value for the autocomplete text field:
      let myvalue = this.getElementsByTagName('input')[0].value;
      console.log(myvalue);
      FileWindow.update('single', CMFile.where('saleid', myvalue));
      $('#single-filewindow').show();
      $('#single-filewindow-noshow').hide();
      $('#findOrderInp').val(myvalue);

      closeAllLists();
    }

  });

  // execute a function presses a key on the keyboard:
  inp.addEventListener('keydown', function(e) {
    let x = document.getElementById(this.id + 'myautocomplete-list');
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode == 40) {
      // If the arrow DOWN key is pressed,
      // increase the focus variable:
      focus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      // If the arrow UP key is pressed,
      // decrease the focus variable:
      focus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      // If the ENTER key is pressed,
      // prevent the form from being submitted:
      e.preventDefault();
      if (focus > -1) {
        // and simulate a click on the 'active' item:
        if (x) x[focus].click();
      }
    }
  });

  function addActive(x) {
    // a function to classify an item as 'active'
    if (!x) return false;
    // start by removing the 'active' class on all items:
    removeActive(x);
    if (focus >= x.length) focus = 0;
    if (focus < 0) focus = (x.length - 1);
    // add class 'autocomplete-active':
    x[focus].classList.add('myautocomplete-active');
  }
  function removeActive(x) {
    // a function to remove the 'active' class from all autocomplete items:
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('myautocomplete-active');
    }

  }
  function closeAllLists(el) {
    let x = document.getElementsByClassName('myautocomplete-items');
    for (var i = 0; i < x.length; i++) {
      if (el != x[i] && el != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener('click', function(e) {
    closeAllLists(e.target);
  });
}