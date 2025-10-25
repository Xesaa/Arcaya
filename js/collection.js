function setupAddToCollection() {
    const btn = document.getElementById('addToCollectionBtn');
    
    if (btn) {
        const artefactId = btn.getAttribute('data-artefact-id');

        btn.addEventListener('click', () => {
            let collection = JSON.parse(localStorage.getItem('myCollection')) || [];
            
           
            if (!collection.includes(artefactId)) {
                collection.push(artefactId);
                localStorage.setItem('myCollection', JSON.stringify(collection));
                
            
                btn.textContent = 'Berhasil Ditambahkan!';
                btn.disabled = true;
                setTimeout(() => {
                    btn.textContent = 'Tambahkan ke Koleksi';
                    btn.disabled = false;
                }, 2000); 
            } else {
                alert('Artefak ini sudah ada di Koleksi Anda!');
            }
        });

       
        const collection = JSON.parse(localStorage.getItem('myCollection')) || [];
        if (collection.includes(artefactId)) {
             btn.textContent = 'Sudah di Koleksi';
             btn.disabled = true;
        }
    }
}


document.addEventListener('DOMContentLoaded', setupAddToCollection);


function loadCollection() {
   
    if (!document.getElementById('collection-page')) return;

    const collectionIds = JSON.parse(localStorage.getItem('myCollection')) || [];
    const collectionGridContainers = {
        'Arca': document.getElementById('arca-grid'),
        'Alat Musik': document.getElementById('alat-musik-grid'),
        'Senjata': document.getElementById('senjata-grid'),
        'Pakaian': document.getElementById('pakaian-grid')
    };
    let foundItemsCount = 0;

    
    Object.values(collectionGridContainers).forEach(grid => grid.innerHTML = '');

    if (collectionIds.length === 0) {
        document.getElementById('empty-collection-message').style.display = 'block';
        return;
    }

    document.getElementById('empty-collection-message').style.display = 'none';

    collectionIds.forEach(id => {
        
        const itemData = ARTEFACT_DATA.find(a => a.id === id);

        if (itemData) {
            foundItemsCount++;
            const cardHtml = createArtefactCard(itemData);
            
           
            const targetGrid = collectionGridContainers[itemData.category];
            if (targetGrid) {
                targetGrid.innerHTML += cardHtml;
            }
        }
    });


    Object.keys(collectionGridContainers).forEach(category => {
        const grid = collectionGridContainers[category];
        const categoryGroup = document.getElementById(`${category.toLowerCase().replace(' ', '-')}-category`);
        if (grid.children.length === 0 && categoryGroup) {
            categoryGroup.style.display = 'none';
        } else if (categoryGroup) {
            categoryGroup.style.display = 'block';
        }
    });
}


function createArtefactCard(data) {
  return `
    <div class="item-card" data-id="${data.id}">
      <button class="remove-btn" data-id="${data.id}" title="Hapus Koleksi">×</button>
      <a href="${data.detailUrl}">
        <img src="${data.thumb}" alt="${data.title}" loading="lazy">
      </a>
      <div class="card-info">
        <h4>${data.title}</h4>
        <p class="origin-thumb">${data.tahun}</p>
        <p class="origin-thumb">${data.asal}</p>
      </div>
      <a href="${data.detailUrl}" class="detail-btn">Detail</a>
    </div>
  `;
}



function loadHomeCollection() {
    const storedIds = JSON.parse(localStorage.getItem('myCollection')) || [];
    const section = document.getElementById('collection');
    const grid = document.getElementById('home-collection-grid');
    const viewAllLink = document.getElementById('viewAllCollection');

    if (!section || !grid) return;

    if (storedIds.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    grid.innerHTML = '';


    storedIds.sort(() => Math.random() - 0.5);


    storedIds.slice(0, 6).forEach(id => { 
    const itemData = ARTEFACT_DATA.find(a => a.id === id);
    if (itemData) {
        grid.innerHTML += createArtefactCard(itemData);
    }
    });

    if (storedIds.length > 4) {
        viewAllLink.style.display = 'inline-block';
    }
}

function setupRemoveFromCollection() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const id = e.target.getAttribute('data-id');

      let collection = JSON.parse(localStorage.getItem('myCollection')) || [];

      collection = collection.filter(itemId => itemId !== id);
      localStorage.setItem('myCollection', JSON.stringify(collection));

      const card = e.target.closest('.item-card');
      if (card) card.remove();

      const remaining = JSON.parse(localStorage.getItem('myCollection')) || [];
      if (remaining.length === 0) {
        const msg = document.getElementById('empty-collection-message');
        if (msg) msg.style.display = 'block';
      }

      window.dispatchEvent(new Event('collectionUpdated'));
    }
  });
}

function setupAddToCollection() {
  const btn = document.getElementById('addToCollectionBtn');

  if (btn) {
    const artefactId = btn.getAttribute('data-artefact-id');

    const updateButtonState = () => {
      const collection = JSON.parse(localStorage.getItem('myCollection')) || [];
      if (collection.includes(artefactId)) {
        btn.textContent = 'Sudah di Koleksi';
        btn.disabled = true;
      } else {
        btn.textContent = 'Tambahkan ke Koleksi';
        btn.disabled = false;
      }
    };

    btn.addEventListener('click', () => {
      let collection = JSON.parse(localStorage.getItem('myCollection')) || [];
      if (!collection.includes(artefactId)) {
        collection.push(artefactId);
        localStorage.setItem('myCollection', JSON.stringify(collection));
        btn.textContent = 'Berhasil Ditambahkan!';
        btn.disabled = true;
        setTimeout(updateButtonState, 1500);
      } else {
        alert('Artefak ini sudah di tambahkan ke Koleksi Anda!');
      }
    });

    window.addEventListener('collectionUpdated', updateButtonState);
    updateButtonState();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupRemoveFromCollection();
  setupAddToCollection(); 

  if (document.getElementById('collection-page')) {
    loadCollection();
  }
  if (document.getElementById('home-collection-grid')) {
    loadHomeCollection();
  }
});
