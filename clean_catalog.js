const fs = require('fs');
const path = require('path');

const catPath = 'd:/RIAN/circulo verde/data/catalogo.json';
const publicDir = 'd:/RIAN/circulo verde/public';

const catalogo = JSON.parse(fs.readFileSync(catPath, 'utf8'));

let removedCount = 0;
let validProducts = [];

catalogo.categorias.forEach(cat => {
  const initialLength = cat.produtos.length;
  cat.produtos = cat.produtos.filter(p => {
    if (!p.imagem) return false;
    const imgPath = path.join(publicDir, p.imagem);
    const exists = fs.existsSync(imgPath);
    if (exists) {
      validProducts.push({
        sku: p.sku,
        nome: p.nome,
        badge: p.badge,
        imagem: p.imagem
      });
    }
    return exists;
  });
  removedCount += (initialLength - cat.produtos.length);
});

// Remove categories with no products
catalogo.categorias = catalogo.categorias.filter(cat => cat.produtos.length > 0);

fs.writeFileSync(catPath, JSON.stringify(catalogo, null, 2), 'utf8');

console.log(`Removed ${removedCount} products without valid images.`);
console.log('3 valid products for home page:');
console.log(JSON.stringify(validProducts.slice(0, 3), null, 2));
