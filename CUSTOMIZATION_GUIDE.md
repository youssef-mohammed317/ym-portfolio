# 📘 Portfolio Template — Client Customization Guide
# دليل تخصيص البورتفوليو للعميل (بدون كتابة أي كود!)

---

## 🇸🇦 باللغة العربية (Arabic Guide)

مرحباً بك! هذا القالب مصمم ليكون **منتجاً جاهزاً للبيع والتشغيل الفوري (100% Front-End)**.  
**السر الأساسي هنا:** أنت أو عميلك **مش محتاج تلمس أي كود نهائياً**! كل شيء في الموقع مرتبط بملف واحد فقط:
👉 `src/data/data.json`

---

### 🚀 خطوة بخطوة: كيف تخصص الموقع في 5 دقائق؟

#### 1. افتح ملف البيانات
افتح الملف التالي في أي محرر نصوص (مثل VS Code أو Notepad):
```
src/data/data.json
```

#### 2. عدل بياناتك الشخصية (`personal`)
- `name`: اسمك بالكامل.
- `headline`: المسمى الوظيفي الرئيسي (مثلاً: Senior Full-Stack Engineer أو Architectural Visualizer أو Photographer).
- `titles`: مصفوفة بالمسميات التي تدور وتتغير تلقائياً في واجهة الموقع.
- `bio`: نبذة تعريفية مختصرة وجذابة عنك وعن خبراتك.
- `avatar`: رابط صورتك الشخصية (يمكنك وضع صورتك في مجلد `public` واستدعائها مثل `/avatar.jpg` أو استخدام رابط مباشر من الإنترنت).
- `location`: مدينتك أو دولتك وإتاحتك للعمل عن بُعد.
- `email`: بريدك الإلكتروني.
- `phone`: رقم هاتفك أو واتساب.
- `resumeUrl`: رابط ملف السيرة الذاتية (افتراضياً `/resume.pdf`).

#### 3. تفعيل فورم التواصل المجاني بدون سيرفر (`contact`)
القالب مربوط تلقائياً بخدمة **Web3Forms** المجانية 100%:
1. ادخل على الموقع: [https://web3forms.com](https://web3forms.com)
2. اكتب إيميلك واضغط "Create Access Key".
3. ستصلك رسالة في ثوانٍ تحتوي على مفتاح (Access Key).
4. افتح `data.json` وضع المفتاح في حقل:
   ```json
   "web3FormsAccessKey": "ضع-المفتاح-الخاص-بك-هنا"
   ```
> بمجرد وضع المفتاح، أي رسالة يكتبها أي زائر في فورم التواصل ستصلك فوراً ومجاناً على بريدك الإلكتروني!

#### 4. رفع الـ CV الخاص بك
- ضع ملف الـ PDF الخاص بك داخل مجلد `public` باسم `resume.pdf`.
- زرار **"Download CV"** وأيضاً نافذة **"Resume Preview"** التفاعلية ستتيح لزوارك تحميل السيرة الذاتية أو طباعتها بضغطة زر.

#### 5. إضافة وتعديل أعمالك ومشاريعك (`projects`)
كل مشروع في مصفوفة `projects` يحتوي على:
- `title`: اسم المشروع.
- `category`: تصنيف المشروع (مثل: Full-Stack, Frontend, Mobile, UI/UX).
- `description`: شرح موجز يظهر في الكارت.
- `fullDescription`: شرح مفصل يظهر داخل نافذة التفاصيل (Modal).
- `image`: رابط صورة المشروع أو غلافه.
- `tags`: التقنيات المستخدمة (مثل: Next.js, Tailwind CSS, TypeScript).
- `demoUrl`: رابط المعاينة الحية.
- `githubUrl`: رابط كود المشروع (إن وُجد).
- `metric`: ميزة أو رقم نجاح (مثل: `14,000+ Active Users` أو `2.4x Conversion Increase`).

#### 6. المهارات والخبرات (`skills` & `experience` & `testimonials`)
- أضف مهاراتك ونسب إتقانها في `skills`.
- أضف محطاتك المهنية والتعليمية مع نقاط الإنجازات في `experience` و `education`.
- أضف آراء عملائك وتقييماتهم (5 نجوم) في `testimonials`.

#### 7. تخصيص الوضع المظلم / الفاتح (Dark / Light Mode)
في أعلى ملف `data.json`:
```json
"defaultTheme": "dark" // خياراتك: "dark" أو "light" أو "system"
```
الموقع مزود بمفتاح تبديل فوري بين الـ Dark والـ Light مع حفظ التفضيل تلقائياً في المتصفح!

#### 8. أداة التخصيص الحية (Live In-Browser Customizer)
القالب يحتوي على أداة حية تطفو أسفل الشاشة (زر **"Live Template Customizer"**).  
تسمح لك أو للمشتري بتعديل البيانات والتجربة الحية مباشرة في المتصفح مع إمكانية تصدير ملف `data.json` المعدل بنقرة واحدة!  
إذا أردت إخفاء هذا الزر قبل تسليم الموقع النهائي للعميل، قم بتغيير القيمة في `data.json`:
```json
"enableLiveEditor": false
```

#### 9. رفع الموقع مجاناً بنقرة واحدة (1-Click Deployment)
يمكنك رفع الموقع مجاناً 100% على:
- **Vercel**: قم بربط مستودع GitHub واضغط **Deploy**.
- **Netlify**: اسحب مجلد المشروع أو اربط GitHub واضغط Deploy.

---

## 🇬🇧 English Guide

### Overview
This modern portfolio template is engineered with **Next.js 16 (App Router)** and **Tailwind CSS v4**. It is 100% front-end driven and decoupled from the presentation layer.

**Key File:**
`src/data/data.json`

### Key Features
1. **100% JSON-Driven Architecture:** All text, photos, links, skills, timelines, projects, and contact info are rendered directly from `src/data/data.json`.
2. **Dark / Light Mode:** Built-in seamless theme switcher with zero flicker and localStorage persistence.
3. **One-Click CV Download & Live Print Preview:** Direct PDF download and live modal preview formatted for high-resolution printing.
4. **Zero-Backend Contact Form (Web3Forms):** Free form-to-email routing without setting up a backend server or database.
5. **Interactive Project Details Modal & Live Filter:** Filter projects by category and instant keyword search.
6. **Live In-Browser Customizer:** Drawer allowing clients to test live changes and export their updated `data.json`.

### How to Get Your Free Web3Forms Access Key
1. Visit [https://web3forms.com](https://web3forms.com).
2. Enter your email to receive your free access key.
3. In `src/data/data.json`, update:
   ```json
   "web3FormsAccessKey": "your-key-here"
   ```

### Commands
- Run development server: `npm run dev`
- Production build: `npm run build`
- Start production server: `npm start`
