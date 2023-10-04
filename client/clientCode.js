
const sec = ['general', 'beaver', 'cubs', 'scouts', 'explorers'];
function AdminSwitch() {
  const admin = document.getElementById('admin');
  if (admin.classList.contains('hidden')) {
    document.getElementById('admin').classList.remove('hidden');
    document.getElementById('mainSec').classList.add('hidden');
  } else {
    document.getElementById('mainSec').classList.remove('hidden');
    document.getElementById('admin').classList.add('hidden');
  }
};

function showError() {
  document.getElementById('banner').innerHTML = '';
  text = document.createElement('h1');
  text.textContent = 'Sorry, something went wrong!';
  banner.innerHTML = '<h1>Something went wrong</h1>';
  if (document.getElementById('admin').classList.contains('hidden')) {
    document.getElementById('mainSec').classList.add('hidden');
  } else {
    document.getElementById('admin').classList.add('hidden');
  };
  document.getElementById('errorImg').classList.remove('hidden');
}

window.addEventListener('DOMContentLoaded', reloadGroups());

function reloadGroups() {
  this.fetch('/group')
      .then(
          (response) => response.json())
      .then((data) => {
        const sel = this.document.getElementById('selectG');
        for (i = 0; i < data.length; i++) {
          const opt = this.document.createElement('option');

          opt.text = data[i].GroupName;
          opt.value = data[i].groupID;
          sel.add(opt, null);
        };
        const selForm = this.document.getElementById('groupSel');
        for (i = 0; i < data.length; i++) {
          const opt = this.document.createElement('option');

          opt.text = data[i].GroupName;
          opt.value = data[i].groupID;
          selForm.add(opt, null);
        };
      }).catch((err) => showError());
};
function LoadG() {
  const selID = document.getElementById('selectG').value;
  for (i = 0; i < sec.length; i++) {
    div = document.getElementById(sec[i]);
    div.innerHTML = '';
  };
  console.log('finish clear');

  fetch(`/display/${selID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Loading');
        if (data.length > 0) {
          for (i = 0; i < data.length; i++) {
            imgItem = document.createElement('img');
            textItem = document.createElement('p');
            section = data[i].section;
            Lname = data[i].name;
            role = data[i].role;
            imgItem.src = data[i].photo;
            imgItem.width = 200;
            textItem.textContent = `${Lname} - ${role}`;
            document.getElementById(section).append(imgItem, textItem);
            document.getElementById('topText').innerHTML = 'Come meet our lovely voulenteers!';
          }
        } else {
          document.getElementById('topText').innerHTML = 'It looks like there are no full time voulenteers in this group currently.';
        }
      }).catch((err) => showError());
};

function submitLForm() {
  NewName = document.getElementById('nameIn').value;
  NewRole = document.getElementById('role').value;
  if (NewName.length == 0 || NewRole == 0) {
    alert('Please fill out all forms');
  } else {
    NewgroupID = document.getElementById('groupSel').value;
    NewSection = document.getElementById('secSel').value;
    imgItem = document.getElementById('imgFile').files[0];
    var reader = new FileReader();
    const fileURL = {url: 'no url'};
    reader.addEventListener('load', () => {
      fileURL.url = reader.result;

      console.log(fileURL.url);
      console.log(NewgroupID, NewName, NewSection, NewRole, fileURL.url);
      const data = {groupID: NewgroupID, name: NewName, section: NewSection, role: NewRole, photo: fileURL.url};
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch('/newLeader', options).then((response) => {
        console.log(response);
      }).catch((err) => {
        showError();
      });
    });
  };
  reader.readAsDataURL(imgItem);
  document.getElementById('nameIn').value = '';
  document.getElementById('role').value = '';
  document.getElementById('imgFile').value = '';
};
document.getElementById('gFormBut').addEventListener('click', (e) => SubmitGForm(e));
async function SubmitGForm(e) {
  e.preventDefault();

  newGroup = document.getElementById('GName').value;
  if (newGroup.length == 0) {
    alert('Enter the new groups name');
  } else {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: newGroup}),
    };
    console.log(options);
    fetch('/newGroup', options).then((response) => {
      console.log(response);
    })
        .catch((err) => {
          showError();
        });
  }
}
