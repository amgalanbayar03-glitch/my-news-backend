// Strapi-аас мэдээ татаж харуулах функц
async function fetchNewsFromStrapi() {
    const STRAPI_URL = 'http://localhost:1337'; // Таны Strapi ажиллаж байгаа хаяг
    
    try {
        // Мэдээний жагсаалт болон зургийг (populate=cover) цуг татна
        const response = await fetch(`${STRAPI_URL}/api/articles?populate=cover`);
        const result = await response.json();
        
        const newsContainer = document.querySelector('.news-grid');
        if (!newsContainer) return;
        
        // Хуучин гараар бичсэн дээж мэдээг цэвэрлэнэ
        newsContainer.innerHTML = '';

        result.data.forEach(item => {
            const article = item.attributes;
            
            // Зургийн линк байгаа эсэхийг шалгах
            const imageUrl = article.cover?.data?.attributes?.url 
                ? `${STRAPI_URL}${article.cover.data.attributes.url}` 
                : 'https://via.placeholder.com/600x400';

            const newsCard = `
                <article class="news-card">
                    <div class="card-media">
                        <img src="${imageUrl}" alt="${article.title}">
                        <span class="category-badge">${article.category || 'Мэдээ'}</span>
                    </div>
                    <div class="card-body">
                        <div class="card-meta">
                            <span><i class="far fa-clock"></i> ${new Date(item.createdAt).toLocaleDateString('mn-MN')}</span>
                        </div>
                        <h3 class="card-title">
                            <a href="#">${article.title}</a>
                        </h3>
                        <p class="card-excerpt">
                            ${article.summary || ''}
                        </p>
                    </div>
                </article>
            `;
            newsContainer.insertAdjacentHTML('beforeend', newsCard);
        });
    } catch (error) {
        console.error('Strapi-аас мэдээ татахад алдаа гарлаа:', error);
    }
}

// Хуудас ачаалагдах үед ажиллуулна
document.addEventListener('DOMContentLoaded', fetchNewsFromStrapi);