My Personal Portfolio Website

This repository contains the source code for my personal portfolio website, built to showcase my projects, skills, and professional experience.

### Troubleshooting

**Local Build Fails (`Rollup failed to resolve import`)**
If the build fails locally with a module resolution error, it's likely due to corrupted dependencies. To fix this, run the following commands in order:
```bash
# 1. Remove node_modules and package-lock.json
rd /s /q "node_modules"
del package-lock.json

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall all dependencies
npm install
```
After these steps, try running `npm run build` again.

### Sonraki Adımlar:

1.  Yerel build işlemi başarılı olduktan sonra, güncellenmiş `package-lock.json` dosyasını GitHub'a gönderin. Bu, GitHub Actions'ın da doğru bağımlılıkları kurmasını sağlayacaktır.

    ```bash
    git add .
    git commit -m "fix: Reinstall dependencies and update lockfile"
    git push origin main
    ```

2.  Bu push, GitHub Actions'ı tetikleyecek ve siteniz başarıyla deploy edilecektir.

### [README.md](file:///c%3A/Users/saitd/OneDrive/Desktop/projects/saitdundar.github.io/README.md)

Bu sorun giderme adımlarını ileride başvurmak üzere README dosyasına ekleyelim.