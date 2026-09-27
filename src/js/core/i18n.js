const dict = {
    ar: {
        navTools: "الأدوات", navAbout: "من نحن", navPrivacy: "سياسة الخصوصية", navTerms: "شروط الاستخدام", navContact: "اتصل بنا", btnTools: "استخدم الأدوات",
        heroBadge: "معالجة محلية آمنة 100%", heroTitle: "أدوات PDF تعمل فوراً", heroDesc: "دمج، تقسيم، ضغط وتحويل ملفات PDF مباشرة من متصفحك. أمان تام حيث لا يتم رفع ملفاتك إلى أي خادم، مما يضمن خصوصيتك.", heroBtn: "تصفح الأدوات المجانية",
        filterAll: "الكل", filterOrg: "تنظيم", filterOpt: "تحسين", filterToPDF: "إلى PDF", filterFromPDF: "من PDF", filterSec: "الأمان",
        
        // About & Contact Additions
        aboutTitle: "عن World PDF",
        aboutDesc1: "World PDF هي منصة احترافية مجانية بالكامل، صُممت لتوفير أسهل وأسرع أدوات لمعالجة ملفات PDF مباشرة من متصفحك الإلكتروني دون الحاجة لتثبيت أي برامج أو إنشاء حساب.",
        aboutDesc2: "نحن نولي أهمية قصوى لخصوصيتك؛ تعتمد تقنياتنا على معالجة الملفات محلياً داخل جهازك (Client-side)، مما يعني أن مستنداتك لا تغادر متصفحك ولا تُخزن على أي خوادم خارجية إطلاقاً.",
        contactTitle: "تواصل معنا", contactDesc: "هل لديك استفسار، اقتراح، أو واجهت مشكلة تقنية؟ يسعدنا تواصلك معنا وسنقوم بالرد في أقرب وقت.",
        formName: "الاسم الكامل", formEmail: "البريد الإلكتروني", formMsg: "رسالتك...", formBtn: "إرسال الرسالة", formSuccess: "تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.",
        
        // Footer & Cookies
        footerDesc: "منصتك المجانية والأكثر أماناً لمعالجة ملفات PDF مباشرة عبر متصفحك. لا مساومة على خصوصية بياناتك.",
        footerLinks: "روابط قانونية", footerSupport: "الدعم والمساعدة", copyright: "© 2026 جميع الحقوق محفوظة — World PDF",
        cookieMsg: "نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك على موقعنا وعرض إعلانات مخصصة وتحليل الزيارات. للمزيد من التفاصيل، يرجى مراجعة <a href='javascript:void(0)' onclick='openPage(\"privacy\")' class='text-primary hover:underline font-bold'>سياسة الخصوصية</a>.",
        cookieAccept: "موافق", cookieDecline: "إغلاق",
        
        // App Text
        dropTitle: "اختر الملفات أو اسحبها وأفلتها هنا", dropSubPDF: "الصيغ المدعومة: PDF فقط", dropSubImg: "الصيغ المدعومة: JPG, PNG, WebP", dropSubExcel: "الصيغ المدعومة: XLSX, XLS",
        processSuccess: "تمت المعالجة بنجاح!", btnDownload: "تحميل الملف الآن", btnActionExecute: "تنفيذ العملية", btnActionMerge: "دمج وتحميل", btnActionConvert: "تحويل وتحميل", btnActionProtect: "تشفير وتحميل",
        errNoFiles: "يرجى اختيار ملف واحد على الأقل", errGeneral: "حدث خطأ أثناء المعالجة", errPassword: "يرجى إدخال كلمة المرور",
        statusProcessing: "جاري المعالجة، يرجى الانتظار...", statusDone: "اكتملت العملية ✓",
        lblRange: "نطاق الصفحات (مثال: 1-3, 5):", lblPassword: "كلمة المرور:", lblOrder: "الترتيب الجديد (مثال: 3,1,2):", lblPos: "موقع الترقيم:",
        posBC: "أسفل الوسط", posBR: "أسفل اليمين", posBL: "أسفل اليسار",
        searchTools: "ابحث عن أداة...", privacyBadge: "المعالجة محلياً", recentTitle: "آخر الأدوات المستخدمة", noResults: "لم نعثر على أداة مطابقة.", filesSelected: "ملفات محددة", errCancelled: "تم إلغاء المعالجة.", cancelled: "تم الإلغاء", lblRotate: "زاوية التدوير:", lblWatermark: "نص العلامة المائية:", watermarkPlaceholder: "مثال: سري", errWatermark: "أدخل نص العلامة المائية", errRange: "أدخل نطاق صفحات صحيح", multiImageNote: "تم إنشاء ملف ZIP يحتوي على صفحات PNG.",
        
        // Legal Pages Content (HTML format)
        pagePrivacyTitle: "سياسة الخصوصية",
        pagePrivacyHtml: `
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">1. خصوصية الملفات ومعالجتها</h3>
            <p>في World PDF، نؤمن بأن خصوصية مستنداتك هي الأولوية. جميع عمليات معالجة الملفات (الدمج، التقسيم، التحويل، إلخ) تتم <strong>محلياً داخل متصفحك</strong>. نحن لا نقوم برفع، أو نقل، أو تخزين أي من ملفاتك على خوادمنا.</p>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">2. ملفات تعريف الارتباط (Cookies) وإعلانات جوجل</h3>
            <p>يستخدم موقعنا إعلانات Google AdSense كمورد دعم مالي لإبقاء الخدمة مجانية. تستخدم Google، بصفتها مورِّدًا خارجيًا، ملفات تعريف الارتباط لعرض الإعلانات على موقعنا.</p>
            <ul class="list-disc list-inside mt-2 space-y-1">
                <li>استخدام Google لملف تعريف الارتباط DART يتيح لها عرض الإعلانات للمستخدمين استنادًا إلى زياراتهم لموقعنا والمواقع الأخرى على الإنترنت.</li>
                <li>يمكن للمستخدمين تعطيل استخدام ملف تعريف الارتباط DART بزيارة <a href="https://policies.google.com/technologies/ads" target="_blank" class="text-primary hover:underline">سياسة الخصوصية الخاصة بإعلانات Google</a>.</li>
            </ul>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">3. سجلات الدخول (Log Files)</h3>
            <p>مثل معظم المواقع القياسية، نستخدم سجلات الدخول التي تتضمن عناوين بروتوكول الإنترنت (IP)، نوع المتصفح، مزود خدمة الإنترنت (ISP)، طابع التاريخ/الوقت، وصفحات الإحالة/الخروج. تستخدم هذه المعلومات لتحليل الاتجاهات وإدارة الموقع، وهي غير مرتبطة بأي معلومات تحدد الهوية الشخصية.</p>

            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">4. التغييرات على سياسة الخصوصية</h3>
            <p>نحتفظ بالحق في تحديث سياسة الخصوصية هذه في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة.</p>
        `,
        pageTermsTitle: "شروط الاستخدام",
        pageTermsHtml: `
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">1. قبول الشروط</h3>
            <p>باستخدامك لموقع وأدوات World PDF، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى التوقف عن استخدام الموقع.</p>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">2. الاستخدام المسموح به</h3>
            <p>الموقع مقدم للاستخدام الشخصي والمهني لمعالجة المستندات. يُمنع استخدام الموقع لأي أغراض غير قانونية أو محاولة استغلال الثغرات في الخدمة.</p>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">3. إخلاء المسؤولية (Disclaimer)</h3>
            <p>يتم تقديم الأدوات "كما هي" دون أي ضمانات صريحة أو ضمنية. نحن غير مسؤولين عن أي تلف أو فقدان للبيانات ناتج عن استخدام الموقع. يُنصح دائماً بالاحتفاظ بنسخة احتياطية من ملفاتك الأصلية قبل معالجتها.</p>

            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">4. حقوق الملكية الفكرية</h3>
            <p>جميع حقوق التصميم، العلامات التجارية، والمحتوى المعروض على الموقع (باستثناء الإعلانات والمحتويات التابعة لجهات خارجية) مملوكة لـ World PDF.</p>
        `
    },
    en: {
        navTools: "Tools", navAbout: "About Us", navPrivacy: "Privacy Policy", navTerms: "Terms of Use", navContact: "Contact", btnTools: "Use Tools",
        heroBadge: "100% Secure Local Processing", heroTitle: "Instant PDF Tools", heroDesc: "Merge, split, compress, and convert PDFs directly in your browser. Total privacy—your files are never uploaded to any server.", heroBtn: "Explore Free Tools",
        filterAll: "All", filterOrg: "Organize", filterOpt: "Optimize", filterToPDF: "To PDF", filterFromPDF: "From PDF", filterSec: "Security",
        
        aboutTitle: "About World PDF",
        aboutDesc1: "World PDF is a completely free, professional platform designed to provide the easiest and fastest tools for processing PDF files directly in your web browser without installing any software or creating an account.",
        aboutDesc2: "We prioritize your privacy; our technology relies on Client-side Processing, meaning your sensitive documents never leave your browser and are not stored on any external servers.",
        contactTitle: "Contact Us", contactDesc: "Have a question, suggestion, or encountered a technical issue? We'd love to hear from you. Fill out the form below and we'll reply ASAP.",
        formName: "Full Name", formEmail: "Email Address", formMsg: "Your Message...", formBtn: "Send Message", formSuccess: "Your message has been sent successfully! Thank you for contacting us.",
        
        footerDesc: "Your secure, free platform for processing PDFs directly in your browser. No compromise on your data privacy.",
        footerLinks: "Legal Links", footerSupport: "Support & Help", copyright: "© 2026 All Rights Reserved — World PDF",
        cookieMsg: "We use cookies to improve your experience, serve personalized ads, and analyze traffic. For more details, please review our <a href='javascript:void(0)' onclick='openPage(\"privacy\")' class='text-primary hover:underline font-bold'>Privacy Policy</a>.",
        cookieAccept: "Accept", cookieDecline: "Close",
        
        dropTitle: "Choose files or drag & drop here", dropSubPDF: "Supported formats: PDF only", dropSubImg: "Supported formats: JPG, PNG, WebP", dropSubExcel: "Supported formats: XLSX, XLS",
        processSuccess: "Processing completed successfully!", btnDownload: "Download File Now", btnActionExecute: "Execute", btnActionMerge: "Merge & Download", btnActionConvert: "Convert & Download", btnActionProtect: "Encrypt & Download",
        errNoFiles: "Please select at least one file", errGeneral: "An error occurred during processing", errPassword: "Please enter a password",
        statusProcessing: "Processing, please wait...", statusDone: "Completed ✓",
        lblRange: "Page range (e.g. 1-3, 5):", lblPassword: "Password:", lblOrder: "New order (e.g. 3,1,2):", lblPos: "Number Position:",
        posBC: "Bottom Center", posBR: "Bottom Right", posBL: "Bottom Left",
        searchTools: "Search tools...", privacyBadge: "Local processing", recentTitle: "Recently used", noResults: "No matching tool found.", filesSelected: "files selected", errCancelled: "Processing was cancelled.", cancelled: "Cancelled", lblRotate: "Rotation angle:", lblWatermark: "Watermark text:", watermarkPlaceholder: "Example: Confidential", errWatermark: "Enter watermark text", errRange: "Enter a valid page range", multiImageNote: "A ZIP file containing PNG pages was created.",
        
        pagePrivacyTitle: "Privacy Policy",
        pagePrivacyHtml: `
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">1. File Privacy & Processing</h3>
            <p>At World PDF, we believe your document privacy is paramount. All file processing operations (merging, splitting, conversion, etc.) happen <strong>locally within your browser</strong>. We do not upload, transfer, or store any of your files on our servers.</p>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">2. Cookies and Google Ads</h3>
            <p>Our site uses Google AdSense as a financial support resource to keep the service free. Google, as a third-party vendor, uses cookies to serve ads on our site.</p>
            <ul class="list-disc list-inside mt-2 space-y-1">
                <li>Google's use of the DART cookie enables it to serve ads to users based on their visit to our site and other sites on the Internet.</li>
                <li>Users may opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" target="_blank" class="text-primary hover:underline">Google ad and content network privacy policy</a>.</li>
            </ul>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">3. Log Files</h3>
            <p>Like many standard Web sites, we use log files. This includes IP addresses, browser type, internet service provider (ISP), referring/exit pages, and date/time stamps to analyze trends and administer the site. This information is not linked to anything personally identifiable.</p>

            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">4. Changes to Privacy Policy</h3>
            <p>We reserve the right to update this privacy policy at any time. Any changes will be posted on this page.</p>
        `,
        pageTermsTitle: "Terms of Use",
        pageTermsHtml: `
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h3>
            <p>By accessing and using World PDF, you agree to be bound by these Terms of Use. If you do not agree to any part of these terms, please stop using the site.</p>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">2. Permitted Use</h3>
            <p>The site is provided for personal and professional use for document processing. You are prohibited from using the site for any illegal purposes or attempting to exploit vulnerabilities in the service.</p>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">3. Disclaimer</h3>
            <p>The tools are provided "as is" without any express or implied warranties. We are not liable for any damage or loss of data resulting from the use of the site. It is always recommended to keep a backup of your original files before processing.</p>

            <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4">4. Intellectual Property</h3>
            <p>All design rights, trademarks, and content displayed on the site (excluding third-party ads and content) are owned by World PDF.</p>
        `
    }
};
export { dict };
