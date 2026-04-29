# Kinetic Kiddos — Deploy na Vercel

## Passo 1 — Criar conta no GitHub
Acesse https://github.com e crie uma conta gratuita (se ainda não tiver).

## Passo 2 — Criar repositório
1. Clique em **"New repository"**
2. Nome: `kinetic-kiddos` (ou qualquer nome)
3. Deixe **Public** ou **Private** (ambos funcionam na Vercel)
4. Clique em **"Create repository"**

## Passo 3 — Subir os arquivos
Na página do repositório recém-criado:
1. Clique em **"uploading an existing file"**
2. Arraste a pasta inteira deste zip (ou selecione todos os arquivos)
3. Clique em **"Commit changes"**

## Passo 4 — Deploy na Vercel
1. Acesse https://vercel.com e crie conta gratuita (pode entrar com o GitHub)
2. Clique em **"Add New Project"**
3. Selecione o repositório `kinetic-kiddos`
4. A Vercel detecta Vite automaticamente — não precisa mudar nada
5. Clique em **"Deploy"**

Pronto! Em ~2 minutos seu site estará no ar em um endereço como:
`https://kinetic-kiddos.vercel.app`

## Domínio próprio (opcional)
No painel da Vercel → projeto → **"Domains"** → adicione seu domínio.

## Estrutura do projeto
```
src/
  hooks/
    useMetaPixel.js       ← trackEvent para o Meta Pixel
  pages/
    Home.jsx
  components/sales/
    HeroSection.jsx
    QuizSection.jsx
    PricingSection.jsx
    ComplianceFooter.jsx
  App.jsx
  main.jsx
  index.css
index.html                ← Meta Pixel já configurado (ID: 1068832041285212)
```
