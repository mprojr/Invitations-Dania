import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── i18n ────────────────────────────────────────────────────────────────────

const translations = {
    en: {
        'nav.portfolio': 'Portfolio',
        'nav.reserve': 'Reserve Now',
        'nav.about': 'About',
        'hero.title': 'Elegant Digital Invitations',
        'hero.subtitle': 'Custom designs for your Quinceañera or Sweet 16',
        'hero.btn': 'Reserve Your Spot',
        'portfolio.title': 'Our Work',
        'portfolio.subtitle': 'Beautiful, interactive digital invitations',
        'portfolio.item1.label': 'Quinceañera Design',
        'portfolio.item1.desc': 'Elegant floral design with interactive elements',
        'portfolio.item2.label': 'Sweet 16 Design',
        'portfolio.item2.desc': 'Modern design with countdown timer',
        'portfolio.item3.label': 'Classic Quinceañera',
        'portfolio.item3.desc': 'Traditional style with RSVP integration',
        'features.title': 'What You Get',
        'feature1.title': '✨ Custom Design',
        'feature1.desc': 'Personalized invitation matching your event theme and colors',
        'feature2.title': '📱 Interactive Elements',
        'feature2.desc': 'RSVP links, location maps, music player, and countdown timer',
        'feature3.title': '💫 Easy Sharing',
        'feature3.desc': 'Digital format perfect for WhatsApp, email, and social media',
        'feature4.title': '⚡ Quick Turnaround',
        'feature4.desc': 'Professional designs delivered digitally',
        'reservation.title': 'Reserve Your Custom Invitation',
        'reservation.subtitle': "Fill out the form below and I'll reach out as soon as I'm ready to take your order!",
        'form.name': 'Your Name *',
        'form.email': 'Email *',
        'form.phone': 'Phone (WhatsApp) *',
        'form.eventType': 'Event Type *',
        'form.eventType.placeholder': 'Select event type',
        'form.eventType.quinceanera': 'Quinceañera',
        'form.eventType.sweet16': 'Sweet 16',
        'form.eventType.other': 'Other',
        'form.honoreeName': "Honoree's Name *",
        'form.honoreeName.placeholder': 'e.g., Jasmine Del Rio',
        'form.eventDate': 'Event Date *',
        'form.colors': 'Preferred Colors',
        'form.colors.placeholder': 'e.g., Gold, mauve, and pink',
        'form.details': 'Additional Details',
        'form.details.placeholder': 'Tell us about your vision, theme, style preferences, etc.',
        'form.inspiration': 'Inspiration Images/Links',
        'form.inspiration.placeholder': 'Paste links to Pinterest, Instagram, or describe designs you like',
        'form.submit': 'Submit Reservation',
        'form.submitting': 'Submitting...',
        'success.title': '✨ Reservation Submitted!',
        'success.msg': "I've received your request and will be in touch as soon as I'm ready to take your order!",
        'footer.copyright': '© 2026 Anahis Invitations. All rights reserved.',
        'error.submit': 'There was an error submitting your reservation. Please try again or contact us directly.',
    },
    es: {
        'nav.portfolio': 'Portafolio',
        'nav.reserve': 'Reservar Ahora',
        'nav.about': 'Acerca de',
        'hero.title': 'Invitaciones Digitales Elegantes',
        'hero.subtitle': 'Diseños personalizados para tu Quinceañera o Sweet 16',
        'hero.btn': 'Reserva Tu Lugar',
        'portfolio.title': 'Nuestro Trabajo',
        'portfolio.subtitle': 'Invitaciones digitales hermosas e interactivas',
        'portfolio.item1.label': 'Diseño de Quinceañera',
        'portfolio.item1.desc': 'Diseño floral elegante con elementos interactivos',
        'portfolio.item2.label': 'Diseño Sweet 16',
        'portfolio.item2.desc': 'Diseño moderno con temporizador de cuenta regresiva',
        'portfolio.item3.label': 'Quinceañera Clásica',
        'portfolio.item3.desc': 'Estilo tradicional con integración de RSVP',
        'features.title': 'Lo Que Recibes',
        'feature1.title': '✨ Diseño Personalizado',
        'feature1.desc': 'Invitación personalizada que coincide con el tema y colores de tu evento',
        'feature2.title': '📱 Elementos Interactivos',
        'feature2.desc': 'Links de RSVP, mapas de ubicación, reproductor de música y temporizador',
        'feature3.title': '💫 Fácil de Compartir',
        'feature3.desc': 'Formato digital perfecto para WhatsApp, correo electrónico y redes sociales',
        'feature4.title': '⚡ Entrega Rápida',
        'feature4.desc': 'Diseños profesionales entregados digitalmente',
        'reservation.title': 'Reserva Tu Invitación Personalizada',
        'reservation.subtitle': '¡Llena el formulario y me pondré en contacto contigo tan pronto esté lista para tomar tu pedido!',
        'form.name': 'Tu Nombre *',
        'form.email': 'Correo Electrónico *',
        'form.phone': 'Teléfono (WhatsApp) *',
        'form.eventType': 'Tipo de Evento *',
        'form.eventType.placeholder': 'Selecciona el tipo de evento',
        'form.eventType.quinceanera': 'Quinceañera',
        'form.eventType.sweet16': 'Sweet 16',
        'form.eventType.other': 'Otro',
        'form.honoreeName': 'Nombre de la Festejada *',
        'form.honoreeName.placeholder': 'ej., Jasmine Del Rio',
        'form.eventDate': 'Fecha del Evento *',
        'form.colors': 'Colores Preferidos',
        'form.colors.placeholder': 'ej., Dorado, malva y rosa',
        'form.details': 'Detalles Adicionales',
        'form.details.placeholder': 'Cuéntanos sobre tu visión, tema, preferencias de estilo, etc.',
        'form.inspiration': 'Imágenes/Links de Inspiración',
        'form.inspiration.placeholder': 'Pega links de Pinterest, Instagram o describe los diseños que te gustan',
        'form.submit': 'Enviar Reservación',
        'form.submitting': 'Enviando...',
        'success.title': '✨ ¡Reservación Enviada!',
        'success.msg': '¡Recibí tu solicitud y me pondré en contacto contigo tan pronto esté lista para tomar tu pedido!',
        'footer.copyright': '© 2026 Anahis Invitations. Todos los derechos reservados.',
        'error.submit': 'Hubo un error al enviar tu reservación. Por favor intenta de nuevo o contáctanos directamente.',
    }
};

let currentLang = localStorage.getItem('lang');

function applyTranslations(lang) {
    const t = translations[lang];

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Update toggle button active state
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    currentLang = lang;
}

function selectLanguage(lang) {
    applyTranslations(lang);
    document.getElementById('langPopup').style.display = 'none';
}

// Show popup or restore saved language
const langPopup = document.getElementById('langPopup');
if (currentLang && translations[currentLang]) {
    langPopup.style.display = 'none';
    applyTranslations(currentLang);
} else {
    langPopup.style.display = 'flex';
    // Default toggle highlight to 'en' while popup is open
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === 'en');
    });
}

// Popup button listeners
document.getElementById('btnEnglish').addEventListener('click', () => selectLanguage('en'));
document.getElementById('btnEspanol').addEventListener('click', () => selectLanguage('es'));

// Nav toggle listeners
document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => applyTranslations(btn.dataset.lang));
});

// ─── Form submission ─────────────────────────────────────────────────────────

const form = document.getElementById('reservationForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = translations[currentLang]['form.submitting'];

    try {
        const formData = {
            customerName: document.getElementById('customerName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            eventType: document.getElementById('eventType').value,
            honoreeName: document.getElementById('honoreeName').value,
            eventDate: document.getElementById('eventDate').value,
            colorScheme: document.getElementById('colorScheme').value,
            details: document.getElementById('details').value,
            inspiration: document.getElementById('inspiration').value,
            status: 'pending',
            submittedAt: serverTimestamp()
        };

        await addDoc(collection(db, 'reservations'), formData);

        form.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
        console.error('Error submitting reservation:', error);
        alert(translations[currentLang]['error.submit']);
        submitButton.disabled = false;
        submitButton.textContent = translations[currentLang]['form.submit'];
    }
});

// ─── Smooth scrolling ────────────────────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
