const fs = require('fs');
const path = require('path');
const dir = 'F:/Bubhauz/src/components/home';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Overlay.tsx'));

files.forEach(f => {
  const file = path.join(dir, f);
  let content = fs.readFileSync(file, 'utf8');

  const buttonRegex = /(<button className="[^"]*?(?:fold-button|hero-button)[^"]*?"[^>]*>[\s\S]*?<\/button>)/;
  
  if (content.match(buttonRegex)) {
    content = content.replace(buttonRegex, '  </div>\n        <div className="relative z-20 pointer-events-auto md:mt-10">\n          $1');
    
    // For standard folds
    content = content.replace(
      /className="absolute top-0 left-0 w-full h-\[100vh\] flex items-end pb-40 md:items-center md:pb-0 justify-center pointer-events-none z-30"/g,
      'className="absolute top-0 left-0 w-full h-[100vh] flex flex-col justify-between py-[15vh] md:py-0 md:justify-center items-center pointer-events-none z-30"'
    );
    // For hero fold
    content = content.replace(
      /className="hero-overlay-container absolute top-0 left-0 w-full h-\[100vh\] flex items-end pb-40 md:items-center md:pb-0 justify-center pointer-events-none z-30"/g,
      'className="hero-overlay-container absolute top-0 left-0 w-full h-[100vh] flex flex-col justify-between py-[15vh] md:py-0 md:justify-center items-center pointer-events-none z-30"'
    );
    
    // The inner wrappers
    content = content.replace(
      /className="relative z-20 text-center px-4 max-w-5xl mx-auto pointer-events-auto"/g,
      'className="relative z-20 text-center px-4 max-w-5xl mx-auto pointer-events-auto flex flex-col items-center"'
    );
    // For hero inner wrapper
    content = content.replace(
      /className="text-center px-4 max-w-4xl mx-auto flex flex-col items-center pointer-events-auto mt-20"/g,
      'className="text-center px-4 max-w-4xl mx-auto flex flex-col items-center pointer-events-auto"'
    );
    
    fs.writeFileSync(file, content);
    console.log('Updated', f);
  }
});
