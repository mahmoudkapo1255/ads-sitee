
// تحميل الإعلانات
window.onload = function () {
  const ads = JSON.parse(localStorage.getItem('ads')) || [];
  ads.forEach(ad => displayAd(ad));
};

function addAd() {
  const category = document.getElementById('category').value;
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const imageFile = document.getElementById('image').files[0];

  if (!category || title === '' || description === '') {
    alert("يرجى ملء كل الحقول واختيار القسم");
    return;
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      saveAd({ category, title, description, image: e.target.result });
    };
    reader.readAsDataURL(imageFile);
  } else {
    saveAd({ category, title, description, image: null });
  }

  document.getElementById('category').value = '';
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('image').value = '';
}

function saveAd(ad) {
  const ads = JSON.parse(localStorage.getItem('ads')) || [];
  ads.unshift(ad);
  localStorage.setItem('ads', JSON.stringify(ads));
  displayAd(ad);
}

function displayAd(ad) {
  const container = document.getElementById(ad.category + '-list');
  if (!container) return;

  const adContainer = document.createElement('div');
  adContainer.className = 'ad';

  const adTitle = document.createElement('h3');
  adTitle.contentEditable = true;
  adTitle.textContent = ad.title;

  const adDesc = document.createElement('p');
  adDesc.contentEditable = true;
  adDesc.textContent = ad.description;

  adContainer.appendChild(adTitle);
  adContainer.appendChild(adDesc);

  if (ad.image) {
    const adImg = document.createElement('img');
    adImg.src = ad.image;
    adContainer.appendChild(adImg);
  }

  container.prepend(adContainer);
}

function clearAds() {
  if (confirm("هل تريد حذف جميع الإعلانات؟")) {
    localStorage.removeItem('ads');
    ['وظائف', 'عقارات', 'سيارات', 'أخبار'].forEach(cat => {
      document.getElementById(cat + '-list').innerHTML = '';
    });
  }
}

function searchAds() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const ads = document.querySelectorAll('.ad');
  ads.forEach(ad => {
    const text = ad.innerText.toLowerCase();
    ad.style.display = text.includes(keyword) ? 'block' : 'none';
  });
}
